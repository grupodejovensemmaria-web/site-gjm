document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const intencoesBtn = document.getElementById('intencoes-btn');
    const intencoesModal = document.getElementById('intencoes-modal');
    const closeIntencoesBtn = document.getElementById('close-intencoes-btn');
    const formIntencao = document.getElementById('form-intencao');
    const intencaoTexto = document.getElementById('intencao-texto');
    const charCount = document.getElementById('char-count');
    const listaIntencoes = document.getElementById('lista-intencoes');
    
    // Áudio para tocar ao abrir o modal
    const audioOracao = new Audio('/static/audios/10 O céu está rezando por ti.mp3');
    audioOracao.volume = 0.7;

    // Mostrar modal de intenções
    intencoesBtn.addEventListener('click', function(e) {
        e.preventDefault();
        abrirModalIntencoes();
    });

    // Fechar modal
    closeIntencoesBtn.addEventListener('click', fecharModalIntencoes);

    // Fechar modal ao clicar fora
    intencoesModal.addEventListener('click', function(e) {
        if (e.target === intencoesModal) {
            fecharModalIntencoes();
        }
    });

    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && intencoesModal.classList.contains('active')) {
            fecharModalIntencoes();
        }
    });

    // Contador de caracteres
    intencaoTexto.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = count;
        
        if (count > 450) {
            charCount.style.color = 'var(--warning-color)';
        } else {
            charCount.style.color = 'var(--text-dark)';
        }
    });

    // Enviar intenção
    formIntencao.addEventListener('submit', function(e) {
        e.preventDefault();
        enviarIntencao();
    });

    // Funções
    function abrirModalIntencoes() {
        intencoesModal.classList.add('active');
        window.location.hash = 'intencoes';
        
        // Tocar áudio suavemente
        audioOracao.currentTime = 0;
        audioOracao.play().catch(e => {
            console.log('Autoplay de áudio bloqueado:', e);
        });
        
        carregarIntencoes();
    }

    function fecharModalIntencoes() {
        intencoesModal.classList.remove('active');
        window.location.hash = '';
        audioOracao.pause();
        audioOracao.currentTime = 0;
    }

    function carregarIntencoes() {
        listaIntencoes.innerHTML = '<div class="loading">Carregando intenções...</div>';
        
        fetch('/api/intencoes')
            .then(response => {
                if (!response.ok) throw new Error('Erro ao carregar intenções');
                return response.json();
            })
            .then(intencoes => {
                exibirIntencoes(intencoes);
            })
            .catch(error => {
                console.error('Erro:', error);
                listaIntencoes.innerHTML = `
                    <div class="empty-state">
                        Não foi possível carregar as intenções. Tente novamente.
                    </div>
                `;
            });
    }

    function exibirIntencoes(intencoes) {
        if (!intencoes || intencoes.length === 0) {
            listaIntencoes.innerHTML = `
                <div class="empty-state">
                    Ainda não há intenções. Seja o primeiro a compartilhar um pedido de oração.
                </div>
            `;
            return;
        }

        listaIntencoes.innerHTML = intencoes.map(intencao => `
            <div class="intencao-item" data-id="${intencao.id}">
                <div class="intencao-meta">
                    <span class="intencao-autor ${intencao.anonimo ? 'intencao-anonimo' : ''}">
                        ${intencao.anonimo ? 'Anônimo' : intencao.autor}
                    </span>
                    <span class="intencao-data">${formatarData(intencao.data)}</span>
                </div>
                <div class="intencao-texto">${escapeHtml(intencao.texto)}</div>
                <button class="btn-rezar" onclick="rezarPorIntencao(${intencao.id})">
                    🙏 Rezar por essa intenção
                </button>
            </div>
        `).join('');
    }

    function enviarIntencao() {
        const texto = intencaoTexto.value.trim();
        const mostrarNome = document.getElementById('mostrar-nome').checked;
        
        if (!texto) {
            alert('Por favor, escreva sua intenção de oração.');
            return;
        }

        const btnEnviar = formIntencao.querySelector('.btn-enviar');
        const textoOriginal = btnEnviar.textContent;
        btnEnviar.textContent = 'Enviando...';
        btnEnviar.disabled = true;

        fetch('/api/intencoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                texto: texto,
                anonimo: !mostrarNome
            })
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao enviar intenção');
            return response.json();
        })
        .then(novaIntencao => {
            // Limpar formulário
            formIntencao.reset();
            charCount.textContent = '0';
            
            // Recarregar lista
            carregarIntencoes();
            
            // Mostrar confirmação
            mostrarOracaoEnviada();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Não foi possível enviar sua intenção. Tente novamente.');
        })
        .finally(() => {
            btnEnviar.textContent = textoOriginal;
            btnEnviar.disabled = false;
        });
    }

    function mostrarOracaoEnviada() {
        const oracaoPopup = document.createElement('div');
        oracaoPopup.className = 'oração-popup';
        oracaoPopup.innerHTML = `
            <div class="oração-texto">
                "Amado Deus, acolhe essa intenção. Amém."
            </div>
            <div class="oração-actions">
                <button class="btn btn-primary" onclick="this.closest('.oração-popup').remove()">
                    Amém
                </button>
            </div>
        `;
        
        document.body.appendChild(oracaoPopup);
        
        // Fechar automaticamente após 5 segundos
        setTimeout(() => {
            if (oracaoPopup.parentNode) {
                oracaoPopup.remove();
            }
        }, 5000);
    }

    // Função global para rezar por intenção
    window.rezarPorIntencao = function(intencaoId) {
        const oracaoPopup = document.createElement('div');
        oracaoPopup.className = 'oração-popup';
        oracaoPopup.innerHTML = `
            <div class="oração-texto">
                "Amado Deus, acolhe essa intenção. Amém."
            </div>
            <div class="oração-actions">
                <button class="btn btn-primary" onclick="this.closest('.oração-popup').remove()">
                    Amém
                </button>
            </div>
        `;
        
        document.body.appendChild(oracaoPopup);
        
        // Registrar que rezou por essa intenção (opcional)
        fetch(`/api/intencoes/${intencaoId}/rezar`, {
            method: 'POST'
        }).catch(console.error);
        
        // Fechar automaticamente após 5 segundos
        setTimeout(() => {
            if (oracaoPopup.parentNode) {
                oracaoPopup.remove();
            }
        }, 5000);
    };

    // Funções auxiliares
    function formatarData(dataString) {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Verificar hash ao carregar a página
    if (window.location.hash === '#intencoes') {
        abrirModalIntencoes();
    }
});
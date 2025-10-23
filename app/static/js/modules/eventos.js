document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os botões de abas e conteúdos
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Função para alternar entre abas
    function switchTab(tabId) {
        // Remove a classe 'active' de todos os botões e conteúdos
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });

        // Adiciona 'active' ao botão e conteúdo selecionados
        const selectedButton = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        const selectedPane = document.getElementById(tabId);
        
        if (selectedButton && selectedPane) {
            selectedButton.classList.add('active');
            selectedPane.classList.add('active');
        }
    }

    // Adiciona evento de clique a cada botão
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Opcional: Ativa a primeira aba por padrão se nenhuma estiver ativa
    const activeTab = document.querySelector('.tab-btn.active');
    if (!activeTab && tabButtons.length > 0) {
        const firstTabId = tabButtons[0].getAttribute('data-tab');
        switchTab(firstTabId);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const tipoAcao = document.getElementById('tipo_acao');
    const blocos = {
        criar: document.getElementById('bloco-criar'),
        atualizar: document.getElementById('bloco-atualizar'),
        remover: document.getElementById('bloco-remover')
    };

    // Mostra/esconde blocos conforme seleção
    tipoAcao.addEventListener('change', function() {
        // Esconde todos os blocos
        Object.values(blocos).forEach(bloco => {
            bloco.style.display = 'none';
        });
        
        // Mostra apenas o bloco selecionado
        const acaoSelecionada = this.value;
        if (acaoSelecionada && blocos[acaoSelecionada]) {
            blocos[acaoSelecionada].style.display = 'block';
        }
    });

    // Form submission (ajustado para enviar dados específicos)
    document.getElementById('form-evento').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            const response = await fetch('/eventos_alterar', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                alert('Ação realizada com sucesso!');
                window.location.reload();
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    });
});

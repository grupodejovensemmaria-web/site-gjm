let eventoIdSelecionado = null;
let listaPresencas = [];

function abrirModal(botao) {
    const modal = document.getElementById('modal-info');
    document.getElementById('modal-titulo').textContent = botao.dataset.nome;
    document.getElementById('modal-data').textContent = botao.dataset.data_evento;
    document.getElementById('modal-local').textContent = botao.dataset.local_evento;
    document.getElementById('modal-descricao').textContent = botao.dataset.descricao;
    document.getElementById('modal-publico').textContent = botao.dataset.publico_alvo;
    document.getElementById('modal-observacoes').textContent = botao.dataset.observacoes;

    eventoIdSelecionado = botao.dataset.evento_id;
    try {
        const parsed = JSON.parse(botao.dataset.presencas);
        listaPresencas = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        listaPresencas = [];
    }

    const listaHtml = document.getElementById('modal-lista-presenca');
    listaHtml.innerHTML = '';
    listaPresencas.forEach((p, index) => {
        const li = document.createElement('li');
        li.textContent = `${p.nome}`;
        listaHtml.appendChild(li);
    });

    modal.classList.add('show');
    modal.classList.remove('hidden');
}


function fecharModal() {
    document.getElementById('modal-info').classList.remove('show');
}

function preencherCampos(select) {
    const opt = select.options[select.selectedIndex];
    console.log(opt.dataset);

    document.getElementById('novo_nome').value = opt.dataset.nome || '';
    document.getElementById('nova_data').value = formatarData(opt.dataset.data) || '';
    document.getElementById('novo_local').value = opt.dataset.local || '';
    document.getElementById('nova_recorrencia').value = opt.dataset.recorrencia || 'unica';
    document.getElementById('nova_descricao').value = opt.dataset.descricao || '';
    document.getElementById('novas_observacoes').value = opt.dataset.observacoes || '';
    document.getElementById('novo_publico_alvo').value = opt.dataset.publico || '';
}

function formatarData(dataStr) {
    // Converte para YYYY-MM-DDTHH:MM (formato de datetime-local)
    if (!dataStr) return '';
    const d = new Date(dataStr);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

function confirmarPresenca() {
    fetch('/confirmar-presenca', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ evento_id: eventoIdSelecionado })
    }).then(res => res.json()).then(data => {
        if (data.status === 'ok') {
            // Atualiza a lista
            const novaPessoa = data.usuario;
            listaPresencas.push(novaPessoa);
            const li = document.createElement('li');
            li.textContent = novaPessoa.nome;
            document.getElementById('modal-lista-presenca').appendChild(li);
            alert(data.message || 'Presença adcionada com sucesso!');
        } else {
            alert(data.message || 'Erro ao confirmar presença.');
        }
    });
}

function removerPresenca() {
    fetch('/remover-presenca', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ evento_id: eventoIdSelecionado })
    }).then(res => res.json()).then(data => {
        if (data.status === 'ok') {
            const usuarioRemovido = data.usuario;
            // Atualiza a lista local removendo o usuário
            listaPresencas = listaPresencas.filter(p => p.id !== usuarioRemovido.id);
            
            // Atualiza a lista no modal
            const listaHtml = document.getElementById('modal-lista-presenca');
            listaHtml.innerHTML = '';
            listaPresencas.forEach(p => {
                const li = document.createElement('li');
                li.textContent = p.nome;
                listaHtml.appendChild(li);
            });

            alert(data.message || 'Presença removida com sucesso!');
        } else {
            alert(data.message || 'Erro ao confirmar presença.');
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    const liturgiaBtn = document.getElementById('liturgiadiaria-btn');
    const liturgiaSection = document.getElementById('liturgia-diaria');
    const closeLiturgiaBtn = document.getElementById('close-liturgia-btn');

    // Mostrar liturgia ao clicar no botão
    liturgiaBtn.addEventListener('click', function (e) {
        e.preventDefault();
        fetchLiturgiaData();
        window.location.hash = 'liturgia';
    });

    // Fechar liturgia
    closeLiturgiaBtn.addEventListener('click', function () {
        liturgiaSection.classList.remove('active');
        window.location.hash = '';
    });

    // Verificar hash ao carregar a página
    if (window.location.hash === '#liturgia') {
        fetchLiturgiaData();
    }

    // Buscar e exibir dados da liturgia
    function fetchLiturgiaData() {
        liturgiaSection.classList.add('active');

        const contentElements = document.querySelectorAll('.liturgia-content > *');
        contentElements.forEach(el => el.style.display = 'none');

        fetch('/liturgia-diaria')
            .then(response => {
                if (!response.ok) throw new Error('Erro ao carregar liturgia');
                return response.json();
            })
            .then(data => {
                if (data.error) throw new Error(data.error);
                populateLiturgiaData(data);
                contentElements.forEach(el => el.style.display = '');
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Não foi possível carregar a liturgia do dia. Por favor, tente novamente mais tarde.');
                liturgiaSection.classList.remove('active');
            });
    }

    // Preencher dados da liturgia no DOM
    function populateLiturgiaData(data) {
        document.getElementById('liturgia-data').textContent = data.data || 'Data não disponível';
        document.getElementById('liturgia-titulo').textContent = data.liturgia || 'Liturgia não disponível';

        const corElement = document.getElementById('liturgia-cor');
        if (data.cor) {
            corElement.textContent = data.cor;
            corElement.className = 'cor-badge cor-' + data.cor.toLowerCase();
        } else {
            corElement.style.display = 'none';
        }

        document.getElementById('liturgia-coleta').textContent = data.oracoes.coleta || 'Não disponível';
        document.getElementById('liturgia-oferendas').textContent = data.oracoes.oferendas || 'Não disponível';
        document.getElementById('liturgia-comunhao').textContent = data.oracoes.comunhao || 'Não disponível';

        populateLeitura('liturgia-primeira', data.leituras.primeira);
        populateLeitura('liturgia-salmo', data.leituras.salmo);
        populateLeitura('liturgia-segunda', data.leituras.segunda);
        populateLeitura('liturgia-evangelho', data.leituras.evangelho);

        const segundaContainer = document.getElementById('segunda-leitura-container');
        segundaContainer.style.display = data.leituras.segunda && data.leituras.segunda.length > 0 ? 'block' : 'none';

        document.getElementById('liturgia-antifona-entrada').textContent =
            data.antifonas.entrada || 'Não disponível';
        document.getElementById('liturgia-antifona-comunhao').textContent =
            data.antifonas.comunhao || 'Não disponível';
    }

    // Exibir leitura com referência + texto
    function populateLeitura(elementId, leituras) {
        const element = document.getElementById(elementId);
        element.innerHTML = ''; // Limpar

        if (!leituras || leituras.length === 0) {
            element.innerHTML = '<p>Não disponível</p>';
            return;
        }

        leituras.forEach(leitura => {
            const referencia = leitura.referencia || null;
            const texto = leitura.texto || leitura; // fallback para versão antiga

            if (referencia) {
                const ref = document.createElement('p');
                ref.classList.add('referencia');
                ref.innerHTML = `<strong>${referencia}</strong>`;
                element.appendChild(ref);
            }

            const body = document.createElement('p');
            body.classList.add('texto');
            body.textContent = texto;
            element.appendChild(body);
        });
    }
});

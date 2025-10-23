document.addEventListener('DOMContentLoaded', function() {
    const weeklyPostSection = document.getElementById('weekly-post');
    const showWeeklyPostBtn = document.getElementById('show-weekly-post-btn');
    const closeWeeklyPostBtn = document.getElementById('close-weekly-post-btn');
    
    // Função para carregar e mostrar o santo da semana
    function showWeeklyPost() {
        weeklyPostSection.classList.add('active');
        
        const weeklyPostContainer = document.getElementById('weekly-post-content');
        weeklyPostContainer.innerHTML = '<div class="loading">Carregando santo da semana...</div>';
        
        fetch('/api/weekly-post')
            .then(response => {
                if (!response.ok) throw new Error('Erro na requisição');
                return response.json();
            })
            .then(data => {
                if (data.title) {
                    console.log('Post da semana:', data);
                    weeklyPostContainer.innerHTML = `
                        <div class="weekly-post-header">
                            <h3>${data.title}</h3>
                            <h4>${data.subtitle}</h4>
                        </div>
                        <div class="weekly-post-body">
                            <img src="/static/images/weekly_posts/${data.image_path}" alt="${data.title}" class="weekly-post-image">
                            <div class="weekly-post-content">${data.content}</div>
                        </div>
                        <div class="weekly-post-footer">
                            <small>Publicado por ${data.author} em ${new Date(data.created_at).toLocaleDateString('pt-BR')}</small>
                        </div>
                    `;
                } else {
                    weeklyPostContainer.innerHTML = `
                        <div class="no-post">
                            <p>Nenhum santo da semana publicado, volte novamente mais tarde...</p>
                        </div>
                    `;
                }
            })
            .catch(error => {
                console.error('Error fetching weekly post:', error);
                weeklyPostContainer.innerHTML = `
                    <div class="error-post">
                        <p>Ocorreu um erro ao carregar o santo da semana.</p>
                    </div>
                `;
            });
    }
    
    // Event listeners
    showWeeklyPostBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showWeeklyPost();
    });
    
    closeWeeklyPostBtn.addEventListener('click', function() {
        weeklyPostSection.classList.remove('active');
    });
    
    // Fechar ao clicar fora do conteúdo
    weeklyPostSection.addEventListener('click', function(e) {
        if (e.target === weeklyPostSection) {
            weeklyPostSection.classList.remove('active');
        }
    });
});
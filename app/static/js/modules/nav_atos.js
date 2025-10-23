document.addEventListener('DOMContentLoaded', function() {
  // Listen for ato change events
  document.addEventListener('atoChanged', (e) => {
    const { atoNumber, config } = e.detail;
    const section = document.querySelector(`#ato-${atoNumber}`);
    
    if (!section || !config) return;

    // Fill ato content
    const atoContainer = section.querySelector('.ato-container');
    atoContainer.innerHTML = `
      <div class="ato-title-card">
        <h2>${config.title}</h2>
      </div>
      <div class="ato-quote">
        <blockquote>${config.quote}</blockquote>
      </div>
      <div class="ato-text-content">
        <p>${config.text}</p>
      </div>
      <div class="ato-video">
        ${config.media.type === 'video' ? 
          `<video autoplay loop muted playsinline>
            <source src="${config.media.src}" type="video/mp4">
          </video>` : 
          `<img src="${config.media.src}" alt="${config.title}">`}
      </div>
      <div class="ato-image" style="background-image: url('${config.bgImage}')"></div>
      <div class="ato-nav-buttons">
        <button class="nav-btn prev-btn">←</button>
        <button class="nav-btn next-btn">→</button>
      </div>
    `;

    // Initialize the ato with title view
    atoContainer.classList.add('show-title');
    
    // Setup navigation
    setupAtoNavigation(atoContainer);
  });

  function setupAtoNavigation(atoContainer) {
    const nextBtn = atoContainer.querySelector('.next-btn');
    const prevBtn = atoContainer.querySelector('.prev-btn');
    
    const views = ['title', 'quote', 'text', 'video', 'image'];
    let currentViewIndex = 0;
    
    function updateView() {
      // Remove all view classes first
      atoContainer.classList.remove('show-title', 'show-quote', 'show-image', 'show-video', 'show-text');
      
      // Add the current view class
      atoContainer.classList.add(`show-${views[currentViewIndex]}`);
    }
    
    function goToNextView() {
      if (currentViewIndex < views.length - 1) {
        currentViewIndex++;
        updateView();
      } else {
        // If on last view and next is clicked, go to next ato
        const currentAto = parseInt(atoContainer.dataset.ato);
        if (currentAto < 10) {
          document.querySelector(`#ato-${currentAto + 1}`).scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    
    function goToPrevView() {
      if (currentViewIndex > 0) {
        currentViewIndex--;
        updateView();
      } else {
        // If on first view and prev is clicked, go to previous ato
        const currentAto = parseInt(atoContainer.dataset.ato);
        if (currentAto > 1) {
          document.querySelector(`#ato-${currentAto - 1}`).scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    
    // Button event listeners
    nextBtn.addEventListener('click', goToNextView);
    prevBtn.addEventListener('click', goToPrevView);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNextView();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevView();
      }
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    atoContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    atoContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const threshold = 50; // Minimum swipe distance
      const diff = touchStartX - touchEndX;
      
      if (diff > threshold) {
        // Swipe left - next view
        goToNextView();
      } else if (diff < -threshold) {
        // Swipe right - previous view
        goToPrevView();
      }
    }
  }
});
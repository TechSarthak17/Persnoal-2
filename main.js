document.addEventListener('DOMContentLoaded', () => {

  const ctaButton = document.getElementById('cta-button');
  const modal = document.getElementById('secret-modal');
  const closeModalButton = document.getElementById('close-modal-button');
  const heroSection = document.querySelector('.hero');
  const typewriterMessage = document.getElementById('typed-message');
  const originalMessage = "My sweet love,\n\nHappy three-year anniversary! I wanted to create a small corner of the internet just for us, to celebrate all the moments, big and small, that have brought us to this day. You are my greatest adventure and my favorite person. Here's to many more years of laughter, love, and a lifetime of shared dreams. ✨";

  // Sahi audio element ko dhoondh rahe hain
  const ourSong = document.getElementById('our-song');

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Confetti Effect (on load) ---
  const createConfetti = (count) => {
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.top = `${-10 - Math.random() * 20}vh`; // Start above the viewport
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
      confetti.style.animationDelay = `${Math.random() * 2}s`;
      confetti.style.animationDuration = `${3 + Math.random() * 2}s`;
      heroSection.appendChild(confetti);
    }
  };

  // Only run confetti if motion is not reduced
  if (!prefersReducedMotion) {
    createConfetti(50);
  }

  // --- Typewriter Animation ---
  const typeMessage = (element, message, speed = 50) => {
    let i = 0;
    element.innerHTML = ''; // Clear initial placeholder text
    const timer = setInterval(() => {
      if (i < message.length) {
        if (message.charAt(i) === '\n') {
          element.innerHTML += '<br>';
        } else {
          element.innerHTML += message.charAt(i);
        }
        i++;
      } else {
        clearInterval(timer);
        element.classList.remove('typewriter');
      }
    }, speed);
  };

  if (!prefersReducedMotion) {
    typewriterMessage.classList.add('typewriter');
    typeMessage(typewriterMessage, originalMessage);
  } else {
    typewriterMessage.innerHTML = originalMessage.replace(/\n/g, '<br>');
  }

  // --- Modal Logic ---
  const openModal = () => {
    modal.classList.add('visible');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Yahan song play hoga
    if (ourSong) {
      ourSong.play().catch(error => {
        console.log("Audio play was prevented:", error);
      });
    }
  };

  const closeModal = () => {
    modal.classList.remove('visible');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore scrolling
  };

  ctaButton.addEventListener('click', openModal);
  closeModalButton.addEventListener('click', closeModal);

  // Close modal on outside click
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Close modal on Escape key press
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('visible')) {
      closeModal();
    }
  });

});
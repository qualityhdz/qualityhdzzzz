document.querySelectorAll("p.reveal-text").forEach(p => {
  let letters = p.textContent.split("");
  p.textContent = "";
  letters.forEach((letter, i) => {
    let span = document.createElement("span");
    span.textContent = letter; // keep normal spaces
    span.style.animationDelay = `${i * 0.1}s`;
    p.appendChild(span);
  });
});

window.addEventListener('scroll', function() {
  const section = document.querySelector('.section-bg');
  if (window.scrollY > 50) { // increase glow after scrolling 50px
    section.classList.add('glow-active');
  } else {
    section.classList.remove('glow-active'); // default soft glow
  }
});

window.addEventListener('load', () => {
  const logo = document.getElementById('startup-logo');
  const text = document.getElementById('startup-text');
  const startup = document.getElementById('startup');

  setTimeout(() => {
    // Slide logo left
	logo.style.opacity = "1"
	setTimeout(() => {
        text.style.opacity = '0';
	}, 100);
    logo.style.transform = 'translate(-200%, -50%)'; // more left
    // Move text next to logo and fade in
	setTimeout(() => {
		text.style.transform = 'translate(-30%, -50%)';
        text.style.opacity = '1';
	}, 100);

    // Fade out startup screen
    setTimeout(() => {
      startup.style.transition = 'opacity 0.5s ease';
      startup.style.opacity = '0';
      setTimeout(() => startup.style.display = 'none', 500);
    }, 1500);
  }, 150);
});
document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('#pricing .pricing-box');
  boxes.forEach((box, i) => {
    if(i === 0) box.classList.add('left');      // left pricing
    if(i === 1) box.classList.add('middle');    // middle pricing
    if(i === 2) box.classList.add('right');     // right pricing
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        boxes.forEach(box => box.classList.add('active'));
      }
    });
  }, { threshold: 0.3 });

  const pricingSection = document.querySelector('#pricing');
  observer.observe(pricingSection);
});

function animateCounters() {
  const section = document.querySelector('.counter-section');
  const counters = document.querySelectorAll('.counter');
  const labels = document.querySelectorAll('.counter-title');
  const sectionTop = section.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight - 100;

  if (sectionTop < triggerPoint && !section.classList.contains('animated')) {
    section.classList.add('animated');

    // Fade in labels
    labels.forEach((label, i) => {
      setTimeout(() => {
        label.style.opacity = 1;
        label.style.transform = 'translateY(0)';
      }, i * 150);
    });

    // Animate counters
    counters.forEach(counter => {
      const target = counter.getAttribute('data-target').toString();
      counter.style.opacity = 1;
      counter.style.transform = 'translateY(0)';
      counter.innerHTML = ''; // clear previous content

      target.split('').forEach(char => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('digit-wrapper');

        if (/[0-9]/.test(char)) {
          const strip = document.createElement('div');
          strip.classList.add('digit-strip');
          for (let i = 0; i <= 9; i++) {
            const span = document.createElement('span');
            span.textContent = i;
            strip.appendChild(span);
          }
          wrapper.appendChild(strip);
          counter.appendChild(wrapper);
          // Animate digit immediately
          setTimeout(() => {
            strip.style.transform = `translateY(-${char * 1.2}em)`;
          }, 50);
        } else {
          // Letter or special char
          wrapper.textContent = char;
          wrapper.style.opacity = 0;
          wrapper.style.transform = 'translateY(20px)';
          counter.appendChild(wrapper);
          setTimeout(() => {
            wrapper.style.transition = 'all 0.6s ease-out';
            wrapper.style.opacity = 1;
            wrapper.style.transform = 'translateY(0)';
          }, 50);
        }
      });
    });
  }
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

document.addEventListener('DOMContentLoaded', () => {
  const mega = document.querySelector('.mega-box');
  const text = document.querySelector('.mega-box .mega-text');

  if (text) {
    // Wrap each letter in a <span>, preserve spaces
    const letters = text.textContent.split('');
    text.textContent = ''; // clear original text

    letters.forEach((letter, index) => {
      if (letter === ' ') {
        // Preserve spaces
        text.appendChild(document.createTextNode(' '));
      } else {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.transitionDelay = `${0.025 * index + 0.3}s`; // stagger
        text.appendChild(span);
      }
    });
  }

  // Animate when box enters viewport
  const megaObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        mega.classList.add('animate-in');
        megaObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  megaObserver.observe(mega);
});

// stars
document.addEventListener("DOMContentLoaded", () => {
  const bg = document.getElementById("space-background");
  bg.style.position = "fixed";
  bg.style.inset = "0";
  bg.style.zIndex = "0";
  bg.style.pointerEvents = "none";
  bg.style.background = "radial-gradient(circle at center, #0a0a20, #000 80%)";
  bg.style.overflow = "hidden";

  // --- STATIC BACKGROUND STARS ---
  const STAR_COUNT = 200;
  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement("div");
    const size = Math.random() * 2 + 1;
    star.style.position = "absolute";
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.background = "rgba(200,150,255,0.7)";
    star.style.borderRadius = "50%";
    star.style.boxShadow = `0 0 ${size * 2}px rgba(200,150,255,0.7)`;
    star.style.opacity = Math.random() * 0.6 + 0.4;
    bg.appendChild(star);
  }

  // --- SHOOTING STAR FUNCTION ---
  function spawnShootingStar() {
    const star = document.createElement("div");
    const size = Math.random() * 3 + 2;
    star.style.position = "absolute";
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.background = "rgba(255,255,255,1)";
    star.style.borderRadius = "50%";

    // --- Bigger glowy trail ---
    star.style.boxShadow = `
      0 0 ${size * 4}px rgba(200,150,255,0.8),
      0 0 ${size * 8}px rgba(200,150,255,0.6),
      0 0 ${size * 12}px rgba(200,150,255,0.4),
      0 0 ${size * 16}px rgba(200,150,255,0.3)
    `;

    star.style.opacity = "0";
    star.style.zIndex = "1";

    // Random start along top
    const startX = Math.random() * window.innerWidth * 0.9;
    const startY = -10;

    // Random end, diagonal down-right
    const endX = startX + Math.random() * 300 + 100;
    const endY = window.innerHeight + 50;

    star.style.left = `${startX}px`;
    star.style.top = `${startY}px`;

    bg.appendChild(star);

    const duration = Math.random() * 1500 + 1500; // 1.5–3s
    const startTime = performance.now();

    function animate(time) {
      const progress = Math.min((time - startTime) / duration, 1);
      star.style.left = `${startX + (endX - startX) * progress}px`;
      star.style.top = `${startY + (endY - startY) * progress}px`;
      star.style.opacity = `${Math.sin(progress * Math.PI)}`; // fade in/out
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        star.remove();
      }
    }

    requestAnimationFrame(animate);
  }

  // --- SPAWN LOOP ---
  function shootingStarLoop() {
    spawnShootingStar();
    const nextTime = Math.random() * 400 + 200; // 0.2–0.6s
    setTimeout(shootingStarLoop, nextTime);
  }

  shootingStarLoop();
});

function scrollToNextSection() {
  const nextSection = document.querySelector('#portfolio'); // change selector as needed
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  }
}
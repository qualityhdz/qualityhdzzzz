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
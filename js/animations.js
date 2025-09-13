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
document.addEventListener('DOMContentLoaded', () => {

// menu
  class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
      this.mobileMenu = document.querySelector(mobileMenu);
      this.navList = document.querySelector(navList);
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = "active";
      this.handleClick = this.handleClick.bind(this);
    }

    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`);
      });
    }

    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    }

    addClickEvent() {
      this.mobileMenu.addEventListener("click", this.handleClick);
    }

    init() {
      if (this.mobileMenu) {
        this.addClickEvent();
      }
      return this;
    }
  }

  const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
  );
  mobileNavbar.init();

// rolagem
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }

//formulario do whats
  const whatsappForm = document.getElementById('whatsapp-form');
  
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const message = document.getElementById('message').value;

      const phone = '5561999812118';

      const finalMessage = `Olá! Meu nome é ${name}. Gostaria de dizer que: ${message}`;

      const encodedMessage = encodeURIComponent(finalMessage);

      const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;

      window.open(whatsappURL, '_blank');
    });
  }
//slider da pag inicial
  const slider = document.querySelector('.slider');
  const slidesContainer = document.querySelector('.slider .slides');
  const slides = document.querySelectorAll('.slider .slide');
  const nextButton = document.querySelector('.slider .next');
  const prevButton = document.querySelector('.slider .prev');
  const dots = document.querySelectorAll('.slider .dot');
  
  if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval;

    const goToSlide = (slideIndex) => {
      dots[currentSlide].classList.remove('active');
      
      currentSlide = (slideIndex + slides.length) % slides.length;
      
      slidesContainer.style.transform = `translateX(-${currentSlide * (100 / slides.length)}%)`;
      
      dots[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
      goToSlide(currentSlide + 1);
    };

    const prevSlide = () => {
      goToSlide(currentSlide - 1);
    };

    const startSlideShow = () => {
      slideInterval = setInterval(nextSlide, 5000);
    };

    const stopSlideShow = () => {
      clearInterval(slideInterval);
    };

    nextButton.addEventListener('click', () => {
      stopSlideShow();
      nextSlide();
      startSlideShow();
    });

    prevButton.addEventListener('click', () => {
      stopSlideShow();
      prevSlide();
      startSlideShow();
    });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        stopSlideShow();
        goToSlide(parseInt(dot.dataset.slide));
        startSlideShow();
      });
    });
   
    slidesContainer.style.width = `${slides.length * 100}%`;
    dots[0].classList.add('active');

    startSlideShow();
  }
});
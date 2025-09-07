// Espera o documento HTML ser completamente carregado para rodar o script
document.addEventListener('DOMContentLoaded', () => {

  // --- LÓGICA DO MENU MOBILE ---
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

  // --- LÓGICA PARA ANIMAÇÃO DE ROLAGEM ---
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

  // --- NOVA LÓGICA PARA O FORMULÁRIO DE CONTATO VIA WHATSAPP ---
  const whatsappForm = document.getElementById('whatsapp-form');
  
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(event) {
      // Previne o comportamento padrão de envio do formulário
      event.preventDefault();

      // Pega os valores dos campos
      const name = document.getElementById('name').value;
      const message = document.getElementById('message').value;

      // Número de telefone da oficina (formato internacional sem '+' ou '00')
      const phone = '5561999812118';

      // Monta a mensagem final
      const finalMessage = `Olá! Meu nome é ${name}. Gostaria de dizer que: ${message}`;

      // Codifica a mensagem para ser usada em uma URL
      const encodedMessage = encodeURIComponent(finalMessage);

      // Cria o link final do WhatsApp
      const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;

      // Abre o link em uma nova aba
      window.open(whatsappURL, '_blank');
    });
  }
// --- LÓGICA DO SLIDER NA PÁGINA INICIAL ---
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
      // Remove a classe 'active' do dot antigo
      dots[currentSlide].classList.remove('active');
      
      // Atualiza o índice do slide atual
      currentSlide = (slideIndex + slides.length) % slides.length;
      
      // Move o container de slides
      slidesContainer.style.transform = `translateX(-${currentSlide * (100 / slides.length)}%)`;
      
      // Adiciona a classe 'active' ao novo dot
      dots[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
      goToSlide(currentSlide + 1);
    };

    const prevSlide = () => {
      goToSlide(currentSlide - 1);
    };

    const startSlideShow = () => {
      slideInterval = setInterval(nextSlide, 5000); // Muda a cada 5 segundos
    };

    const stopSlideShow = () => {
      clearInterval(slideInterval);
    };

    // Event Listeners para os botões
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

    // Event Listeners para os indicadores
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        stopSlideShow();
        goToSlide(parseInt(dot.dataset.slide));
        startSlideShow();
      });
    });
    
    // Configuração inicial
    // É importante ajustar a largura do container de slides dinamicamente
    slidesContainer.style.width = `${slides.length * 100}%`;
    dots[0].classList.add('active');


    // Inicia o slideshow
    startSlideShow();
  }
});
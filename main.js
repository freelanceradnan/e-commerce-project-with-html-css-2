var swiperCategories = new Swiper(".categories__container", {
  slidesPerView: 3,
  spaceBetween: 24,
  loop: true,
 

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 6,
    },
  },
});
// swiper-products
var swiperProducts = new Swiper(".new__container", {
  slidesPerView: 3,
  spaceBetween: 24,
  loop: true,
 

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 6,
    },
  },
});
// product-tabs
const tabs=document.querySelectorAll('[data-target]')

tabContents=document.querySelectorAll('[content]')

tabs.forEach((tab)=>{
  tab.addEventListener('click',()=>{
    const target=document.querySelector(tab.dataset.target)
    tabContents.forEach((tabContent)=>{
      tabContent.classList.remove('active-tab')
    })
    target.classList.add('active-tab')
    tabs.forEach((tab)=>{
      tab.classList.remove('active-tab')
    })
    tab.classList.add('active-tab')
  })
})
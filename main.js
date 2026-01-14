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
// main-page-product-api
// productadded for the tab section

document.addEventListener('DOMContentLoaded',()=>{

  async function fetchproductapi(url){
        const loader=document.getElementById('loader-section')
    
   try{
   
    if(loader){
      loader.style.display="flex"
    }
   let res=await fetch(url)
   let data=await res.json()

   const productContainers=document.querySelectorAll('.product__container')
     
  if(productContainers.length === 0||data.length === 0)return;
   data.forEach((product, index)=>{
    const productHTML=`
     <div class="product__item">
                    <div class="product__banner">
                        <a href="details.html" onClick="getid(${product.id})" class="product__main-images">
                            <img src="${product.image}" alt="" class="product__main-img default">
                            <img src="${product.image}" alt="" class="product__main-img hover">
                        </a>
                        <div class="product__actions">
                            <a href="#" class="action__btn" aria-label="Quick view">
                                <i class="fi fi-rs-eye"></i>
                            </a>
                             <a href="#" class="action__btn" aria-label="Add To Wishlist" id="add-to-wishlist" onClick="getid(${product.id})">
                                <i class="fi fi-rs-heart"></i>
                            </a>
                             <a href="#" class="action__btn" aria-label="Compare">
                                <i class="fi fi-rs-shuffle"></i>
                            </a>
                        </div>
                        <div class="product__badge light-pink">Hot</div>
                    </div>
<div class="product__content" onClick="window.location.href='details.html';getid(${product.id})">
                        <span class="product__category">${product.category}</span>
                        <a href="#">
                            <h3 class="product-title">${product.title}</h3>
                            </a>
                            <div class="product-rating">
                                <i class="fi fi-rs-star"></i>
                                <i class="fi fi-rs-star"></i>
                                <i class="fi fi-rs-star"></i>
                                <i class="fi fi-rs-star"></i>
                                <i class="fi fi-rs-star"></i>
                            </div>
                        <div class="product-price flex">
                            <span class="new__price">$${product.price}</span>
                            <span class="old__price">$245.85</span>
                        </div>
                         <a href="#" class="action__btn cart__btn" aria-label="Add to cart">
                                <i class="fi fi-rs-shopping-bag-add"></i>
                            </a>
                    </div>
                </div>
    `;
    
    if(index<8){
     productContainers[0].innerHTML+=productHTML;
    }
    else if(index<16){
     if(productContainers[1]) productContainers[1].innerHTML+=productHTML;
    }
    else{
if(productContainers[2]) productContainers[2].innerHTML+=productHTML
    }
  
   })
   let wishlistbtn=document.querySelectorAll('#add-to-wishlist').forEach((btn)=>{
    btn.addEventListener('click',wishListFunc)
  })
   }
   catch(error){
console.log('error getting products:',error)
   }
   finally{
    if(loader){
      loader.style.display="none"
    }
   }
  }
  fetchproductapi('https://fakestoreapi.com/products')
})

// all-swiper-section
document.addEventListener('DOMContentLoaded',()=>{
  async function fetchapiswiper(url){
    const loader=document.getElementById('loader-section-slider')
    let swiper_div=document.querySelectorAll('.swiper-wrapper')
  try {
    loader.style.display="flex"
    let res=await fetch(url)
    let data=await res.json()
    swiper_div.forEach((div=>div.innerHTML=''))
    data.reverse().forEach((product,index)=>{
    const swiper=`
    
    <a href="shop.html" class="category__item swiper-slide">
        <img src="${product.image}" alt="" class="category__img">
        <h3 class="category__title">T Shirt</h3>
    </a>
    `
    if(swiper_div[0]){
      swiper_div[0].innerHTML+=swiper;
    }
    if(swiper_div[1]){
      swiper_div[1].innerHTML+=`
      <a href="shop.html" class="category__item swiper-slide">
        <img src="${product.image}" alt="" class="category__img">
        <h3 class="category__title">T Shirt</h3>
       <div class="product-rating">
                                <i class="fi fi-rs-star"></i>
                                <i class="fi fi-rs-star"></i>
                                <i class="fi fi-rs-star"></i>
                                <i class="fi fi-rs-star"></i>
                                <i class="fi fi-rs-star"></i>
                            </div>
                        <div class="product-price flex">
                            <span class="new__price">$${product.price}</span>
                            <span class="old__price">$245.85</span>
                        </div>
    </a>
      `
    }
    })
  } catch (error) {
    
  }
  finally{
    if(loader){
      loader.style.display="none"
    }
  }
  }
  fetchapiswiper('https://fakestoreapi.com/products')
})
// countdown-section
let timer = document.querySelectorAll('.countdown__period');
let closeDateTitle = document.querySelectorAll('.deals__countdown-text');

let targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 3);

closeDateTitle.forEach((singleDateTitle) => {
  singleDateTitle.textContent = targetDate.toDateString();
});

function timeDown() {
  let todayDate = new Date();
  
  let timeLeft = Math.floor((targetDate - todayDate) / 1000);

  if (timeLeft < 0) timeLeft = 0;

  let getDay = Math.floor(timeLeft / (3600 * 24));
  let getHour = Math.floor((timeLeft / 3600) % 24);
  let getMins = Math.floor((timeLeft / 60) % 60);
  let getSec = Math.floor(timeLeft % 60);

  const values = [getDay, getHour, getMins, getSec];
  
  timer.forEach((id, index) => {
    
    let value = values[index % 4]; 
    id.textContent = value < 10 ? '0' + value : value;
  });
}

timeDown();
setInterval(timeDown, 1000);
// wishlist--section
function wishListFunc(e){
  e.preventDefault()
  let section=e.currentTarget.closest('.product__item')
  let fullTitle=section.querySelector('.product-title').innerText
  let shortTitle=fullTitle.split(' ').slice(0,4).join(' ')
  let productWishlist={
    id:localStorage.getItem('id'),
    title:shortTitle,
    image:section.querySelector('img').src,
    price:section.querySelector('.new__price').innerText,
  }
  let wishlist=JSON.parse(localStorage.getItem('wishlist'))||[]
  let exists=wishlist.find(item=>item.id===productWishlist.id)
  if(exists){
    alert('already added!Wishlist Checkout')
  }
  else{
    wishlist.push(productWishlist)
    alert('WishList Added!')
    location.reload()
  }
  localStorage.setItem('wishlist',JSON.stringify(wishlist))
  
}

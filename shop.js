let productList=document.getElementById('product-section')
let paginationSection=document.getElementById('pagination')
let allproducts=[];
let productPerPage=8;


const productLoader=async()=>{
    let res=await fetch('https://fakestoreapi.com/products');
    let data=await res.json();
    allproducts=data;
    let productCounter=allproducts.length;
    document.getElementById('product-counter').innerHTML=`${productCounter} `
    showpageNumber(1);
    renderPaginationButtons()
}
const showpageNumber=(pageNumber)=>{
    let start=(pageNumber-1)*productPerPage;
    let end=start+productPerPage;
    productList.innerHTML=''

    let pageItems=allproducts.slice(start,end)
    pageItems.forEach((product)=>{

    productList.innerHTML+=`
     <div class="product__item" data=${product.id}>
                    <div class="product__banner">
                        <a href="details.html" class="product__main-images" onClick="getid(${product.id})">
                            <img src="${product.image}" alt="" class="product__main-img default">
                            <img src="${product.image}" alt="" class="product__main-img hover">
                        </a>
                        <div class="product__actions">
                            <a href="#" class="action__btn" aria-label="Quick view" id="quick-btn">
                                <i class="fi fi-rs-eye"></i>
                            </a>
                             <a href="#" class="action__btn" aria-label="Add To Wishlist">
                                <i class="fi fi-rs-heart" id="add-to-wishlist" onClick="getid(${product.id})"></i>
                            </a>
                             <a href="#" class="action__btn" aria-label="Compare" onclick="compareFunc(event, ${product.id})"/>
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
    
    `
    let wishlistbtn=document.querySelectorAll('#add-to-wishlist').forEach((btn)=>{
    btn.addEventListener('click',wishListFunc)
   
    
  })
  
   let comparebtn=document.querySelectorAll('#compare-btn').forEach(btn=>{
    btn.addEventListener('click',compareFunc)})
      let quickbtn=document.querySelectorAll('#quick-btn').forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
       
      const card=e.target.closest('.product__item')
     
      console.log(card)
      if(!card) return;
      const productId=card.getAttribute('data')
      const selectedProduct=allproducts.find(p=>String(p.id)==productId)
      renderPreview(selectedProduct)
    })
  })
    })
    
    
}

const renderPaginationButtons = () => {
    let totalpages = Math.ceil(allproducts.length / productPerPage);
    paginationSection.innerHTML = '';

    for (let i = 1; i <= totalpages; i++) {
        let btn = document.createElement('button');
        if (i === 1) {
            btn.classList.add('active');
        }
        btn.innerText = i;
        btn.classList.add('pagination__btn'); 
        
        btn.addEventListener('click', () => {
            
            document.querySelectorAll('.pagination__btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            showpageNumber(i);
        });
        
        paginationSection.appendChild(btn);
    }
}
// wishlist--section
function wishListFunc(e,productId){
  e.preventDefault()
  let section=e.currentTarget.closest('.product__item')
  let fullTitle=section.querySelector('.product-title').innerText
  let shortTitle=fullTitle.split(' ').slice(0,4).join(' ')
  let productWishlist={
    id: String(productId),
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

function compareFunc(e, productId) {
    e.preventDefault();
    let section = e.currentTarget.closest('.product__item');
    
    let product = {
        // Use the productId passed from the HTML, not localStorage
        id: String(productId), 
        title: section.querySelector('.product-title').innerText,
        image: section.querySelector('img').src,
        price: section.querySelector('.new__price').innerText
    };

    let compare = JSON.parse(localStorage.getItem('compare')) || [];
    
    // Ensure we compare strings to strings
    let exists = compare.find(compareitem => String(compareitem.id) === String(product.id));

    if (exists) {
        alert('Product already added! Add Another');
    } 
    else if (compare.length >= 3) {
        alert('You can only compare a maximum of 3 products. Please remove one first.');
    } 
    else {
        compare.push(product);
        alert('Product added to comparison!');
        localStorage.setItem('compare', JSON.stringify(compare));
    }
}
document.addEventListener('DOMContentLoaded',productLoader)

//search-box section

const searchInput = document.querySelector('[data-search]');
const suggestionBox = document.getElementById('data-suggestion');
const searchBtn = document.querySelector('.search__btn'); // 

let product = [];


fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
        product = data;
    })
    .catch(err => console.log("Error fetching products:", err));


searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    suggestionBox.innerHTML = '';
    
    if (value.length > 0) {
        
        const matchFinder = product.filter(p => 
            p.title.toLowerCase().includes(value)
        ).slice(0, 6);
        
        if (matchFinder.length > 0) {
            suggestionBox.classList.remove('hide');
            matchFinder.forEach(match => {
                const div = document.createElement('div');
                div.classList.add('suggestion-item');
                div.textContent = match.title;
                div.onclick = () => goToResult(match.title);
                suggestionBox.appendChild(div);
            });
        } else {
            suggestionBox.classList.add('hide');
        }
    } else {
        suggestionBox.classList.add('hide');
    }
});


searchBtn.addEventListener('click', () => {
    goToResult(searchInput.value);
});


searchInput.addEventListener('keypress', (e) => {
    if (e.key === "Enter") { 
        goToResult(searchInput.value);
    }
});


function goToResult(query) {
    if (!query.trim()) return; 
    
    localStorage.setItem('searchQuary', query); 
    window.location.href = 'result.html';
}
let previewContainer=document.querySelector('.preview-container')
function renderPreview(product){

previewContainer.style.display="flex"
previewContainer.innerHTML=`
<div class="preview active" data=${product.id}>
<i class="fas fa-times close-icon" id="close-preview"></i>
                    <div class="product__banner">
                        <a href="details.html" onClick="getid(${product.id})" class="product__main-images">
                            <img src="${product.image}" alt="" class="product__main-img default">
                            <img src="${product.image}" alt="" class="product__main-img hover">
                        </a>
                       
                        
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
                        <div class="quickview-price flex">
                            <span class="new__price">$${product.price}</span>
                            <span class="old__price">$245.85</span>
                        </div>
                        <a href="#" class="btn btn--sm">Add to Cart</a>
    
           
        
                    </div>
                </div>
`
document.getElementById('close-preview').onclick = () => {
        previewContainer.style.display = 'none';
    };
window.onclick=(e)=>{
  if(e.target===previewContainer){
    previewContainer.style.display='none'
  }
}
}
//hambarger menu
const navMenu=document.getElementById('nav-menu'),
navToggle=document.getElementById('nav-toggle'),
navClose=document.getElementById('nav-close')
if(navToggle){
  navToggle.addEventListener('click',()=>{
    navMenu.classList.add('show-menu')
  })
}
if(navClose){
  console.log(navClose)
  navClose.addEventListener('click',()=>{
    navMenu.classList.remove('show-menu')
  })
}

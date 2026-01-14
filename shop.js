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
     <div class="product__item">
                    <div class="product__banner">
                        <a href="details.html" class="product__main-images" onClick="getid(${product.id})">
                            <img src="${product.image}" alt="" class="product__main-img default">
                            <img src="${product.image}" alt="" class="product__main-img hover">
                        </a>
                        <div class="product__actions">
                            <a href="#" class="action__btn" aria-label="Quick view">
                                <i class="fi fi-rs-eye"></i>
                            </a>
                             <a href="#" class="action__btn" aria-label="Add To Wishlist">
                                <i class="fi fi-rs-heart" id="add-to-wishlist" onClick="getid(${product.id})"></i>
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
    
    `
    let wishlistbtn=document.querySelectorAll('#add-to-wishlist').forEach((btn)=>{
    btn.addEventListener('click',wishListFunc)
    
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

document.addEventListener('DOMContentLoaded',productLoader)
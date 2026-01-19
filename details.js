let alldataProduct=[];
document.addEventListener('DOMContentLoaded',()=>{
    fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(data=>{
        alldataProduct=data;
        let id=localStorage.getItem('id')

        let newProduct=data.find(product=>product.id==Number(id))
        
        document.getElementById('product-details').innerHTML=`
        <div class="details__container container grid">
<div class="details__group">
    <img src="${newProduct.image}" alt="" class="details__img">
    <div class="details__small-images grid">
<img src="${newProduct.image}" alt="" class="details__small-img">
<img src="${newProduct.image}" alt="" class="details__small-img">
<img src="${newProduct.image}" alt="" class="details__small-img">
</div>
</div>
<div class="details__group">
    <h3 class="details__title">${(newProduct.title).split(" ").slice(0,5).join(" ")}</h3>
    <p class="details__brand">Brands: <span id="details__brand-span">${newProduct.category}</span></p>
    <div class="details__price flex">
    <span class="new__price">$${newProduct.price}</span>
    <span class="old__price">$${(newProduct.price+10).toFixed(2)}</span>
    <span class="save__price">${ ((10 / (newProduct.price + 10)) * 100).toFixed(0) }%OFF</span>
    </div>
    <p class="short__description">
        ${newProduct.description}
    </p>
    <ul class="product__list">
        <li class="list__item flex">
<i class="fi-rs-crown">1 year brand warrenty</i>
        </li>
        <li class="list__item flex">
<i class="fi-rs-refresh">7 Day Return Policy</i>
        </li>
        <li class="list__item flex">
<i class="fi-rs-credit-card">Cash on Delivery</i>
        </li>
    </ul>
    <div class="details__color flex">
        <span class="details__color-title">Color</span>
        <ul class="color__list">
            <li>
                <a href="#" class="color__link" style="background-color: hsl(37,100%,65%);"></a>
            </li>
            <li>
                <a href="#" class="color__link" style="background-color: hsl(353,100%,67%);"></a>
            </li>
            <li>
                <a href="#" class="color__link" style="background-color: hsl(49,100%,60%);"></a>
            </li>
            <li>
                <a href="#" class="color__link" style="background-color: hsl(304,100%,78%);"></a>
            </li>
            <li>
                <a href="#" class="color__link" style="background-color: hsl(323,100%,67%);"></a>
            </li>
       
        </ul>
    </div>
    <div class="details__size flex">
        <span class="details__size-title">Size</span>
        <ul class="size__list">
            <li>
                <a href="#" class="size__link size-active">M</a>
            </li>
            <li>
                <a href="#" class="size__link">L</a>
            </li>
            <li>
                <a href="#" class="size__link">XL</a>
            </li>
           <li>
                <a href="#" class="size__link">XXL</a>
            </li>
       </ul>
    </div>
<div class="details-action">
    <input type="number" class="quantity" value="1" min="1">
<a href="#" class="btn btn--sm" id="addtocart">Add To Cart</a>
<a href="#" class="details__action-btn" id="add-to-wishlist">
     <i  class="fi fi-rs-heart"></i>
</a>
</div>
<ul class="details__meta">
    <li class="meta__list-flex">
        <span>SKU:</span>FWM27VK
    </li>
    <div class="meta__list-flex">
        <span>Tags:</span> Cloth,Women,Dress
    </div>
     <div class="meta__list-flex">
        <span>Availability:</span> 8 Items In Stock
    </div>
 
</ul>
</div>
</div>
        `
innerData(newProduct)
relatedProductApi(newProduct)
document.querySelectorAll('#addtocart').forEach(btn=>{
    btn.addEventListener('click',addtoCartFunc)
})
 let wishlistbtn=document.querySelectorAll('#add-to-wishlist').forEach((btn)=>{
    btn.addEventListener('click',wishListDetailsFunc)
  })
    
})

function innerData(product){
let table=document.getElementById('info__table')
let brandText=document.querySelector('#details__brand-span')
table.innerHTML=''
 if (product.category === "men's clothing") {
        table.innerHTML += `
            <tr>
                <th class="table__header">Fjallraven - Foldsack No. 1 Backpack:</th>
                <td class="table__data">A functional backpack with a 15-inch laptop sleeve and a classic fold-over design.</td>
            </tr>
            <tr>
                <th class="table__header">Mens Casual Premium Slim Fit T-Shirts:</th>
                <td class="table__data">These shirts offer a modern, slim-fit silhouette with a comfortable cotton-blend fabric. They are designed to be breathable and lightweight for everyday wear.</td>
            </tr>
            <tr>
                <th class="table__header">Mens Cotton Jacket:</th>
                <td class="table__data">A rugged, mid-weight jacket featuring a stand collar and multiple functional pockets.</td>
            </tr>
        `;
    }
else if(product.category === "jewelery") {
        table.innerHTML += `
            <tr>
                <th class="table__header">John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet:</th>
                <td class="table__data">A handcrafted piece featuring 925 sterling silver and 18K yellow gold.</td>
            </tr>
            <tr>
                <th class="table__header">Solid Gold Petite Micropave:</th>
                <td class="table__data">A delicate ring crafted from 14K yellow gold and adorned with tiny, shimmering diamonds.</td>
            </tr>
            <tr>
                <th class="table__header">White Gold Plated Princess:</th>
                <td class="table__data">center stone. The band is plated in white gold for a polished, brilliant finish.</td>
            </tr>
        `;

    }
else {
        table.innerHTML += `
            <tr>
                <th class="table__header">BIYLACLESEN Women's 3-in-1 Snowboard Jacket:</th>
                <td class="table__data">A heavy-duty winter jacket with a detachable fleece inner and a windproof, water-resistant outer shell.</td>
            </tr>
            <tr>
                <th class="table__header">Lock and Love Women's Removable Hooded Biker Jacket:</th>
                <td class="table__data">A chic faux-leather jacket with a removable knit hood.</td>
            </tr>
            <tr>
                <th class="table__header">DANVOUY Womens T Shirt Casual Cotton Short Sleeve:</th>
                <td class="table__data">A soft, stretchy tee with a classic crew neck and "Letter Print" design.</td>
            </tr>
        `;
    }
    
}
async function relatedProductApi(preProduct){
try{
    let productContainer=document.getElementById('product__related-section')
    let res=await fetch('https://fakestoreapi.com/products')
    let data=await res.json()
    const filterProducts=data.filter(product=>product.category===preProduct.category)
    filterProducts.forEach((product)=>{
     productContainer.innerHTML+=`
     
     <div class="product__item" data=${product.id}>
                    <div class="product__banner">
                        <a href="details.html" onClick="getid(${product.id})" class="product__main-images">
                            <img src="${product.image}" alt="" class="product__main-img default">
                            <img src="${product.image}" alt="" class="product__main-img hover">
                        </a>
                        <div class="product__actions">
                            <a href="#" class="action__btn" aria-label="Quick view" id="quick-btn">
                                <i class="fi fi-rs-eye"></i>
                            </a>
                             <a href="#" class="action__btn" aria-label="Add To Wishlist" id="add-to-wishlist" onClick="getid(${product.id})">
                                <i class="fi fi-rs-heart"></i>
                            </a>
                             <a href="#" class="action__btn" aria-label="Compare" onclick="compareFunc(event, ${product.id})">
                                <i class="fi fi-rs-shuffle" ></i>
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
    btn.addEventListener('click',wishListDetailsRelFunc)
    let comparebtn=document.querySelectorAll('#compare-btn').forEach(btn=>{
    btn.addEventListener('click',compareFunc)})
   
  })
    let quickbtn=document.querySelectorAll('#quick-btn').forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        
      const card=e.target.closest('.product__item')
     
      
      if(!card) return;
      const productId=card.getAttribute('data')
      const selectedProduct=data.find(p=>String(p.id)==productId)
      renderPreview(selectedProduct)
    })
  })
    })
}

catch(error){
    console.log('your error is:',error)
}
    
}
})
function addtoCartFunc(e){
    e.preventDefault();
    let section=e.currentTarget.closest('#product-details')
    let priceText = section.querySelector('.new__price').innerText;
    let numericPrice = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
    let qtyInput=section.querySelector('.quantity').value
    let product={
        id:localStorage.getItem('id'),
        title:section.querySelector('.details__title').innerText,
        image:section.querySelector('img').src,
        qty:Number(qtyInput),
        price:numericPrice,
   }
   
   let cart=JSON.parse(localStorage.getItem('cart'))||[]
   const exists=cart.find(item=>item.id===product.id)
  if(exists){
   exists.qty=Number(exists.qty)+Number(product.qty)
  }
   else{
    cart.push(product)
   }
   localStorage.setItem('cart',JSON.stringify(cart))
  
   alert('product added')
    location.reload();
}
// wishlist-js
function wishListDetailsFunc(e){
  e.preventDefault()
  let section=e.currentTarget.closest('.details__container')
 
let productWishlist={
   id:localStorage.getItem('id'),
   title:document.querySelector('.details__title').innerText,
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
function wishListDetailsRelFunc(e){
    e.preventDefault()
    let section=e.currentTarget.closest('.product__item')
    let productWishlistRel={
        id:localStorage.getItem('id'),
        image:section.querySelector('img').src,
        title:section.querySelector('.product-title').innerText,
        price:section.querySelector('.new__price').innerText
    }
      let wishlist=JSON.parse(localStorage.getItem('wishlist'))||[]
   let exists=wishlist.find(item=>item.id===productWishlistRel.id)
   if(exists){
   alert('already added!Wishlist Checkout')
}
     else{
       wishlist.push(productWishlistRel)
       alert('WishList Added!')
       location.reload()
     }
     localStorage.setItem('wishlist',JSON.stringify(wishlist))
  
    
}
function compareFunc(e, productId) {
    e.preventDefault();
    let section = e.currentTarget.closest('.product__item');
    
    let product = {

        id: String(productId), 
        title: section.querySelector('.product-title').innerText,
        image: section.querySelector('img').src,
        price: section.querySelector('.new__price').innerText
    };

    let compare = JSON.parse(localStorage.getItem('compare')) || [];
    
    
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



// document.addEventListener('DOMContentLoaded', () => {
  
//     initSearchLogic(); 
// });


// function initSearchLogic() {
//     const searchInput = document.querySelector('[data-search]');
//     const suggestionBox = document.getElementById('data-suggestion');
//     const searchBtn = document.querySelector('.search__btn');

//     let products = []; 
//     fetch('https://fakestoreapi.com/products')
//         .then(res => res.json())
//         .then(data => {
//             products = data;
//         });

//     searchInput.addEventListener('input', (e) => {
//         const value = e.target.value.toLowerCase();
//         suggestionBox.innerHTML = '';

//         if (value.length > 0) {
//             const matchFinder = products.filter(p =>
//                 p.title.toLowerCase().includes(value)
//             ).slice(0, 6);

//             if (matchFinder.length > 0) {
//                 suggestionBox.classList.remove('hide');
//                 matchFinder.forEach(match => {
//                     const div = document.createElement('div');
//                     div.classList.add('suggestion-item');
//                     div.textContent = match.title;
//                     div.onclick = () => goToResult(match.title);
//                     suggestionBox.appendChild(div);
//                 });
//             } else {
//                 suggestionBox.classList.add('hide');
//             }
//         } else {
//             suggestionBox.classList.add('hide');
//         }
//     });

//     searchBtn.addEventListener('click', () => goToResult(searchInput.value));

//     searchInput.addEventListener('keypress', (e) => {
//         if (e.key === "Enter") goToResult(searchInput.value);
//     });
// }

function goToResult(query) {
    if (!query.trim()) return;
    localStorage.setItem('searchQuary', query);
    window.location.href = 'result.html';
}
// //hambarger menu
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
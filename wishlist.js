function renderCart(){
  const tbody=document.querySelector('.product-wishlist-tbody')
  if(!tbody){
    return;
  }
  tbody.innerHTML='';
  let cart=JSON.parse(localStorage.getItem('wishlist'))||[]
  if(cart.length===0){
  tbody.innerHTML=`<tr><td colspan="6">You Have No Product!Add Now WishList Product!</td></tr>`
  
  if(typeof wishlistCounter === "function"){
      wishlistCounter(); 
    }
    return;
  }
  
  cart.forEach((item,index)=>{
   let tr=document.createElement('tr')
   tr.innerHTML=`
    
                <td><img src="${item.image}" class="table__img"></td>
               <td>
                    <h3 class="table__title">${item.title}</h3>
                     
                </td>
              <td>
                <span class="table__price">${item.price}</span>
              </td>
              <td><span class="total__stock">In Stock</span></td>
              <td><a href="#" class="btn btn btn--sm" id="addtocart">Add to Cart</a></td>
              <td><i class="fi fi-rs-trash table__trash" id="remove-wishlist-product" data-index="${index}"></i></td>
            
   `
   tbody.appendChild(tr);
   document.querySelectorAll('#addtocart').forEach(btn=>{
    btn.addEventListener('click',addtoCartFunc)
})
  })
  if(typeof wishlistCounter==="function"){
    wishlistCounter()
   }
  
}
let mainProductDiv=document.querySelector('.product-wishlist-tbody')
if(mainProductDiv){
  mainProductDiv.addEventListener('click',e=>{
    if(e.target.classList.contains('table__trash')){
      let index=e.target.dataset.index;
      let wishlist=JSON.parse(localStorage.getItem('wishlist'))||[]
    wishlist.splice(index,1)
    localStorage.setItem('wishlist',JSON.stringify(wishlist))
    renderCart()
    }
   
})
}

// addtocart
function addtoCartFunc(e){
    e.preventDefault();
    let section=e.currentTarget.closest('.table__container')
    let priceText = section.querySelector('.table__price').innerText;
    let numericPrice = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
    
    let product={
        id:localStorage.getItem('id'),
        title:section.querySelector('.table__title').innerText,
        image:section.querySelector('img').src,
        
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
document.addEventListener('DOMContentLoaded',renderCart)
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
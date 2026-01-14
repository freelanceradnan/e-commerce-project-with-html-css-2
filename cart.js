function renderCart(){
    const tbody=document.querySelector('.product-tbody')
    if(!tbody)return;
    tbody.innerHTML='';
    let cart=JSON.parse(localStorage.getItem('cart'))||[];
    if(cart.length===0){
        tbody.innerHTML=`<tr><td colspan="6">Your cart is Empty</td></tr>`
        updateSubTotal([]);
        return;
    }
    cart.forEach((item,index)=>{
        
        const tr=document.createElement('tr')
        const cleanPrice = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
        const itemQty=parseInt(item.qty)||1;
        const itemSubtotal = (cleanPrice * itemQty).toFixed(2);
        tr.innerHTML=`
          <td><img src="${item.image}" class="table__img" alt=""></td>
           <td><h3 class="table__title">${item.title}</h3></td>
       <td><span class="table__price">$${cleanPrice.toFixed(2)}</span></td>
          <td>
             <input type="number" value="${itemQty}" min="1" class="qty-input" data-index="${index}">
           </td>
           <td><span class="table__subtotal">$${itemSubtotal}</span></td>
            <td><button class="remove-btn" data-index="${index}">X</button></td>
        `
       
    tbody.appendChild(tr)
  
    })
      updateSubTotal(cart)
}
document.querySelector('.product-tbody').addEventListener('input',e=>{
    if(e.target.classList.contains('qty-input')){
        const index=e.target.dataset.index;
        let cart=JSON.parse(localStorage.getItem('cart'))||[]
        cart[index].qty=parseInt(e.target.value)||1;
        localStorage.setItem('cart',JSON.stringify(cart))
        renderCart()
    }
})

document.querySelector('.product-tbody').addEventListener('click',e=>{
    if(e.target.classList.contains('remove-btn')){
        const index=e.target.dataset.index;
        let cart=JSON.parse(localStorage.getItem('cart'))||[]
        cart.splice(index,1);
        localStorage.setItem('cart',JSON.stringify(cart))
        renderCart()
    }
})

function updateSubTotal(cart){
    

    let subtotal=0;
    cart.forEach(item=>{
        const price = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
        const qty=parseInt(item.qty)||1;
        subtotal+=price*qty
       
       
    })
   
    
    const shipping=cart.length>0?10:0;
    const total=subtotal+shipping;
    const subtotalElement = document.querySelector('.cart__total-table tr:nth-child(1) .cart__total-price');
    const shippingElement = document.querySelector('.cart__total-price-shipping');
    const totalElement = document.querySelector('.cart__total-price-subtotal');
    if (subtotalElement) subtotalElement.innerText = `$${subtotal.toFixed(2)}`;
    if (shippingElement) shippingElement.innerText = `$${shipping.toFixed(2)}`;
  if (totalElement) totalElement.innerText = `$${total.toFixed(2)}`;
  if(typeof updateCartBadge==="function"){
    updateCartBadge()
     }
}
document.addEventListener('DOMContentLoaded', renderCart);
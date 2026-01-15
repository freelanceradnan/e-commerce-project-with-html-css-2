
function checkoutShow(){
let cart=JSON.parse(localStorage.getItem('cart'))
let checkoutProductDiv=document.querySelector('#product-tbody-checkout')

if(checkoutProductDiv){
checkoutProductDiv.innerHTML=''
let overallSubtotal=0;
cart.forEach(cartitem=>{
const price = parseFloat(String(cartitem.price).replace(/[^0-9.]/g, '')) || 0;
const qty = parseInt(cartitem.qty) || 1;
const itemSubtotal = price * qty;
     overallSubtotal+=itemSubtotal
 checkoutProductDiv.innerHTML+=`
 <tr>
        <td>
            <img src="${cartitem.image}" alt="" class="product-image-checkout">
            
        </td>
        <td class="product-section-textBox">
            <h2 class="product-title-checkout">${cartitem.title}</h2>
            <h2 class="product-quantity-checkout">x${cartitem.qty}</h2>
        </td>
        <td class="product-total-checkout">$${itemSubtotal.toFixed(2)}</td>
    </tr> `


})
const shipping=cart.length>0?10.00 :0;
const finalTotal=overallSubtotal+shipping;
const subtotalElement = document.querySelector('.checkout-subtotal');
        const shippingElement = document.querySelector('.checkout-shipping');
        const totalElement = document.querySelector('.checkout-total');

        // Update the text
        if (subtotalElement) subtotalElement.innerText = `$${overallSubtotal.toFixed(2)}`;
        if (shippingElement) shippingElement.innerText = `$${shipping.toFixed(2)}`;
        if (totalElement) totalElement.innerText = `$${finalTotal.toFixed(2)}`;
}

}



document.addEventListener('DOMContentLoaded',checkoutShow)
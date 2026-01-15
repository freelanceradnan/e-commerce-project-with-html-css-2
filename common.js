// common.js
//cart counter
function updateCartBadge() {
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    
    const totalItems = cart.reduce((sum, item) => sum + (parseInt(item.qty) || 1), 0);
    
    
    const counterElement = document.querySelector('#counter__total');
    
    if (counterElement) {
        counterElement.innerText = totalItems;
        
        counterElement.style.display = totalItems > 0 ? 'initial' : 'none';
    }
   
}

function checkProductSection(){
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + (parseInt(item.qty) || 1), 0);
    let productBtn=document.querySelector('#checkout-page')
    
    productBtn.addEventListener('click',()=>{
        if(totalItems>0){
            window.location.href='checkout.html'
        }
        else{
            alert('There are no product For Checkout!')
            return;
        }
    })
}
document.addEventListener('DOMContentLoaded', updateCartBadge);

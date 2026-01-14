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


document.addEventListener('DOMContentLoaded', updateCartBadge);

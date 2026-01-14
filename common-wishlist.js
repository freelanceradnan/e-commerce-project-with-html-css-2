function wishlistCounter(){
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let wishlistItem=wishlist.length
    
    let wishlistcounter=document.querySelector('#counter__total-wishlist')
   
    
    if(wishlistcounter){
    wishlistcounter.innerText=`${wishlistItem}`
    wishlistcounter.style.display=wishlistItem> 0 ? 'initial' : 'none';
    }
    
}
document.addEventListener('DOMContentLoaded',wishlistCounter)
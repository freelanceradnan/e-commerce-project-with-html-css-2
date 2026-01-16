function showCompare(){
    let compare=JSON.parse(localStorage.getItem('compare'));
    const imgRow=document.querySelector('#row-image');
    const titleRow=document.querySelector('#row-title');
    const priceRow=document.querySelector('#row-price');
    const stockRow=document.querySelector('#row-stock');
    const buyRow=document.querySelector('#row-buy');
    const removeRow=document.querySelector('#row-remove');
    imgRow.innerHTML = '<th>Image</th>';
    titleRow.innerHTML = '<th>Name</th>';
    priceRow.innerHTML = '<th>Price</th>';
    
    stockRow.innerHTML = '<th>Stock</th>';
    buyRow.innerHTML = '<th>Buy</th>';
    removeRow.innerHTML = '<th>Remove</th>'
    if (compare.length === 0) {
        imgRow.innerHTML += '<td colspan="3">No products to compare</td>';
        return;
    }
   compare.forEach((product, index) => {
     
        imgRow.innerHTML += `<td><img src="${product.image}" alt="" class="compare__img"></td>`;
        
       
        titleRow.innerHTML += `<td><h3 class="table__title">${product.title}</h3></td>`;
        
      
        priceRow.innerHTML += `<td><span class="table__price">${product.price}</span></td>`;
        
        
        
        
      
        stockRow.innerHTML += `<td><span class="table__stock">In Stock</span></td>`;
        
    
        buyRow.innerHTML += `<td><a href="#" class="btn btn--sm" onclick="addToCart(${product.id})">Add to Cart</a></td>`;
        
        
        removeRow.innerHTML += `<td><i class="fi fi-rs-trash table__trash" onclick="deleteCompare(${index})" style="cursor:pointer"></i></td>`;
    });
}
function deleteCompare(index) {
    let compare = JSON.parse(localStorage.getItem('compare')) || [];
    compare.splice(index, 1);
    localStorage.setItem('compare', JSON.stringify(compare));
    showCompare(); 
}
document.addEventListener('DOMContentLoaded',showCompare)
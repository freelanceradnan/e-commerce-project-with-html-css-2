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
     
        imgRow.innerHTML += `<td><img src="${product.image}" alt="" class="compare__img" data-image="${product.image}"></td>`;
        
       
        titleRow.innerHTML += `<td><h3 class="table__title" data-title="${product.title}">${product.title}</h3></td>`;
        
      
        priceRow.innerHTML += `<td><span class="table__price data-price="${product.price}">${product.price}</span></td>`;
        
        
        
        
      
        stockRow.innerHTML += `<td><span class="table__stock">In Stock</span></td>`;
        
    
       buyRow.innerHTML += `<td>
        <a href="#" class="btn btn--sm" id="add-to-cart-compare" 
           data-id="${product.id}" 
           data-title="${product.title}" 
           data-price="${product.price}" 
           data-image="${product.image}">
           Add to Cart
        </a></td>`;
        
        
        removeRow.innerHTML += `<td><i class="fi fi-rs-trash table__trash" onclick="deleteCompare(${index})" style="cursor:pointer"></i></td>`;
    });
    addtocart();
}

function deleteCompare(index) {
    let compare = JSON.parse(localStorage.getItem('compare')) || [];
    compare.splice(index, 1);
    localStorage.setItem('compare', JSON.stringify(compare));
    showCompare(); 
}
function addtocart() {
    let mainbtn = document.querySelectorAll('#add-to-cart-compare');
    
    mainbtn.forEach((btn) => {
       
        btn.onclick = (e) => {
            e.preventDefault();
            let data = e.currentTarget.dataset;
            
            let product = {
                id: Number(data.id), 
                image: data.image,
                title: data.title,
                price: data.price, 
                qty: 1
            };

            
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            let exists = cart.find(item => Number(item.id) === product.id);

            if (exists) {
                alert('Already added into Cart!');
            } else {
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));
                alert('Success! Added to Cart.');
                location.reload()
             if(typeof renderCart === "function") renderCart();
            }
        };
    });
}
document.addEventListener('DOMContentLoaded',showCompare)
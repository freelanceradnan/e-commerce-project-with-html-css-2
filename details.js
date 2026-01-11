document.addEventListener('DOMContentLoaded',()=>{
    fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(data=>{
        let id=localStorage.getItem('id')

        let newProduct=data.find(product=>product.id==Number(id))
        console.log(id)
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
    <h3 class="details__title">Henley Shirt</h3>
    <p class="details__brand">Brands: <span>adidas</span></p>
    <div class="details__price flex">
    <span class="new__price">$116</span>
    <span class="old__price">$200.00</span>
    <span class="save__price">25%off</span>
    </div>
    <p class="short__description">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, deleniti dolores eligendi neque omnis cumque non vel delectus? Rerum, aspernatur.
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
    <input type="number" class="quantity" value="3">
<a href="#" class="btn btn--sm">Add To Cart</a>
<a href="#" class="details__action-btn">
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
    })
})

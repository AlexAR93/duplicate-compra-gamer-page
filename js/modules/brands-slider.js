'use strict'

const brandsSliderContainer=document.getElementById('brands-slider')

const brandsSlider=async()=>{

    const url="./products.json";
    const productsDate=await fetch(url);
    const products=await productsDate.json();  

    products.brands.forEach((b)=>{
        const divContent=document.createElement('div');
        const imgChild=document.createElement('img');
   
        imgChild.setAttribute('src',`${b.brand}`)
        divContent.appendChild(imgChild);
        brandsSliderContainer.appendChild(divContent)
    })
}
export default brandsSlider()
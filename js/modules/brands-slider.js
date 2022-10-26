'use strict'
import SliderInterval from "./SliderInterval.js";
const brandsSliderContainer=document.getElementById('brands-slider')
const brandsSlider=async()=>{

    const url="./products.json";
    const productsDate=await fetch(url);
    const products=await productsDate.json();  

    products.brands.forEach((b,i)=>{
        const divContent=document.createElement('div');
        const imgChild=document.createElement('img');
   
        imgChild.setAttribute('src',`${b.brand}`)
        divContent.setAttribute('value',`${i}`)
        divContent.appendChild(imgChild);
        brandsSliderContainer.appendChild(divContent)
    })
    const intervalo=new SliderInterval(brandsSliderContainer);
    const transtion=-150/2;
    intervalo.initInterval(transtion,0,'px',2000);
    
}
export default brandsSlider()
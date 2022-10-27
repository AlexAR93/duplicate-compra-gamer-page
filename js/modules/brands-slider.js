'use strict'
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
    
    brandsAutoScroll()
    
}
export default brandsSlider()



const brandsAutoScroll=()=>{
    let interval=null;
    start()
    interval=setInterval(() => {
        next(widthPorcentage,"%")
    }, 3000);
    let widthElement=brandsSliderContainer.childNodes[2].clientWidth;
    let widthPorcentage=(widthElement*100)/window.innerWidth;

    
    window.addEventListener('resize',()=>{
        widthElement=brandsSliderContainer.childNodes[2].clientWidth;
        widthPorcentage=(widthElement*100)/window.innerWidth

        clearInterval(interval)
        interval=setInterval(() => {
            next(widthPorcentage,"%")
        }, 3000);
    })
}

const start=()=>{
    let sliderSectionEnd = brandsSliderContainer.children[brandsSliderContainer.children.length-1];
    brandsSliderContainer.insertAdjacentElement("afterbegin", sliderSectionEnd);
}
const next=(width,type)=>{
    let sliderSectionFirst = brandsSliderContainer.children[0];
    brandsSliderContainer.style.marginLeft = `-${width*2}${type}`;
    brandsSliderContainer.style.transition = "margin-left 1s";
    setTimeout(() => {
        brandsSliderContainer.style.transition = "none";
        brandsSliderContainer.insertAdjacentElement("beforeend", sliderSectionFirst)
        brandsSliderContainer.style.marginLeft = `-${width}${type}`
    }, 1000);
    
}
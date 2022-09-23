'use strict'

import {brands} from './img-slider.js';
const brandsSliderContainer=document.getElementById('brands-slider')

export default brands.forEach((b,i)=>{
        let divContent=document.createElement('div');
        let imgChild=document.createElement('img');
   
        imgChild.setAttribute('src',`${b.brand}`)
        divContent.appendChild(imgChild);
        brandsSliderContainer.appendChild(divContent)
    })


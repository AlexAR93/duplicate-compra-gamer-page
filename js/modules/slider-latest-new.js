import { latestNews } from './img-slider.js';
import sliderLNFunction from './slider-ln-function.js';

const divContainer=document.querySelector('.latest-new-products__slider');
const btnBack=document.getElementById('back');
const btnNext=document.getElementById('next');

export default function sliderLatestNew(){
    latestNews.forEach((products,i) => {


        
        let divContent=document.createElement('article');
        let img=document.createElement('img');
        let tittle=document.createElement('h2');
        let p=document.createElement('p');




        divContent.setAttribute('id',`latest-new${i}`);
        tittle.innerHTML=products.product;
    
        img.setAttribute('src',products.url)
        img.setAttribute('alt',products.alt);
     
        p.innerHTML=products.price;

        divContent.appendChild(img);
        divContent.appendChild(tittle);
        divContent.appendChild(p);
 

        divContainer.appendChild(divContent)

        console.log(divContent,innerWidth)

        sliderLNFunction(i,divContainer,btnBack,btnNext)


    });

}
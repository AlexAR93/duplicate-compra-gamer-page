import { latestNews } from './img-slider.js';


const divContainer=document.getElementById('latest-new-products__slider');


export default function sliderLatestNew(){
    latestNews.forEach((products,i) => {


        let divContent=document.createElement('div');
        let article=document.createElement('article');
        let img=document.createElement('img');
        let tittle=document.createElement('h2');
        let p=document.createElement('p');




        article.setAttribute('id',`latest-new${i}`);
        tittle.innerHTML=products.product;
    
        img.setAttribute('src',products.url);
        img.setAttribute('alt',products.alt);
     
        p.innerHTML=products.price;

        article.appendChild(img);
        article.appendChild(tittle);
        article.appendChild(p);
        divContent.appendChild(article)
        divContent.classList.add('swiper-slide')
        divContainer.appendChild(divContent)
        





    });

}
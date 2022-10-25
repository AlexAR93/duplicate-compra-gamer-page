
const divContainer=document.getElementById('latest-new-products__slider');

export default function sliderLatestNew(latestNews){
    latestNews.forEach((products,i) => {
        const divContent=document.createElement('div');
        const article=document.createElement('article');
        const img=document.createElement('img');
        const tittle=document.createElement('h2');
        const p=document.createElement('p');

        // ! Que solo se muestren los ultimos 9 productos y con la propiedad row-reverse de flex-box css, se mostraran primero los ultimos
        products.id>=latestNews.length-9&&(
        article.setAttribute('id',`product${i}`),
        tittle.innerHTML=products.product,
    
        img.setAttribute('src',products.url),
        img.setAttribute('alt',products.alt),
     
        p.innerHTML=`$${products.price}`,

        article.appendChild(img),
        article.appendChild(tittle),
        article.appendChild(p),
        divContent.appendChild(article),
        divContent.classList.add('swiper-slide'),
        divContainer.appendChild(divContent)  
    )
    });
}
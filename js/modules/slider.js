'use strict'
const slickDots=document.getElementById('slick-dots');

const divContainer=document.getElementById('slider__container')
export default function slider(images){
    images.forEach((image,index) => {
        const div=document.createElement('div');
        const img=document.createElement('img');

        div.classList.add('slider__img');
        div.setAttribute('value',`${index}`);
        let size=window.innerWidth;
        let num;

        if(size<=690){
            num=0;
        }else if(size<=1200){
            num=1;
        }else{
            num=2;
        }

        img.setAttribute('src',image.url[num]);

        window.addEventListener('resize',()=>{
            size=window.innerWidth;
            if(size<=690){
                num=0;
            }else if(size<=1200){
                num=1;
            }else{
                num=2;
            }
            img.setAttribute('src',image.url[num]);
        })
        
        img.setAttribute('alt',image.alt);
        div.appendChild(img);
        divContainer.appendChild(div);
        // slickDots
        let li=document.createElement('a');
        slickDots.appendChild(li)
  
        const btn=document.createElement('button');

        li.appendChild(btn);
        btn.setAttribute('value',`${index}`);
    })
}

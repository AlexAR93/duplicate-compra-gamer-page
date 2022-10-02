import images from './data.js';
let slickDots=document.getElementById('slick-dots');

const divContainer=document.getElementById('slider__container')
export default images.forEach((image,index) => {
        let div=document.createElement('div')
        let img=document.createElement('img')

        div.classList.add('slider__img')
        div.setAttribute('id',`${index}`)
        let size=window.innerWidth;
        let num;


        if(size<=690){
            num=0;
        }else if(size<=1200){
            num=1;
        }else{
            num=2;
        }

        img.setAttribute('src',image.url[num])

        window.addEventListener('resize',()=>{
            size=window.innerWidth;
            if(size<=690){
                num=0;
            }else if(size<=1200){
                num=1;
            }else{
                num=2;
            }
            img.setAttribute('src',image.url[num])
        })
        
        img.setAttribute('alt',image.alt)
        div.appendChild(img)
        divContainer.appendChild(div)


        // slickDots
        let li=document.createElement('a');
        slickDots.appendChild(li)
  
        let btn=document.createElement('button');

        li.appendChild(btn)
        btn.setAttribute('value',`${index}`)
        

    })

import { latestNews } from './img-slider.js';
export default function sliderLNFunction(i,divContainer,btnBack,btnNext){
    
    let cont=0;


    btnNext.addEventListener('click',()=>{
        cont<i?cont++:cont=0;

        let operacion=cont*-81;
        divContainer.style.transform=`translateX(${operacion}%)`

        

    })
    btnBack.addEventListener('click',()=>{
        cont<=0?cont=0:cont=cont-1
        let operacion=cont*-81;

        divContainer.style.transform=`translateX(${operacion}%)`
      
    })


    // btnNext.addEventListener('click',()=>{
    //     cont<i?cont++:cont=0;

        
     

    //     btnNext.setAttribute('href',`#latest-new${cont}`)
    //     console.log(cont)

    // })
    // btnBack.addEventListener('click',()=>{
    //     cont<=0?cont=0:cont--
    //     btnBack.setAttribute('href',`#latest-new${cont}`)


    // })
}
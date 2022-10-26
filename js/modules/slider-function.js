import SliderInterval from "./SliderInterval.js";
const divContainer=document.getElementById('slider__container')

export default function sliderFunction(){
//*Seleccionar todos los botones creados del DOM
    const button=document.querySelectorAll('#slick-dots > a > button')
//*Clase del intervalo del slider automatico para reutilizar luego
    const intervalo=new SliderInterval(divContainer,button);
//*Asignando estilo css btnActive al primer elemento 
    button[0].classList.add('btnActive');
    //!Empezar Slider
    const transitionWidth=-100
    const indexMargin=0;
    const type='%'
    intervalo.initInterval(transitionWidth,indexMargin,type,5000);

//*ForEach para controlar cada boton
    button.forEach((b,index)=>{
        //!Ir a imagen de X posición al hacer click en su determinado boton, dando un STOP al slider
        b.addEventListener('click',e=>btnClickEvent(e,index,button,intervalo,transitionWidth,indexMargin,type))
    })
}

const btnClickEvent=(e,index,button,intervalo,transitionWidth,indexMargin,type)=>{
    indexMargin=index               
    
    const newPosition=transitionWidth*indexMargin
    //*Detener el slider automatico
    intervalo.stopInterval()
    
    divContainer.style.transform=`translateX(${newPosition}${type})`;

    //*Remover el estilo css btn Active de todo los botones
    button.forEach((b,index)=>{
        button[index].classList.remove('btnActive')
    })

    //*Añadir el estilo btnActive solo al boton con X index
    button[index].classList.add('btnActive')

    intervalo.initInterval(transitionWidth,indexMargin,type,5000)
}


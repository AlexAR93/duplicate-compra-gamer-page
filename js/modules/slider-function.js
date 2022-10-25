import SliderInterval from "./SliderInterval.js";
const divContainer=document.getElementById('slider__container')

export default function sliderFunction(){
//*Seleccionar todos los botones creados del DOM
    const button=document.querySelectorAll('#slick-dots > a > button')
//*Clase del intervalo del slider automatico para reutilizar luego
    const intervalo=new SliderInterval(button,divContainer);
//*Asignando estilo css btnActive al primer elemento 
    button[0].classList.add('btnActive');
    //!Empezar Slider
    intervalo.initInterval();

//*ForEach para controlar cada boton
    button.forEach((b,index)=>{
        //!Ir a imagen de X posición al hacer click en su determinado boton, dando un STOP al slider
        b.addEventListener('click',()=>{
                        
            //*Detener el slider automatico
            intervalo.stopInterval()
            
            divContainer.style.transform=`translateX(-${index}00%)`;

            //*Remover el estilo css btn Active de todo los botones
            button.forEach((b,index)=>{
                button[index].classList.remove('btnActive')
            })

            //*Añadir el estilo btnActive solo al boton con X index
            button[index].classList.add('btnActive')

            intervalo.initInterval(index)
        })
    })
}



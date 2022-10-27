'use strict'
export default class SliderInterval{
    constructor(divContent,button){
        this.button=button,
        this.interval,
        this.divContent=divContent
    }
    initInterval(position,index,type,time){
        this.interval=setInterval(() => {
            this.divContent.style.transition='all 1s';

            index<this.divContent.children.length-1?index++:index=0;

            this.divContent.style.transform=`translateX(${position*index}${type})`;
            index==0&&(this.divContent.style.transition='none')

            if(!this.button){
                return
            }else{
                index==parseFloat(this.button[index].value)&&this.button[index].classList.add('btnActive')
            this.button.forEach((b,index)=>{
                this.button[index].classList.remove('btnActive')
            })
            
            index==parseFloat(this.button[index].value)&&this.button[index].classList.add('btnActive')
            }
        }, time);
    }
    stopInterval(){
        clearInterval(this.interval)
    }
}
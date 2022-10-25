export default class SliderInterval{
    constructor(button,divContent){
        this.position=0,
        this.button=button,
        this.interval,
        this.divContent=divContent
    }
    initInterval(position=this.position){
        this.interval=setInterval(() => {
            this.divContent.style.transition='all 1s';

            position<this.button.length-1?position++:position=0;

            this.divContent.style.transform=`translateX(-${position}00%)`;

            position==0&&(this.divContent.style.transition='none')

            position==parseFloat(this.button[position].value)&&this.button[position].classList.add('btnActive')
            this.button.forEach((b,index)=>{
                this.button[index].classList.remove('btnActive')
            })
            
            position==parseFloat(this.button[position].value)&&this.button[position].classList.add('btnActive')
        }, 5000);
    }
    stopInterval(){
        clearInterval(this.interval)
    }
}
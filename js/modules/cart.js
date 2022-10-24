'use strict'
const counterInfo=document.getElementById('counter')
const btnCart=document.getElementById('cart-btn');
const btnClose=document.getElementById('cart-open');
const cartStyle=document.getElementById('cart-style');
const cartContainer=document.getElementById('cart-container');
const inLocalStorage=JSON.parse(localStorage.getItem('products'));
const divTotalPrice=document.querySelector('#cart-total-price > p')
class Cart{
    constructor() {
        this.object;
        this.productsInLocal=!inLocalStorage?[]:[...JSON.parse(localStorage.getItem('products'))];
        this.totalPrice;
    }   
    save(){
        localStorage.setItem('products',JSON.stringify(this.productsInLocal))
        return this.productsInLocal
    }
    toShowCart(cartStyle){

        return cartStyle.classList.remove('hide-cart')

    }
    toHideCart(cartStyle){
        return cartStyle.classList.add('hide-cart')
    }
    addToCart(btnValue,object,message){
        this.productsInLocal.push(structuredClone(object.find(p=>p.id==btnValue)))
        this.productsInLocal.find(p=>p.id==btnValue&&(p.quantity=1,p.lot=p.lot-1))
        buyAlert(message)
        return this.productsInLocal
    }
    toReloadProducts(productsInCart,cartContainer){
        cartContainer.innerHTML='';
        productsInCart.forEach((product)=>{
            const div=document.createElement('div')
            div.innerHTML=`       
                <img src="${product.url}" alt="${product.alt}">
                <h2>${product.product}</h2>
                <button class="btn-subtraction" value="${product.id}">-</button>
                <p class='quantity' id='quantity${product.id}'>${product.quantity}</p>
                <button class="btn-sum" value="${product.id}">+</button>
                <button class="btn-delete" value="${product.id}">Eliminar</button>
            ` 
            div.setAttribute('id',`product${product.id}`)
            cartContainer.appendChild(div)
        })
    }
    toDeleteCart(btnValue,cartCard,message){
        this.productsInLocal.splice(parseInt(this.productsInLocal.findIndex(p=>p.id==btnValue)),1)
        cartCard.parentElement.removeChild(cartCard)
        buyAlert(message)
    
    }
    toSubtractCounter(btnValue,message){
        const lot=this.productsInLocal.find(p=>p.id==btnValue);
        lot.quantity>1&&(
        this.productsInLocal.find(p=>p.id==btnValue&&(p.quantity-=1,p.lot=p.lot+1)),
        buyAlert(message)
        )

    }
    toAddCounter(btnValue,message,messageTwo){
        const lot=this.productsInLocal.find(p=>p.id==btnValue);
        lot.lot>0?(
        this.productsInLocal.find(p=>p.id==btnValue&&(p.quantity+=1,p.lot=p.lot-1)),
        buyAlert(message)
        ):buyAlert(messageTwo)
   
    }
    toReloadCounterProduct(cardCounter,btnValue){
        cardCounter.innerHTML=this.productsInLocal.find(p=>p.id==btnValue).quantity;
    }
    cartCounter(domP){
        domP.innerHTML=this.productsInLocal.length;
    }
    toSumPrice(){
        const price=this.productsInLocal.map(p=>p.price*p.quantity)
        this.totalPrice=price.reduce((a,b)=>a+ b,0);
        return this.totalPrice
    }
}

const cartClass=new Cart()

const cart=(products=inLocalStorage)=>{
        let cardButtons=document.querySelectorAll('.btn-add');

        cartClass.toReloadProducts(cartClass.save(),cartContainer)
        cartClass.cartCounter(counterInfo)
        totalCartPrice()
        cardButtons.forEach(btn=>{
            btn.addEventListener('click',e=>clickEventSumCard(e,products))
        })
        sumAndSubtractProduct()
        openCloseCart()
        deleteProduct()
}

const clickEventSumCard=(e,products)=>{
    const messageOne=`${e.target.parentNode.children.item(1).innerHTML}
    <span style="color: red;">Agregado al carrito!</span>`;
    const messageTwo=`<span style="color: red;">Otro:
    </span>${e.target.parentNode.children.item(1).innerHTML}
    <span style="color: red;">Agregado!</span>`;
    const messageStockLimit=`<span style="color: red;">Sin stock!!!`;

        const btnValue=parseInt(e.target.value);

        const cartCard=document.getElementById(`quantity${btnValue}`);
        
        !JSON.parse(localStorage.getItem('products')).some(p=>p.id==btnValue)?
        (
        cartClass.addToCart(btnValue,products,messageOne)
        )
        :(cartClass.toAddCounter(btnValue,messageTwo,messageStockLimit),
        cartClass.toReloadCounterProduct(cartCard,btnValue)
        )
        cartClass.toReloadProducts(cartClass.save(),cartContainer)
        sumAndSubtractProduct()  
        cartClass.cartCounter(counterInfo)
        deleteProduct()
        cartClass.save()
        totalCartPrice()  
    }

const openCloseCart=()=>{
    btnCart.addEventListener('click',()=>{
        cartClass.toShowCart(cartStyle)

    })
    btnClose.addEventListener('click',()=>{
        cartClass.toHideCart(cartStyle)
    })
}

const sumAndSubtractProduct=()=>{
    //! subtract and sum
    const sumBtn=document.querySelectorAll('.btn-sum');
    const subtractBtn=document.querySelectorAll('.btn-subtraction'); 

    subtractBtn.forEach(btn=>{

        btn.addEventListener('click',subtractClickEvent)
    })
    sumBtn.forEach(btn=>{

        btn.addEventListener('click',sumClickEvent)
    })
}

const subtractClickEvent=(e)=>{
    const btnValue=parseInt(e.target.value);
    const message=`<span style="color: red;">Quitaste un:
    </span>${e.target.parentNode.children.item(1).innerHTML}`;
    const cartCard=document.getElementById(`quantity${btnValue}`)
    cartClass.toSubtractCounter(btnValue,message)

    cartClass.toReloadCounterProduct(cartCard,btnValue)
    cartClass.save()
    totalCartPrice()
}

const sumClickEvent=(e)=>{
    const btnValue=parseInt(e.target.value);
    const message=`<span style="color: red;">Otro:
    </span>${e.target.parentNode.children.item(1).innerHTML}
    <span style="color: red;">Agregado!</span>`;
    const messageTwo=`<span style="color: red;">Sin stock!!!:
    </span>`;
    const cartCard=document.getElementById(`quantity${btnValue}`)
    cartClass.toAddCounter(btnValue,message,messageTwo)

    cartClass.toReloadCounterProduct(cartCard,btnValue)
    cartClass.save()
    totalCartPrice()
}

const deleteProduct=()=>{
    const btnDelete=document.querySelectorAll('.btn-delete');
    btnDelete.forEach((btn)=>{
    btn.addEventListener('click',deleteClickEvent)
    })
}

const deleteClickEvent=(e)=>{  
    const btnValue=parseInt(e.target.value)
    let message=`<span style="color: red;">Eliminaste:
        </span>${e.target.parentNode.children.item(1).innerHTML}
        <span style="color: red;">de tu carrito</span>`;
    const cartCard=document.getElementById(`product${btnValue}`)

    cartClass.toDeleteCart(btnValue,cartCard,message)
    cartClass.cartCounter(counterInfo)
    cartClass.save()
    totalCartPrice()
}

const totalCartPrice=()=>{
    divTotalPrice.innerHTML=cartClass.toSumPrice()
}

const buyAlert=(message)=>{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
    
      Toast.fire({
        icon: 'success',
        title: `${message}`
      })
}

export{
    cart
}
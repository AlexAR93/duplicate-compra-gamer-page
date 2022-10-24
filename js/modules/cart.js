
// ! AQUIII

// let productsInLocal=JSON.parse(localStorage.getItem('products'));
let counterInfo=document.getElementById('counter')
let btnCart=document.getElementById('cart-btn');
let btnClose=document.getElementById('cart-open');
let cartStyle=document.getElementById('cart-style');
let cartContainer=document.getElementById('cart-container');
let inLocalStorage=JSON.parse(localStorage.getItem('products'));
let divTotalPrice=document.querySelector('#cart-total-price > p')
class Cart{
    constructor() {
        this.object;
        this.productsInLocal=!inLocalStorage?[]:[...JSON.parse(localStorage.getItem('products'))];
        this.totalPrice=0;
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
            let div=document.createElement('div')
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
    toDeleteCart(btnValue,cartCard){
        this.productsInLocal.splice(parseInt(this.productsInLocal.findIndex(p=>p.id==btnValue)),1)
        cartCard.parentElement.removeChild(cartCard)
        return this.productsInLocal
    }
    toSubtractCounter(btnValue){
        let lot=this.productsInLocal.find(p=>p.id==btnValue);
        lot.quantity>1&&
        this.productsInLocal.find(p=>p.id==btnValue&&(p.quantity-=1,p.lot=p.lot+1))
        return this.productsInLocal
    }
    toAddCounter(btnValue,message){
        let lot=this.productsInLocal.find(p=>p.id==btnValue);
        lot.lot>0?(
        this.productsInLocal.find(p=>p.id==btnValue&&(p.quantity+=1,p.lot=p.lot-1)),
        buyAlert(message)
        ):alert('Sin stock!!!')
        return this.productsInLocal
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
            btn.addEventListener('click',()=>{
            
            let messageOne=`${btn.parentNode.children.item(1).innerHTML}
            <span style="color: red;">Agregado al carrito!</span>`;
            let messageTwo=`<span style="color: red;">Otro:
            </span>${btn.parentNode.children.item(1).innerHTML}
            <span style="color: red;">Agregado!</span>`;

                const btnValue=parseInt(btn.getAttribute("value"));

                let cartCard=document.getElementById(`quantity${btnValue}`);

                
                !JSON.parse(localStorage.getItem('products')).some(p=>p.id==btnValue)?
                (
                cartClass.addToCart(btnValue,products,messageOne)
                )
                :(cartClass.toAddCounter(btnValue,messageTwo),
                cartClass.toReloadCounterProduct(cartCard,btnValue)
                )
                cartClass.toReloadProducts(cartClass.save(),cartContainer)
                sumAndSubtractProduct(cartClass)  
                cartClass.cartCounter(counterInfo)
                deleteProduct(cartClass)
                cartClass.save()
                totalCartPrice()
                
            })
        })
        sumAndSubtractProduct(cartClass)
        openCloseCart(cartClass)
        deleteProduct(cartClass)
}

let openCloseCart=(cartClass)=>{
    btnCart.addEventListener('click',()=>{
        cartClass.toShowCart(cartStyle)

    })
    btnClose.addEventListener('click',()=>{
        cartClass.toHideCart(cartStyle)
    })
}

let sumAndSubtractProduct=()=>{
    //! subtract and sum
    let sumBtn=document.querySelectorAll('.btn-sum');
    let subtractBtn=document.querySelectorAll('.btn-subtraction'); 
    subtractBtn.forEach(btn=>{

        btn.addEventListener('click',()=>{
            let btnValue=parseInt(btn.getAttribute("value"));
            let cartCard=document.getElementById(`quantity${btnValue}`)
            cartClass.toSubtractCounter(btnValue)

            cartClass.toReloadCounterProduct(cartCard,btnValue)
            cartClass.save()
            totalCartPrice()
        })
    })
    sumBtn.forEach(btn=>{

        btn.addEventListener('click',()=>{
            let btnValue=parseInt(btn.getAttribute("value"));
            let cartCard=document.getElementById(`quantity${btnValue}`)
            cartClass.toAddCounter(btnValue)

            cartClass.toReloadCounterProduct(cartCard,btnValue)
            cartClass.save()
            totalCartPrice()
        })
    })
}

const deleteProduct=(cartClass)=>{
    const btnDelete=document.querySelectorAll('.btn-delete');
    btnDelete.forEach((btn)=>{
    btn.addEventListener('click',()=>{  
        const btnValue=parseInt(btn.getAttribute('value'))
        const cartCard=document.getElementById(`product${btnValue}`)


        cartClass.toDeleteCart(btnValue,cartCard)
        cartClass.cartCounter(counterInfo)
        cartClass.save()
        totalCartPrice()
    })
    })
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
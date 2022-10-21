
let productsInLocal=JSON.parse(localStorage.getItem('products'));

let cart=(products=productsInLocal)=>{
    let newArray=[];
    productsInLocal&&(newArray=[...productsInLocal])
    // localStoragee&&deleteProduct(localStoragee)
    localStorage.setItem('products',JSON.stringify(newArray))
    openCloseCart()
  
    cartProductDom(newArray)
    addToCart(products,newArray);

}

let openCloseCart=()=>{
    let btnCart=document.getElementById('cart-btn');
    let btnClose=document.getElementById('cart-open');
    let cartStyle=document.getElementById('cart-style');
    btnCart.addEventListener('click',()=>{
        cartStyle.classList.remove('hide-cart')

    })
    btnClose.addEventListener('click',()=>{
        cartStyle.classList.add('hide-cart')
    })
}
//!ACAAA 2
let addToCart=(products,newArray)=>{
    let cardButtons=document.querySelectorAll('.products__product>article>button');
    let cardCunter=document.getElementById('counter-cart');
    let p=document.createElement('p');
    deleteProduct(newArray,cartCounter,cardCunter,p)
    sumAndSubtractProducts(newArray)
    cartCounter(newArray,cardCunter,p)
    cardButtons.forEach(btn=>{
        btn.addEventListener('click',()=>{
            let btnAdd=document.getElementById(`${btn.id}`).parentElement;
            let be=newArray.some(p=>p.id==btn.id);

            let messageOne=`${btnAdd.children.item(1).innerHTML}
            <span style="color: red;">Agregado al carrito!</span>`;
            let messageTwo=`<span style="color: red;">Otro:
            </span>${btnAdd.children.item(1).innerHTML}
            <span style="color: red;">Agregado!</span>`;

            products=products.map(p=>p={...p,quantity:1})
            
            if(be==true){
                newArray=[...JSON.parse(localStorage.getItem('products'))]
                let lot=newArray.find(p=>p.id==btn.id);

                lot.lot>0?(newArray.find(p=>p.id==btn.id&&(p.lot=p.lot-1)),
                newArray.find(p=>p.id==btn.id&&(p.quantity=p.quantity+1)),
                
                localStorage.setItem(`products`,JSON.stringify(newArray)),
                cartProductDom(newArray),
                sumAndSubtractProducts(newArray),
                deleteProduct(newArray,cartCounter,cardCunter,p),
                buyAlert(messageTwo)):alert('Sin stock!!')
                return
            }

            JSON.parse(localStorage.getItem('products'))&&(newArray=[...JSON.parse(localStorage.getItem('products')),products.find(p=>p.id==btn.id)]);
            newArray.find(p=>p.id==btn.id&&(p=p.lot=p.lot-1));
            cartCounter(newArray,cardCunter,p)
       
            cartProductDom(newArray)
  
            deleteProduct(newArray,cartCounter,cardCunter,p)
            localStorage.setItem(`products`,JSON.stringify(newArray));
            sumAndSubtractProducts(newArray)
            buyAlert(messageOne)

        })
})
}

let cartProductDom=(newArray)=>{
    let cardContainer=document.getElementById('cart-container');
    cardContainer.innerHTML='';
    newArray.forEach((product)=>{
        let div=document.createElement('div')
        div.innerHTML=`
            
            <img src="${product.url}" alt="${product.alt}">
            <h2>${product.product}</h2>
            <button class="btn-subtraction" value="${product.id}">-</button>
            <p class='quantity' id='quantity${product.id}'>${product.quantity}</p>
            <button class="btn-sum" value="${product.id}">+</button>
            <button class="btn-delete" id="${product.id}">Eliminar</button>
        ` 
        div.setAttribute('id',`product${product.id}`)
        cardContainer.appendChild(div)
    })

}

let deleteProduct=(newArray,cartCounter,cardCunter,p)=>{
    let btnDelete=document.querySelectorAll('.btn-delete')
    btnDelete.forEach((btn)=>{
        btn.addEventListener('click',()=>{  
            let productContainer=document.getElementById(`product${btn.id}`)
            let cartContainer=document.querySelectorAll('.cart-container>div')
            let cartContainerArray=Array.from(cartContainer)
            let productIndex=cartContainerArray.findIndex(p=>p.id==productContainer.id);
            newArray.splice(productIndex,1)
            productContainer.parentElement.removeChild(productContainer)
            localStorage.setItem('products',JSON.stringify(newArray))

            cartCounter(newArray,cardCunter,p)
        })
    })
}

let cartCounter=(newArray,cardCunter,p)=>{
    let counter=newArray.length;
    p.innerHTML=counter;
    cardCunter.appendChild(p)
}

let buyAlert=(message)=>{
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

let sumAndSubtractProducts=(newArray)=>{
    let sumBtn=document.querySelectorAll('.btn-sum');
    let subtractBtn=document.querySelectorAll('.btn-subtraction');
    sumProductFunction(sumBtn,newArray)
    subtractProductFunction(subtractBtn,newArray)
}
//! ACA x2 
const sumProductFunction=(sumBtn,newArray)=>{
    sumBtn.forEach(btn=>{
        btn.addEventListener('click',()=>{
            // aca
            let lot=newArray.find(p=>p.id==parseInt(btn.getAttribute("value")));

            let productContainer=document.getElementById(`product${parseInt(btn.getAttribute("value"))}`)
            let cartContainer=document.querySelectorAll('.cart-container>div')
            let cartContainerArray=Array.from(cartContainer)
            let productIndex=cartContainerArray.findIndex(p=>p.id==productContainer.id);
            
            let btnFather=document.getElementById(`quantity${parseInt(btn.getAttribute("value"))}`);
            lot.lot>0?(
            newArray.find(p=>p.id==parseInt(btn.getAttribute("value"))&&(p.lot=p.lot-1)),
            newArray.find(p=>p.id==parseInt(btn.getAttribute("value"))&&(p.quantity=p.quantity+1)),
            localStorage.setItem('products',JSON.stringify(newArray))):alert('Sin stock!!')
 
         
            btnFather.innerHTML=newArray[productIndex].quantity;
            
        })
    }
    )
}
let subtractProductFunction=(subtractBtn,newArray)=>{
    subtractBtn.forEach(btn=>{
        btn.addEventListener('click',()=>{
        // aca
        let lot=newArray.find(p=>p.id==parseInt(btn.getAttribute("value")));

        let productContainer=document.getElementById(`product${parseInt(btn.getAttribute("value"))}`)
        let cartContainer=document.querySelectorAll('.cart-container>div')
        let cartContainerArray=Array.from(cartContainer)
        let productIndex=cartContainerArray.findIndex(p=>p.id==productContainer.id);
      
            let btnFather=document.getElementById(`quantity${parseInt(btn.getAttribute("value"))}`);
            lot.lot<9?(
            newArray.find(p=>p.id==parseInt(btn.getAttribute("value"))&&(p.lot=p.lot+1)),
            newArray.find(p=>p.id==parseInt(btn.getAttribute("value"))&&(p.quantity=p.quantity-1)),
            localStorage.setItem('products',JSON.stringify(newArray))):false
 

            btnFather.innerHTML=newArray[productIndex].quantity;

        })
    }
    )
}

export{
    cart
}
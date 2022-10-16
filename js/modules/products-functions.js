//Crear elemento Tag para cuando utilice el filtro
let tagContainer=document.createElement('div');
let tag=document.createElement('p');
tagContainer.appendChild(tag);
tagContainer.classList.add('products__tag');


//!Agrupar funciones
let groupFunctions=(products)=>{
    products()
    .then(products=>{
        let productsContainer=document.getElementById('products');
        let btns=document.querySelectorAll('.btn');   
        let selectOption=document.querySelectorAll('.select-option');

        
        //!Crear cards para cada productos
        productFunction(productsContainer,products);
        
        //!Filtrar cards/productos por categoria
        btnFilter(btns,products,productsContainer,selectOption);
       
    })
    .catch(error=>console.log(error))
}

let productFunction=(productsContainer,products)=>{
    //Que se muestre el tag solo cuando utilice el filtro
    tag.innerHTML.length>=1&&productsContainer.appendChild(tagContainer)

    products.forEach((product)=>{
        let divContent=document.createElement('div');
        divContent.innerHTML=`
        <article id="${product.alt}">
            <img src="${product.url}" alt="${product.alt}">
            <h2>${product.product}</h2>
            <p>$${product.price}</p>
            <button id="${product.id}">Sumar al carrito</button>
        </article>
        `
        divContent.classList.add('products__product')

        productsContainer.appendChild(divContent)   
    })
    cart(products)
}


let btnFilter=(btns,products,productsContainer,selectOption)=>{
    let btnCategoriesOpen=document.getElementById('categories');
    let btnCategoriesClose=document.getElementById('tittle-options-close');
    let btnOptions=document.getElementById('options');

    //!ocultar y mostrar las opciones de categorias
    btnCategoriesFunction(btnCategoriesOpen,btnCategoriesClose,btnOptions)
    btns.forEach((btn)=>{
        btn.addEventListener('click',()=>{
            productsContainer.innerHTML='';
            //Agregar texto a tag, el mismo que la categoria
            tag.innerHTML=btn.innerHTML;
            let spanTag=document.createElement('span');
            spanTag.innerHTML='x'
            tag.appendChild(spanTag)
            productFunction(productsContainer,products.filter((p)=>p.category==btn.innerHTML))
            selectOptionsFilter(selectOption,productsContainer,products.filter((p)=>p.category==btn.innerHTML))
        })
        //!limpiar categoria
        clearFilter(productsContainer,products,selectOption)
    })
        //Filtro por precio
    //!Funcion del select filter para ordenar por precio
    selectOptionsFilter(selectOption,productsContainer,products)
    selectOptionsHide()
}

//! Abrir-cerrar
let btnCategoriesFunction=(btnCategories,btnCategoriesClose,btnOptions)=>{
    btnCategories.addEventListener('click',()=>{
        btnOptions.classList.remove('options-hide');
    })
    btnCategoriesClose.addEventListener('click',()=>{
        btnOptions.classList.add('options-hide')
    })
}


//!Limpiar filtro por tag
let clearFilter=(productsContainer,products,selectOption)=>{
    tag.addEventListener('click',()=>{
        tag.innerHTML='';
        productsContainer.innerHTML='';
        productFunction(productsContainer,products);
        selectOptionsFilter(selectOption,productsContainer,products);
    })
}

/*---------------------------Filter by price---------------------------*/

let selectOptionsFilter=(selectOption,productsContainer,products)=>{
    selectOption.forEach((option)=>{
     
        option.addEventListener('click',()=>{
            products.sort(function(a,b){
                
                if(a.price==b.price){
                    return 0
                }
                
                if(option.value==0){
                    if(a.id<b.id){
                        return -1
                    }
                }else if(option.value==1){
                    if(a.price>b.price){
                        return -1
                    }
                }else if(option.value==-1){
                    if(a.price<b.price){
                        return -1
                    }
                }else if(option.value==2){
                    if(a.product.toLowerCase()<b.product.toLowerCase()){
                        return -1
                    }
                    
                }else if(option.value==-2){
                    if(a.product.toLowerCase()>b.product.toLowerCase()){
                        return -1
                    }
                }
                return 1
            });
            //Vaciar el div
            productsContainer.innerHTML='';
       
            productFunction(productsContainer,products)
        })
    })
}

let selectOptionsHide=()=>{
    let select=document.getElementById('select');
    let selectOptions=document.getElementById('select-options');
    select.addEventListener('click',()=>{
        selectOptions.classList.toggle('select-options-hide')
    })
}


let cart=(products)=>{
    let cardButtons=document.querySelectorAll('.products__product>article>button');

    let localStoragee=JSON.parse(localStorage.getItem('products'));

    let newArray=[];
    localStoragee&&(newArray=[...localStoragee])
    // localStoragee&&deleteProduct(localStoragee)
    localStorage.setItem('products',JSON.stringify(newArray))
    openCloseCart()
  
    addToCart(cardButtons,products,newArray);

    cartProductDom(newArray)
    deleteProduct(newArray)
   
  
}

let openCloseCart=()=>{
    let btnCart=document.getElementById('cart-btn');
    let btnClose=document.getElementById('cart-open');
    let cartStyle=document.getElementById('cart-style');
    btnCart.addEventListener('click',()=>{
        cartStyle.classList.remove('hide-cart')
        console.log('hola')
    })
    btnClose.addEventListener('click',()=>{
        cartStyle.classList.add('hide-cart')
    })
}

let addToCart=(cardButtons,products,newArray)=>{
    let cardCunter=document.getElementById('counter-cart');
    let p=document.createElement('p');
    cartCounter(newArray,cardCunter,p)
    cardButtons.forEach(btn=>{
        btn.addEventListener('click',()=>{
            let btnAdd=document.getElementById(`${btn.id}`).parentElement;
            let be=newArray.some(p=>p.id==btn.id);

            products=products.map(p=>p={...p,quantity:1})

            if(be==true){
                let lot=newArray.find(p=>p.id==btn.id);
                console.log(lot.lot)
                lot.lot>0?(newArray.find(p=>p.id==btn.id&&(p.lot=p.lot-1)),
                newArray.find(p=>p.id==btn.id&&(p.quantity=p.quantity+1)),
                
                localStorage.setItem(`products`,JSON.stringify(newArray)),
                cartProductDom(newArray),
                deleteProduct(newArray,cartCounter,cardCunter,p)):alert('Sin stock!!')
                return
            }

            


            JSON.parse(localStorage.getItem('products'))&&(newArray=[...JSON.parse(localStorage.getItem('products')),products.find(p=>p.id==btn.id)]);
            newArray.find(p=>p.id==btn.id&&(p=p.lot=p.lot-1));
            cartCounter(newArray,cardCunter,p)
            
            cartProductDom(newArray)
            deleteProduct(newArray,cartCounter,cardCunter,p)
            localStorage.setItem(`products`,JSON.stringify(newArray))

   
            


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
                title: `${btnAdd.children.item(1).innerHTML}
                <span style="color: red;">Agregado al carrito!</span>`
              })

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
            <button class="btn-subtraction">-</button>
            <p class='quantity'>${product.quantity}</p>
            <button class="btn-sum">+</button>
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
    //!---
    let counter=newArray.length;
    p.innerHTML=counter;
    cardCunter.appendChild(p)
    //!---
}

export{
    groupFunctions
}




// const Toast = Swal.mixin({
//     toast: true,
//     position: 'top-end',
//     showConfirmButton: false,
//     timer: 2000,
//     timerProgressBar: true,
//     didOpen: (toast) => {
//       toast.addEventListener('mouseenter', Swal.stopTimer)
//       toast.addEventListener('mouseleave', Swal.resumeTimer)
//     }
//   })
  
//   Toast.fire({
//     icon: 'success',
//     title: `${btnAdd.children.item(1).innerHTML} 
//     <span style="color: red;">Agregado al carrito!</span>`
//   })
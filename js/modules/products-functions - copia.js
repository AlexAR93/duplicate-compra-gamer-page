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
        
        let btnCategoriesOpen=document.getElementById('categories');
        let btnCategoriesClose=document.getElementById('tittle-options-close');
        
        let btnOptions=document.getElementById('options');
        
        let select=document.getElementById('select');
        let selectOptions=document.getElementById('select-options');
        let selectOption=document.querySelectorAll('.select-option');

        let cardContainer=document.getElementById('cart-container')
        
        //!Crear cards para cada productos
        productFunction(productsContainer,products);
        
        //!Filtrar cards/productos por categoria
        btnFilter(btns,products,productsContainer,selectOption)
        
        //!limpiar categoria
        clearFilter(productsContainer,products,selectOption)

        //!ocultar y mostrar las opciones de categorias
        btnCategoriesFunction(btnCategoriesOpen,btnCategoriesClose,btnOptions)
        
        //Filtro por precio
        //!Mostrar menu del select(ordenar por precio)
        selectOptionsHide(select,selectOptions)
        //!Funcion del select filter para ordenar por precio
        selectOptionsFilter(selectOption,productsContainer,products)
        cart()
    })
    .catch(error=>alert(`No se han podido cargar los productos`))
}

let productFunction=(productsContainer,returnProducts)=>{

    //Que se muestre el tag solo cuando utilice el filtro
    tag.innerHTML.length>=1&&productsContainer.appendChild(tagContainer)

    returnProducts.forEach((product)=>{

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

}


let btnCategoriesFunction=(btnCategories,btnCategoriesClose,btnOptions)=>{
    btnCategories.addEventListener('click',()=>{
        btnOptions.classList.toggle('options-hide');
    })
    btnCategoriesClose.addEventListener('click',()=>{
        btnOptions.classList.toggle('options-hide')
    })
}

let btnFilter=(btns,products,productsContainer,selectOption)=>{

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

    })
}

//!Limpiar filtro por tag
let clearFilter=(productsContainer,products,selectOption)=>{
    tag.addEventListener('click',()=>{
        tag.innerHTML='';
        productsContainer.innerHTML='';
        productFunction(productsContainer,products);

        selectOptionsFilter(selectOption,productsContainer,products)
    })
}


let selectOptionsHide=(select,selectOptions)=>{

    select.addEventListener('click',()=>{
        selectOptions.classList.toggle('select-options-hide')
        
    })
}


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


let cart=()=>{
    let cardButtons=document.querySelectorAll('.products__product>article>button');
    addToCart(cardButtons)
}

let addToCart=(cardbuttons)=>{
    cardbuttons.forEach((btn)=>{

        btn.addEventListener('click',()=>{
            let btnAdd=document.getElementById(`${btn.id}`).parentElement;
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


// let addToCart=(products)=>{
//     let btn=document.querySelectorAll('.products__product>article>button');
//     let getLocalStorage=JSON.parse(localStorage.getItem('productsNow'))

//     let cardContainer=document.getElementById('cart-container')
//     let newArray=[];
//     getLocalStorage&&(newArray=[...getLocalStorage]);
//     btn.forEach((b)=>{
   
//         b.addEventListener('click',()=>{
//             let nameProduct=b.parentElement.querySelector('h2').innerHTML;
//             const Toast = Swal.mixin({
//                 toast: true,
//                 position: 'top-end',
//                 showConfirmButton: false,
//                 timer: 2000,
//                 timerProgressBar: true,
//                 didOpen: (toast) => {
//                   toast.addEventListener('mouseenter', Swal.stopTimer)
//                   toast.addEventListener('mouseleave', Swal.resumeTimer)
//                 }
//               })
              
//               Toast.fire({
//                 icon: 'success',
//                 title: `${nameProduct} 
//                 <span style="color: red;">Agregado al carrito!</span>`
//               })


//               newArray=[...newArray,products.find(p=>p.alt==b.parentElement.id)];
          
//               console.log(newArray)
//               localStorage.setItem('productsNow',JSON.stringify(newArray))

//               cart(cardContainer,newArray)
              
//         })

//     })
// }

// let cart=(cardContainer,cartProduct)=>{
//     cardContainer.innerHTML='';
//     cartProduct.forEach((product)=>{
//         let div=document.createElement('div')
//         div.innerHTML=`
//         <div>

//             <img src="${product.url}" alt="${product.alt}">
//             <h2>${product.product}</h2>
//             <button>-</button>
//             <p>${product.quantity}</p>
//             <button>+</button>
//             <button id="${product.id}">Eliminar</button>
//         </div>
//         `  
//         cardContainer.appendChild(div)

//     })
// }

// let openCart=()=>{
//     let btnCart=document.getElementById('cart-btn');
//     let btnClose=document.getElementById('cart-open');
//     let cartStyle=document.getElementById('cart-style');
//     btnCart.addEventListener('click',()=>{
//         cartStyle.classList.remove('hide-cart')
//         console.log('hola')
//     })
//     btnClose.addEventListener('click',()=>{
//         cartStyle.classList.add('hide-cart')
//     })
// }
//!Acaaaa 


export{
    groupFunctions
}


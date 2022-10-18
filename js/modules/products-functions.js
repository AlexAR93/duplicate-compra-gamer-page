//Crear elemento Tag para cuando utilice el filtro
let tagContainer=document.createElement('div');
let tag=document.createElement('p');
tagContainer.appendChild(tag);
tagContainer.classList.add('products__tag');


//!Agrupar funciones
let groupFunctions=(products,cart)=>{
    products()
    .then(products=>{
        let productsContainer=document.getElementById('products');
        let btns=document.querySelectorAll('.btn');   
        let selectOption=document.querySelectorAll('.select-option');

        
        //!Crear cards para cada productos
        productFunction(productsContainer,products,cart);
        
        //!Filtrar cards/productos por categoria
        btnFilter(btns,products,productsContainer,selectOption);
       
    })
    .catch(error=>console.log(error))
}

let productFunction=(productsContainer,products,cart)=>{
    //Que se muestre el tag solo cuando utilice el filtro
    tag.innerHTML.length>=1&&productsContainer.appendChild(tagContainer)

    products.forEach((product)=>{
        let divContent=document.createElement('div');
        divContent.innerHTML=`
        <article id="${product.alt}">
            <img src="${product.url}" alt="${product.alt}">
            <h2>${product.product}</h2>
            <p>$${product.price}</p>
            <button id="${product.id}" value="${product.id}">Sumar al carrito</button>
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
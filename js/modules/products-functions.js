//Crear elemento Tag para cuando utilice el filtro
let tagContainer=document.createElement('div');
let tag=document.createElement('p');
tagContainer.appendChild(tag);
tagContainer.classList.add('products__tag');


//!Crear cards para cada productos
let productFunction=(productsContainer,returnProducts)=>{

    //Que se muestre el tag solo cuando utilice el filtro
    tag.innerHTML.length>=1&&productsContainer.appendChild(tagContainer)

    returnProducts.forEach((product,i)=>{
    
        let divContent=document.createElement('div');
        let article=document.createElement('article');
        let img=document.createElement('img');
        let tittle=document.createElement('h2');
        let p=document.createElement('p');
        let buyBtn=document.createElement('button');

        article.setAttribute('id',`product${i}`);
        tittle.innerHTML=product.product;
        img.setAttribute('src',product.url);
        img.setAttribute('alt',product.alt);   
        p.innerHTML=product.price;
        buyBtn.innerHTML='Sumar al carrito';
        article.appendChild(img);
        article.appendChild(tittle);
        article.appendChild(p);
        article.appendChild(buyBtn);
        divContent.appendChild(article)
        divContent.classList.add('products__product')

        productsContainer.appendChild(divContent)     
 
    
    })
}


//!Limpiar filtro por tag
let clearFilter=(productsContainer,products)=>{
    tag.addEventListener('click',()=>{
        localStorage.setItem('productos',JSON.stringify(products))

        tag.innerHTML='';
        productsContainer.innerHTML='';
        let newArray=JSON.parse(localStorage.getItem('productos'));

        productFunction(productsContainer,newArray);
    })
}


//!Filtrar cards/productos por categoria

let btnFilter=(btns,products,productsContainer)=>{
    btns.forEach((btn)=>{
        btn.addEventListener('click',()=>{
            let newArray=JSON.parse(localStorage.getItem('productos'));
            let productsDos=products.filter((pd)=>pd.category==btn.innerHTML)
            localStorage.setItem('productos',JSON.stringify(productsDos))
            //Vaciar el div
            productsContainer.innerHTML='';

            //Agregar texto a tag, el mismo que la categoria
            tag.innerHTML=btn.innerHTML;
            let spanTag=document.createElement('span');
            spanTag.innerHTML='x'
            tag.appendChild(spanTag)


            productFunction(productsContainer,productsDos)
            console.log(productsDos,newArray,btn.innerHTML)
        })
        clearFilter(productsContainer,products)
    })
}

//!ocultar y mostrar las opciones de categorias

let btnCategoriesFunction=(btnCategories,btnCategoriesClose,btnOptions)=>{
    btnCategories.addEventListener('click',()=>{
        btnOptions.classList.toggle('options-hide');
    })
    btnCategoriesClose.addEventListener('click',()=>{
        btnOptions.classList.toggle('options-hide')
    })
}


//!Mostrar menu del select(ordenar por precio)
let selectOptionsHide=(select,selectOptions)=>{

    select.addEventListener('click',()=>{
        selectOptions.classList.toggle('select-options-hide')
        
    })
}

//!Funcion del select filter para ordenar por precio
let selectOptionsFilter=(selectOption,productsContainer)=>{
    selectOption.forEach((option)=>{
     
        option.addEventListener('click',()=>{
            
            let newArray=JSON.parse(localStorage.getItem('productos'));

            let newArrayNormal=[...newArray]
            let newArraySort=[...newArray.sort(function(a,b){

                if(option.value==1?a.price>b.price:a.price<b.price){
                    return -1
                }
            })];

            let productsDos=(option.value==1||option.value==-1)?newArraySort:newArrayNormal;
         

            localStorage.setItem('productos',JSON.stringify(newArrayNormal))

            //Vaciar el div
            productsContainer.innerHTML='';
       
            productFunction(productsContainer,productsDos)
        })
    })
}

export{
    productFunction,
    btnFilter,
    btnCategoriesFunction,
    clearFilter,
    selectOptionsHide,
    selectOptionsFilter
}
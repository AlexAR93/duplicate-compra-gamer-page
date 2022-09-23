//Crear elemento Tag para cuando utilice el filtro
let tagContainer=document.createElement('div');
let tag=document.createElement('p');
tagContainer.appendChild(tag);
tagContainer.classList.add('products__tag');

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

let btnFilter=(btns,products,productsContainer)=>{
    btns.forEach((btn)=>{
        btn.addEventListener('click',()=>{
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
        })
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

let clearFilter=(productsContainer,returnProducts)=>{
    tag.addEventListener('click',()=>{
        tag.innerHTML='';
        productsContainer.innerHTML='';
        productFunction(productsContainer,returnProducts);
    })
}

let selectOptionsHide=(select,selectOptions)=>{

    select.addEventListener('click',()=>{
        selectOptions.classList.toggle('select-options-hide')
        
    })
}

let selectOptionsFilter=(selectOption,products,productsContainer)=>{
    selectOption.forEach((option)=>{
     
        option.addEventListener('click',()=>{

            let newArray=[...products];
            let productsDos=(option.value==1||option.value==-1)?newArray.sort(function(a,b,valor){

                if(option.value==1?a.price>b.price:a.price<b.price){
                    return -1
                }
            }):products;
         

            localStorage.setItem('productos',JSON.stringify(productsDos))

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
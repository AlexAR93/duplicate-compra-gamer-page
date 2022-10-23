
//Crear elemento Tag para cuando utilice el filtro
let productsContainer=document.getElementById('products');
let btns=document.querySelectorAll('.btn');   
let selectOption=document.querySelectorAll('.select-option');
let btnCategoriesOpen=document.getElementById('categories');
let btnCategoriesClose=document.getElementById('tittle-options-close');
let btnOptions=document.getElementById('options');
let tagContainer=document.createElement('div');
let tag=document.createElement('p');
tagContainer.appendChild(tag);
tagContainer.classList.add('products__tag');


class ProductsInDom{
    constructor(products) {
        this.products=products;
    }   

    getByCategory(category){
        return this.products.filter(p=>p.category==category)
    }
    getByOrder(order){
        return this.products.sort(function(a,b){
                
            if(a.price==b.price){
                return 0
            }
            
            if(order==0){
                if(a.id<b.id){
                    return -1
                }
            }else if(order==1){
                if(a.price>b.price){
                    return -1
                }
            }else if(order==-1){
                if(a.price<b.price){
                    return -1
                }
            }else if(order==2){
                if(a.product.toLowerCase()<b.product.toLowerCase()){
                    return -1
                }
                
            }else if(order==-2){
                if(a.product.toLowerCase()>b.product.toLowerCase()){
                    return -1
                }
            }
            return 1
        });
    }
}

let groupFunctions=(products,cart)=>{
    const productClass=new ProductsInDom(products)
    productFunction(productClass,cart);  
      

}

let productFunction=(productClass,cart)=>{
    renderDom(productClass.getByOrder(0),cart)
     
    btnFilters(productClass,cart)
}
const renderDom=(products,cart)=>{ 
    productsContainer.innerHTML='';
    tag.innerHTML.length>=1&&productsContainer.appendChild(tagContainer)
    products.forEach((product)=>{
        let divContent=document.createElement('div');
        divContent.innerHTML=`
        <article id="${product.alt}">
            <img src="${product.url}" alt="${product.alt}">
            <h2>${product.product}</h2>
            <p>$${product.price}</p>
            <button class="btn-add" id="btn${product.id}" value="${product.id}">Sumar al carrito</button>
            <button class="btn-clear" value="${product.id}">Eliminar</button>
        </article>
        `
        divContent.classList.add('products__product')

        productsContainer.appendChild(divContent) 

    })

    cart(products)  
}


const btnFilters=(products,cart)=>{
    btnCategoriesShow()
    selectOptionsShow()
    btnFilter(products,cart)
}


let btnFilter=(products,cart)=>{

    btns.forEach((btn)=>{
        btn.addEventListener('click',()=>{
            
            //Agregar texto a tag, el mismo que la categoria
            tag.innerHTML=btn.innerHTML;
            let spanTag=document.createElement('span');
            spanTag.innerHTML='x'
            tag.appendChild(spanTag)
            renderDom(products.getByCategory(btn.innerHTML),cart)
        })

    })
    clearFilter(products.getByOrder(0),cart)
        //Filtro por precio
    //!Funcion del select filter para ordenar por precio
    selectOptionsFilter(products,cart)
}

let btnCategoriesShow=()=>{
    btnCategoriesOpen.addEventListener('click',()=>{
        btnOptions.classList.remove('options-hide');
    })
    btnCategoriesClose.addEventListener('click',()=>{
        btnOptions.classList.add('options-hide')
    })
}


let clearFilter=(products,cart)=>{
    tag.addEventListener('click',()=>{
        tag.innerHTML='';
        renderDom(products,cart)
    })
}

// /*---------------------------Filter by price---------------------------*/

let selectOptionsFilter=(products,cart)=>(
    selectOption.forEach((option)=>
        option.addEventListener('click',()=>{
            renderDom(products.getByOrder(option.value),cart)
        })
    )
)

let selectOptionsShow=()=>{
    let select=document.getElementById('select');
    let selectOptions=document.getElementById('select-options');
    select.addEventListener('click',()=>{
        selectOptions.classList.toggle('select-options-hide')
    })
}

export{
    groupFunctions
}


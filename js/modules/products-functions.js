
//Crear elemento Tag para cuando utilice el filtro
const productsContainer=document.getElementById('products');
const btns=document.querySelectorAll('.btn');   
const selectOption=document.querySelectorAll('.select-option');
const btnCategoriesOpen=document.getElementById('categories');
const btnCategoriesClose=document.getElementById('tittle-options-close');
const btnOptions=document.getElementById('options');
const tagContainer=document.createElement('div');
const tag=document.createElement('p');
tagContainer.appendChild(tag);
tagContainer.classList.add('products__tag');

class ProductsInDom{
    constructor(products) {
        this.products=products;
    }   

    getProducts(){
        return this.products
    }
    getByCategory(category){
     
        return this.products.filter(p=>p.category==category)
    }
    getByOrder(order,object){
        const newArray=object;
        return newArray.sort(function(a,b){
                
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

const groupFunctions=(products,cart)=>{
    const productClass=new ProductsInDom(products)
    productFunction(productClass,cart);  
}

const productFunction=(productClass,cart)=>{
    renderProducts(productClass.getProducts(),cart) 
    btnFilters(productClass,cart)
}
const renderProducts=(products,cart)=>{ 
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
        </article>`
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

const btnFilter=(products,cart)=>{
    btns.forEach((btn)=>{
        btn.addEventListener('click',e=>filterClickEvent(e,products,cart))
    })
    clearFilter(products,cart)
        //Filtro por precio
    //!Funcion del select filter para ordenar por precio
    selectOptionsFilter(products,cart,products.getProducts())
    
}

const filterClickEvent=(e,products,cart)=>{           
    //Agregar texto a tag, el mismo que la categoria
    tag.innerHTML=e.target.innerHTML;
    const spanTag=document.createElement('span');
    spanTag.innerHTML='x'
    tag.appendChild(spanTag)
    renderProducts(products.getByCategory(e.target.innerHTML),cart)
    selectOptionsFilter(products,cart,products.getByCategory(e.target.innerHTML))
}

const btnCategoriesShow=()=>{
    btnCategoriesOpen.addEventListener('click',()=>btnOptions.classList.remove('options-hide'))
    btnCategoriesClose.addEventListener('click',()=>btnOptions.classList.add('options-hide'))
}

const clearFilter=(products,cart)=>{
    tag.addEventListener('click',()=>{
        tag.innerHTML='';
        renderProducts(products.getProducts(),cart)
        selectOptionsFilter(products,cart,products.getProducts())
    })
}
// /*---------------------------Filter by price---------------------------*/
const selectOptionsFilter=(products,cart,viewProducts)=>(
    selectOption.forEach((option)=>
        option.addEventListener('click',()=>renderProducts(products.getByOrder(option.value,viewProducts),cart))
    )
)

const selectOptionsShow=()=>{
    const select=document.getElementById('select');
    const selectOptions=document.getElementById('select-options');
    select.addEventListener('click',()=>selectOptions.classList.toggle('select-options-hide'))
}

export{
    groupFunctions
}


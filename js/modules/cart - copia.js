
localStorage.setItem('products',JSON.stringify([]))
let inLocalStorage=JSON.parse(localStorage.getItem('products'));
let productsInCart=[];


const cart=(productsInJson=inLocalStorage)=>{

    let products=structuredClone(productsInJson)
    console.log(products)
    products.forEach(p=>p.quantity=0)
    
    addProduct(products)
    clearProduct(products,productsInJson)
}

const addProduct=(products)=>{
    let cardButtons=document.querySelectorAll('.btn-add');
    cardButtons.forEach((btn)=>{
        btn.addEventListener('click',e=>addClickEvent(e,products))
    })
}

const addClickEvent=(e,products)=>{
    const btnValue=parseInt(e.target.value);
    let newProduct=products.find(p=>p.id===btnValue)
    
    !productsInCart.some(p=>p.id==btnValue)?(
    newProduct.quantity=1,
    newProduct.lot-=newProduct.quantity,
    productsInCart.push(products.find(p=>p.id===btnValue))
    )
    :(newProduct.quantity+=1,
    newProduct.lot-=newProduct.quantity)
    
    console.log(newProduct)
}

const clearProduct=(products,productsInJson)=>{
    let clearBtnCard=document.querySelectorAll('.btn-clear');
    clearBtnCard.forEach(btn=>{
        btn.addEventListener('click',e=>clearClickEvent(e,products,productsInJson))
    })
}

const clearClickEvent=(e,products,productsInJson)=>{
    const btnValue=parseInt(e.target.value);
    let productIndex=productsInCart.findIndex(p=>p.id===btnValue)
    productsInCart.splice(productIndex,1)
    
    console.log(productsInJson)
    return products=structuredClone(productsInJson)
}

export{
    cart
}
'use strict'

import {groupFunctions} from './products-functions.js';
import {cart} from './cart.js'

const products=async()=>{
    const url="./products.json";
    const productsDate=await fetch(url);
    const products=await productsDate.json();
    groupFunctions(products.products,cart)
    return products
}
products()








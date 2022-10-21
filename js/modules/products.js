'use strict'

import {groupFunctions} from './products-functions.js';
import {cart} from './cart.js'

let products=async()=>{
    let url="./js/modules/products.json";
    let productsDate=await fetch(url);
    let products=await productsDate.json();
    groupFunctions(products,cart)
    return products
}
products()








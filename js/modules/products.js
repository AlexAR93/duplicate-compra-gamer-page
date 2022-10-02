'use strict'

import {groupFunctions} from './products-functions.js';

let hola=async()=>{
    let url="./js/modules/products.json";
    let productsDate=await fetch(url);
    let products=await productsDate.json();
    return products
}

groupFunctions(hola)






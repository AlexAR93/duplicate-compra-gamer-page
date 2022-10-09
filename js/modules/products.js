'use strict'

import {groupFunctions} from './products-functions.js';

let products=async()=>{
    let url="./js/modules/products.json";
    let productsDate=await fetch(url);
    let products=await productsDate.json();
    return products
}

groupFunctions(products)






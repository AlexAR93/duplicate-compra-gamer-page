
import slider from './modules/slider.js';
import sliderFunction from './modules/slider-function.js';
import latestNews from './modules/slider-latest-new.js';
import {cart} from './modules/cart.js'

const data=async()=>{
    const url="./products.json";
    const productsDate=await fetch(url);
    const products=await productsDate.json();
    slider(products.images)
    latestNews(products.products)
    sliderFunction()
    return products
}
data()
cart()



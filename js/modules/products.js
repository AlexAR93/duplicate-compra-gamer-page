'use strict'
import { products } from "./img-slider.js";
import {productFunction,btnFilter,btnCategoriesFunction,selectOptionsHide,selectOptionsFilter} from './products-functions.js';


let productsContainer=document.getElementById('products');
let btns=document.querySelectorAll('.btn');

let btnCategoriesOpen=document.getElementById('categories');
let btnCategoriesClose=document.getElementById('tittle-options-close');

let btnOptions=document.getElementById('options');

let select=document.getElementById('select');
let selectOptions=document.getElementById('select-options');
let selectOption=document.querySelectorAll('.select-option')

//ingresar array de productos en localStorage
localStorage.setItem('productos',JSON.stringify(products))


//obtener productos del localStorage
let localStorageProducts=JSON.parse(localStorage.getItem('productos'))

//mostrar todos los productos al iniciar
productFunction(productsContainer,localStorageProducts);

//!Categoria filtro

//Funcion para filtrar por categoria y mostrar en pantalla
btnFilter(btns,localStorageProducts,productsContainer)

//Abrir y Cerrar menu de opciones del filtro categoria
btnCategoriesFunction(btnCategoriesOpen,btnCategoriesClose,btnOptions)


//!Filtro por precio
selectOptionsHide(select,selectOptions)
selectOptionsFilter(selectOption,productsContainer)
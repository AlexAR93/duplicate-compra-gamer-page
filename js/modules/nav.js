const navButton=document.querySelector('#nav__button');
const navbar=document.querySelector('.nav__links');
    
export default navButton.addEventListener('click',()=>{
    navbar.classList.toggle('show-nav');
       
})


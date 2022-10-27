const navButton=document.querySelector('#nav__button');
const navbar=document.querySelector('.nav__links');
const liSponsorsBtn=document.getElementById('nav__links__sponsors');
const liSponsors=document.querySelector('#nav__links__sponsors>ul'); 

const navFunctions=()=>{
    navButton.addEventListener('click',()=>navbar.classList.toggle('nav-hide'));
    liSponsorsBtn.addEventListener('click',()=>liSponsors.classList.toggle('hide-sponsors'));
}
export default navFunctions();






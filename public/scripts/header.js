


var nav = document.querySelector('.header');
console.log(window.pageYOffset);

if(window.pageYOffset <= 0){
    nav.classList.add('header--position');
} else if(window.pageYOffset >=0){
    nav.classList.remove>('header--position');
}

var btn = document.querySelector('.mainheader__btn');
  var nav = document.querySelector('.header__nav');
  
  function handleClick(){
    nav.classList.toggle('header__nav--active');
}

btn.addEventListener('click', handleClick);

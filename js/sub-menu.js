(function(){
    const openButton = document.querySelector('.sub-menu');
    const openMenu = document.querySelector('.nav-ul');

    openButton.addEventListener('click', ()=>{
        if (openMenu.classList.contains('sub-li-hidden')){
            openMenu.classList.remove('sub-li-hidden');
            openMenu.classList.add('sub-li-show');
        }
        else{
            openMenu.classList.add('sub-li-hidden');
            openMenu.classList.remove('sub-li-show');
        }
    });
})();
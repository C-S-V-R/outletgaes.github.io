(function ajustarHeader(){
    const header = document.getElementById('Header');
    const ventana = document.getElementById('Ventana');
    const alturaHeader = header.getBoundingClientRect().height;
    //const literas = document.getElementById('Literas');

    //literas.style.marginTop = alturaHeader + '10px';
    ventana.style.marginTop = alturaHeader + '10px';

    window.addEventListener('load', ajustarHeader);
    window.addEventListener('resize', ajustarHeader);
})();
const seleccion = {
    color_tubo: null,
    color_tela: null
};

function seleccionarColor(contenedorId, button) {
    const color = button.getAttribute('data-color');
    seleccion[contenedorId] = color;
    document.querySelectorAll(`#${contenedorId}
     .op-color`).forEach(btn => {
        btn.style.border = 'none';
    });
    button.style.border = '5px solid black';
    const spanId = contenedorId === 'color_tubo' ? 'color1' : 'color2';
    document.getElementById(spanId).textContent = color;
}

document.querySelectorAll('#color_tubo .op-color').forEach(btn => {
    btn.addEventListener('click', function () {
        console.log('Botón seleccionado: ', this);
        seleccionarColor('color_tubo', this);
    });
});
document.querySelectorAll('#color_tela .op-color').forEach(btn => {
    btn.addEventListener('click', function () {
        console.log('Botón seleccionado: ', this);
        seleccionarColor('color_tela', this);
    });
});

console.log(document.querySelectorAll('#color_tubo .op-color'));
console.log('1: ', seleccion.color_tubo);
console.log('2: ', seleccion.color_tela);

//

(function AbrirVentana() {
    const ventana = document.getElementById('Ventana');
    const altura = window.getComputedStyle(ventana);
    const alturaActual = altura.height;
    const cerrar = document.getElementById('Cerrar');

    document.querySelectorAll('.tam-select').forEach(
        abrirVentana => {
            abrirVentana.addEventListener('click', () => {
                if (alturaActual === '0px') {
                    ventana.style.height = 'max-content';
                    console.log('Abrir Ventana');

                    const Producto = abrirVentana.closest('.card');
                    const id_btn = abrirVentana.id;
                    const Nombre = Producto.getAttribute('producto');
                    const tela = document.getElementById('color_tela');
                    const tex_tela = document.getElementById('texto-tela');
                    const tubo = document.getElementById('color_tubo');
                    const text_tubo = document.getElementById('tubo-color');

                    document.getElementById('p-ventana').textContent = Nombre;

                    if (id_btn === 'btn-indi') {
                        const Tam = Producto.getAttribute('tam-indi');
                        const Precio = Producto.getAttribute('precio-indiv');
                        document.getElementById('Tam-producto').textContent = Tam;
                        document.getElementById('Precio').textContent = Precio;
                    }

                    if (id_btn === 'btn-matri') {
                        const Tam = Producto.getAttribute('tam-matri');
                        const Precio = Producto.getAttribute('precio-matri');
                        document.getElementById('Tam-producto').textContent = Tam;
                        document.getElementById('Precio').textContent = Precio;
                    }

                    if (id_btn === 'btn-qs') {
                        const Tam = Producto.getAttribute('tam-qs');
                        const Precio = Producto.getAttribute('precio-qs');
                        document.getElementById('Tam-producto').textContent = Tam;
                        document.getElementById('Precio').textContent = Precio;
                    }

                    if (id_btn === 'btn-ks') {
                        const Tam = Producto.getAttribute('tam-ks');
                        const Precio = Producto.getAttribute('precio-ks');
                        document.getElementById('Tam-producto').textContent = Tam;
                        document.getElementById('Precio').textContent = Precio;
                    }

                    if (Producto.classList.contains('tubular')) {
                        tela.style.height = '0px';
                        tex_tela.style.display = 'none';
                    } else {
                        tela.style.height = 'max-content';
                        tex_tela.style.display = 'block';
                    }

                    if (Producto.classList.contains('colchon')) {
                        tubo.style.height = '0px';
                        text_tubo.style.display = 'none';
                        tela.style.height = '0px';
                        tex_tela.style.display = 'none';
                    }
                } else {
                    ventana.style.height = '0px';
                }

                cerrar.addEventListener('click', () => {
                    ventana.style.height = '0px';
                });
            });
        });
})();

let productoActual = "";
let tamanoActual = "";
let precioActual = "";
let esColchon = false;
let esTubularSolo = false;

document.querySelectorAll('.tam-select').forEach(botonTamano => {
    botonTamano.addEventListener('click', function() {
        const card = this.closest('.card'); 
        productoActual = card.getAttribute('producto');
        
        // Guardamos qué tipo de producto es para usarlo en el mensaje
        esColchon = card.classList.contains('colchon');
        esTubularSolo = card.classList.contains('tubular');

        // Buscamos el precio y tamaño según el botón picado
        if (this.id === "btn-indi") {
            tamanoActual = card.getAttribute('tam-indi');
            precioActual = card.getAttribute('precio-indiv');
        } else if (this.id === "btn-matri") {
            tamanoActual = card.getAttribute('tam-matri');
            precioActual = card.getAttribute('precio-matri');
        } else if (this.id === "btn-qs") {
            tamanoActual = card.getAttribute('tam-qs');
            precioActual = card.getAttribute('precio-qs');
        } else if (this.id === "btn-ks") {
            tamanoActual = card.getAttribute('tam-ks');
            precioActual = card.getAttribute('precio-ks');
        }

        document.getElementById('Precio').innerText = precioActual;
    });
});

const miTelefono = "525586931225"; 

// FUNCIÓN MAESTRA PARA ARMAR EL MENSAJE
function construirMensaje(tipo) {
    let mensaje = `Hola, me interesa ${tipo}: ${productoActual} (${tamanoActual}).`;

    // Si NO es colchón, agregamos detalles de color
    if (!esColchon) {
        // Agregamos Tubular (Si no se ha elegido color, avisamos)
        const cTubo = seleccion.color_tubo || "Sin seleccionar";
        mensaje += `\n- Color de Tubular: ${cTubo}`;

        // Si NO es solo tubular (es decir, lleva tela), agregamos la tela
        if (!esTubularSolo) {
            const cTela = seleccion.color_tela || "Sin seleccionar";
            mensaje += `\n- Color de Tela: ${cTela}`;
        }
    }

    mensaje += `\nPrecio: $${precioActual}.`;

    // Si es apartado, agregamos el cálculo
    if (tipo === "apartar" && !isNaN(precioActual)) {
        const mitad = parseFloat(precioActual) / 2;
        mensaje += `\nMi anticipo sería de: $${mitad}.`;
    }

    return mensaje;
}

// BOTÓN COMPRAR
document.querySelector('.op-compra:not(.apartar)').addEventListener('click', () => {
    const texto = construirMensaje("comprar");
    window.open(`https://wa.me/${miTelefono}?text=${encodeURIComponent(texto)}`, '_blank');
});

// BOTÓN APARTAR
document.querySelector('.apartar').addEventListener('click', () => {
    const texto = construirMensaje("apartar");
    window.open(`https://wa.me/${miTelefono}?text=${encodeURIComponent(texto)}`, '_blank');
});
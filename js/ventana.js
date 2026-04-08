const seleccion = {
    color_tubo: null,
    color_tela: null
};

function seleccionarColor(contenedorId, button) {
    const color = button.getAttribute('data-color');
    seleccion[contenedorId] = color;
    document.querySelectorAll(`#${contenedorId} .op-color`).forEach(btn => {
        btn.style.border = 'none';
    });
    button.style.border = '5px solid black';
    const spanId = contenedorId === 'color_tubo' ? 'color1' : 'color2';
    document.getElementById(spanId).textContent = color;
}

document.querySelectorAll('#color_tubo .op-color').forEach(btn => {
    btn.addEventListener('click', function () {
        seleccionarColor('color_tubo', this);
    });
});

document.querySelectorAll('#color_tela .op-color').forEach(btn => {
    btn.addEventListener('click', function () {
        seleccionarColor('color_tela', this);
    });
});

(function AbrirVentana() {
    const ventana = document.getElementById('Ventana');
    const cerrar = document.getElementById('Cerrar');

    document.querySelectorAll('.tam-select').forEach(abrirVentana => {
        abrirVentana.addEventListener('click', () => {
            // REINICIAR SELECCIÓN AL ABRIR
            seleccion.color_tubo = null;
            seleccion.color_tela = null;
            document.getElementById('color1').textContent = "";
            document.getElementById('color2').textContent = "";
            document.querySelectorAll('.op-color').forEach(btn => btn.style.border = 'none');

            // Abrir la ventana
            ventana.style.height = 'max-content';

            const Producto = abrirVentana.closest('.card');
            const id_btn = abrirVentana.id;
            const Nombre = Producto.getAttribute('producto');
            
            const tela = document.getElementById('color_tela');
            const tex_tela = document.getElementById('texto-tela');
            const tubo = document.getElementById('color_tubo');
            const text_tubo = document.getElementById('tubo-color');

            document.getElementById('p-ventana').textContent = Nombre;

            // ASIGNACIÓN DE PRECIO Y TAMAÑO
            let Tam = "";
            let Precio = "";

            if (id_btn === 'btn-indi') {
                Tam = Producto.getAttribute('tam-indi');
                Precio = Producto.getAttribute('precio-indiv');
            } else if (id_btn === 'btn-matri') {
                Tam = Producto.getAttribute('tam-matri');
                Precio = Producto.getAttribute('precio-matri');
            } else if (id_btn === 'btn-qs') {
                Tam = Producto.getAttribute('tam-qs');
                Precio = Producto.getAttribute('precio-qs');
            } else if (id_btn === 'btn-ks') {
                Tam = Producto.getAttribute('tam-ks');
                Precio = Producto.getAttribute('precio-ks');
            }

            document.getElementById('Tam-producto').textContent = Tam;
            document.getElementById('Precio').textContent = Precio;

            // --- LÓGICA DE VISIBILIDAD CORREGIDA ---
            if (Producto.classList.contains('colchon')) {
                // Es colchón: Ocultar todo
                tubo.style.height = '0px';
                text_tubo.style.display = 'none';
                tela.style.height = '0px';
                tex_tela.style.display = 'none';
            } 
            else if (Producto.classList.contains('tubular')) {
                // Es solo tubular: Mostrar tubo, ocultar tela
                tubo.style.height = 'max-content';
                text_tubo.style.display = 'block';
                tela.style.height = '0px';
                tex_tela.style.display = 'none';
            } 
            else {
                // Es base con tela: Mostrar ambos
                tubo.style.height = 'max-content';
                text_tubo.style.display = 'block';
                tela.style.height = 'max-content';
                tex_tela.style.display = 'block';
            }

            // Guardar datos para el mensaje de WhatsApp globalmente
            window.productoActual = Nombre;
            window.tamanoActual = Tam;
            window.precioActual = Precio;
            window.esColchon = Producto.classList.contains('colchon');
            window.esTubularSolo = Producto.classList.contains('tubular');
        });
    });

    cerrar.addEventListener('click', () => {
        ventana.style.height = '0px';
    });
})();

const miTelefono = "525586931225"; 

function construirMensaje(tipo) {
    let mensaje = `Hola, me interesa ${tipo}: ${window.productoActual} (${window.tamanoActual}).`;

    if (!window.esColchon) {
        const cTubo = seleccion.color_tubo || "Sin seleccionar";
        mensaje += `\n- Color de Tubular: ${cTubo}`;

        if (!window.esTubularSolo) {
            const cTela = seleccion.color_tela || "Sin seleccionar";
            mensaje += `\n- Color de Tela: ${cTela}`;
        }
    }

    mensaje += `\nPrecio: $${window.precioActual}.`;

    if (tipo === "apartar" && !isNaN(window.precioActual)) {
        const mitad = parseFloat(window.precioActual) / 2;
        mensaje += `\nMi anticipo sería de: $${mitad}.`;
    }

    return mensaje;
}

document.querySelector('.op-compra:not(.apartar)').addEventListener('click', () => {
    const texto = construirMensaje("comprar");
    window.open(`https://wa.me/${miTelefono}?text=${encodeURIComponent(texto)}`, '_blank');
});

document.querySelector('.apartar').addEventListener('click', () => {
    const texto = construirMensaje("apartar");
    window.open(`https://wa.me/${miTelefono}?text=${encodeURIComponent(texto)}`, '_blank');
});

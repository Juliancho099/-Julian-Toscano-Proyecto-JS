
const ProductosEnCarrito = JSON.parse(localStorage.getItem('productos'));
const ContenedorPorducto = document.querySelector('.carrito__productos');
const CarritoVacio = document.querySelector('.carrito__vaciar');
const carritoComprar = document.querySelector('.carrito__comprar');
const carritoTotal = document.getElementById('carrito-total')
let plantillaProducto = document.querySelector('.plantillaCarrito').content;
const CarritVolver = document.querySelector('#carrito-volver');
let botonesEliminar = document.querySelectorAll('.producto__eliminar');

loginUser = JSON.parse(localStorage.getItem('login-user'));


function CargarProductosCarrito() {
    if (!ProductosEnCarrito || !loginUser || ProductosEnCarrito.length === 0) {
        window.location.href = '../index.html'
    } else {

        ContenedorPorducto.innerHTML = '';

        ProductosEnCarrito.forEach(producto => {
            const plantilla = plantillaProducto.cloneNode(true);

            plantilla.querySelector('.producto__img').src = `.${producto.src}`;
            plantilla.querySelector('.titulo').innerText = producto.nombre;
            plantilla.querySelector('.cantidad').innerText = producto.cantidad;
            plantilla.querySelector('.precio').innerText = producto.precio;
            plantilla.querySelector('.subtotal').innerText = `$${producto.precio * producto.cantidad}`;
            plantilla.querySelector('.producto__eliminar').id = producto.id;

            ContenedorPorducto.appendChild(plantilla);
        });

    }

    RecuperarBotonesEliminar()
    ActualizarTotal()
}

CargarProductosCarrito()



function RecuperarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll('.producto__eliminar');

    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', eliminarDelCarrito)
    });
}

function eliminarDelCarrito(e) {
    Toastify({

        text: "Se elimino del carrito",
        duration: 1500,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #2D1A40, #2D1A40)",
            borderRadius: '2rem',
            textTransform: 'uppercase',
            fontSize: '.8rem'
        },
        onClick: function () { } // Callback after click
    }).showToast();
    const idBoton = e.currentTarget.id;
    const index = ProductosEnCarrito.findIndex(producto => producto.id === idBoton);
    ProductosEnCarrito.splice(index, 1);

    CargarProductosCarrito()

    localStorage.setItem('productos', JSON.stringify(ProductosEnCarrito));
}

function VaciarCarrito() {
    Swal.fire({
        title: "Estas Seguro?",
        icon: "question",
        html: `Se van a borrar ${ProductosEnCarrito.reduce((acc, producto)=> acc + producto.cantidad,0)} productos`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `Si`,
        cancelButtonText: `No`,
        cancelButtonAriaLabel: "Thumbs down"
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            ProductosEnCarrito.length = 0;
            localStorage.setItem('productos', JSON.stringify(ProductosEnCarrito));
            CargarProductosCarrito()
        }
    });

}


function ActualizarTotal() {
    const Total = ProductosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    carritoTotal.innerText = `$${Total}`;
}

function ComprarCarrito() {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Muchas Gracias por tu compra",
        showConfirmButton: false,
        timer: 1500
    });
    setTimeout(() => {
        ProductosEnCarrito.length = 0;
        localStorage.setItem('productos', JSON.stringify(ProductosEnCarrito));
        window.location.href = '../index.html'
    }, 1500)

}

CarritoVacio.addEventListener('click', VaciarCarrito)
carritoComprar.addEventListener('click', ComprarCarrito)
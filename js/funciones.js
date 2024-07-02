/*..........*/
/*VARIABLES*/
/*..........*/
//Seccion principal
let menu = document.querySelector('#portada'),
    botonMenu = document.querySelector('#show-menu'),
    btnLogin = document.querySelector('#btn-user'),
    login = document.querySelector('#log-in-container'),
    cerrar = document.querySelectorAll('.cerrar'),
    cerrarMenu = document.querySelector('#home'),
    //Secciion Nav
    nav = document.querySelector('.nav__links'),
    btnNav = document.querySelector('#nav'),
    botonesNav = document.querySelectorAll('.nav__link'),
    btnCerrar = document.querySelector('#nav-cerrar'),
    //Seccion Slogan y Bowls
    articulo = document.querySelector('.contenedor'),
    slogan = document.querySelector('.slogan'),
    video = document.querySelector('.video__informacion'),
    atras = document.querySelector('#atras'),
    adelante = document.querySelector('#adelante'),
    bowlsCont = document.querySelector('.bowls__cont'),
    template = document.querySelector('template').content,
    //Seccion Login y Regiister
    loginUser,
    userName = document.querySelector('.user__name'),
    botoncerrar,
    actual = 0;


//Constantes del Login
const registrate = document.querySelector('#registrate');
const widowUser = document.querySelector('.user');
const loginForm = document.querySelector('#login-form');
const userOut = document.querySelector('.user__logout');
const botonCancelar = document.querySelector('#btn-cancel');
//constantes del Register
const registerForm = document.querySelector('#register-form');
const btnCancel = document.querySelector('#btn-cancel-register');
const emailVerificacion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**---------- */
/**Funciones */
/**-------- */

//Declaramos Funciones para las animaciones de cada secciion

function mostrarSeccion(seccion) {
    if (seccion == menu || seccion == login) {
        seccion.classList.remove('display');
        seccion.classList.add('from-up');
        seccion.classList.remove('top--up');
        if (seccion == login) {
            btnLogin.classList.add('display');
        }
    } else if (seccion == nav) {
        seccion.classList.remove('nav--display');
        seccion.classList.remove('right');
        seccion.classList.add('left');
        btnNav.classList.add('nav--display');
    }


}

function ocultarSeccion(seccion) {
    if (seccion == menu || seccion == login) {
        seccion.classList.remove('from-up');
        seccion.classList.add('top--up');
        setTimeout(() => {
            seccion.classList.add('display');
        }, 700);
        if (seccion == login) {
            setTimeout(() => {
                btnLogin.classList.remove('display');
            }, 700);
        }
    } else if (seccion == nav) {
        seccion.classList.add('right');
        seccion.classList.remove('left');
        setTimeout(() => {
            seccion.classList.add('nav--display');
            btnNav.classList.remove('nav--display');
        }, 700);
    }
}

//creawmos un boton para cerrar la seccion Nav

const botonCerrar = () => {
    btnCerrar = document.createElement('a');
    btnCerrar.id = 'nav-cerrar';
    btnCerrar.classList.add('nav__logo', 'nav__logo--absolute');
    btnCerrar.innerHTML = `<i class="bi bi-x-lg"></i>`;

    nav.appendChild(btnCerrar);

    btnCerrar.addEventListener('click', () => {
        ocultarSeccion(nav);
        setTimeout(() => {
            if (nav.contains(btnCerrar)) {
                nav.removeChild(btnCerrar);
            }
        }, 200);
    });
};

// Creamos la Funcionaldad de nuestro registro y login

function mostrarFormularioRegistro() {
    registerForm.classList.remove('form--display');
    loginForm.classList.add('form--display');
}

function mostrarFormularioLogin() {
    loginForm.classList.remove('form--display');
    registerForm.classList.add('form--display');
}

function configurarBotonMenu() {
    botonMenu.removeEventListener('click', manejarBotonMenu);
    botonMenu.addEventListener('click', manejarBotonMenu);
}

function manejarBotonMenu() {
    loginUser = JSON.parse(localStorage.getItem('login-user'));
    if (!loginUser) {
        mostrarSeccion(login);
    } else {
        ocultarSeccion(menu);
    }
}

// Creamos una funcion para cuando la pantalla pase cierta cantidad
//de pixeles el carrusel pase a un array de productos

function scrollWindows() {

    // Mostrar una sola vez cuando se está por debajo de los píxeles
    bowlsCont.innerHTML = ''; 
    let plantilla = template.cloneNode(true);
    bowlsCont.append(plantilla);

    // Mostrar flechas de navegación cuando se está por debajo de los píxeles
    document.querySelector('.bowls__atras').style.display = 'block';
    document.querySelector('.bowls__adelante').style.display = 'block';
}


// Función para manejar el scroll y el comportamiento de bowlsCont
function handleBowlsCont() {
if (window.innerWidth >= 1024) {
    bowlsCont.innerHTML = ''; // Limpiar contenido anterior antes de agregar nuevos elementos

    cards.forEach(card => {
        let plantilla = template.cloneNode(true);

        let img = plantilla.querySelector('.bowls__img');
        img.src = card.src;

        plantilla.querySelector('.bowls__titulo').innerText = card.nombre;
        plantilla.querySelector('.bowls__descripcion').innerText = card.descripcion;
        plantilla.querySelector('.bowls__price').innerText = card.precio;
        plantilla.querySelector('.bowls__btn').id = card.id;

        bowlsCont.append(plantilla);
    });

    // Ocultar flechas de navegación cuando se muestran todas las cards
    document.querySelector('.bowls__atras').style.display = 'none';
    document.querySelector('.bowls__adelante').style.display = 'none';
} else {
    // Mantener el comportamiento de carrusel
    scrollWindows(); 
}
}
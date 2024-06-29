/**---------- */
/**Funciones */
/**-------- */



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

function mostrarFormularioRegistro() {
    registerForm.classList.remove('form--display');
    loginForm.classList.add('form--display');
}

function mostrarFormularioLogin() {
    loginForm.classList.remove('form--display');
    registerForm.classList.add('form--display');
}



//Manejar el scroll para el manejo del forEach

let bowlsCont = document.querySelector('.bowls__cont');
let template = document.querySelector('template').content;

function scrollWindows() {

        // Mostrar una sola vez cuando se está por debajo de los píxeles
        bowlsCont.innerHTML = ''; // Limpiar contenido anterior antes de agregar nuevo
        let plantilla = template.cloneNode(true);
        bowlsCont.append(plantilla);

        // Mostrar flechas de navegación cuando se está por debajo de los píxeles
        document.querySelector('.bowls__atras').style.display = 'block';
        document.querySelector('.bowls__adelante').style.display = 'block';
}


// Función para manejar el scroll y el comportamiento de bowlsCont
function handleBowlsCont() {
    if (window.innerWidth >= 1024) {
        // Mostrar todas las cards como un conjunto estático
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
        scrollWindows(); // Llamar a la función original para manejar el carrusel
    }
}

// Vincular handleBowlsCont al evento de cambio de tamaño de la ventana
window.addEventListener('resize', handleBowlsCont);





/*..........*/
/*VARIABLES*/
/*..........*/

let menu = document.querySelector('#portada'),
    botonMenu = document.querySelector('#show-menu'),
    btnLogin = document.querySelector('#btn-user'),
    login = document.querySelector('#log-in-container'),
    cerrar = document.querySelectorAll('.cerrar'),
    cerrarMenu = document.querySelector('#home'),
    nav = document.querySelector('.nav__links'),
    btnNav = document.querySelector('#nav'),
    articulo = document.querySelector('.contenedor'),
    botonesNav = document.querySelectorAll('.nav__link'),
    btnCerrar = document.querySelector('#nav-cerrar'),
    slogan = document.querySelector('.slogan'),
    video = document.querySelector('.video__informacion'),
    atras = document.querySelector('#atras'),
    adelante = document.querySelector('#adelante'),
    loginUser,
    botoncerrar,
    actual = 0;


/*----------*/
/*TEMPLATES*/
/*--------*/

class Card {
    constructor(src, descripcion, precio, id, nombre) {
        this.src = src;
        this.descripcion = descripcion;
        this.precio = precio;
        this.id = id;
        this.nombre = nombre;
    }
}

const cards = [
    new Card(
        './sources/acaiLogo.jpeg',
        'Lorem ipsum dolor, sit amet consectetur adipisicing.',
        '$7000',
        'Harper',
        'Harper Acai'
    ),
    new Card(
        './sources/acaiback.jpeg',
        'Lorem ipsum dolor, sit amet consectetur adipisicing.',
        '$7000',
        'Berry',
        'Berry Acai'
    ),
    new Card(
        './sources/acaiLogo.jpeg',
        'Lorem ipsum dolor, sit amet consectetur adipisicing.',
        '$8000',
        'Penaut',
        'Penaut Acai'
    ),
    new Card(
        './sources/acaiback.jpeg',
        'Lorem ipsum dolor, sit amet consectetur adipisicing.',
        '$9000',
        'Protein',
        'Protein Acai'
    ),
    new Card(
        './sources/acaiLogo.jpeg',
        'Lorem ipsum dolor, sit amet consectetur adipisicing.',
        '$9000',
        'Flex',
        'Flex Acai'
    )
]

//cargamos el primer elemento en el dom para dar a entender el contendio del carrusell

scrollWindows()
handleBowlsCont();

/*........*/
/*EVENTOS*/
/*........*/

document.addEventListener('DOMContentLoaded', () => {
    loginUser = JSON.parse(localStorage.getItem('login-user'));
    configurarBotonMenu();

    if (loginUser) {
        botonMenu.addEventListener('clcik',()=>mostrarSeccion(menu));
    } else {
        botonMenu.addEventListener('clcik',()=>mostrarSeccion(login));
    }
});


cerrarMenu.addEventListener('click', () => mostrarSeccion(menu));
btnLogin.addEventListener('click', () => mostrarSeccion(login));
cerrar.forEach(btn =>{
    btn.addEventListener('click', ()=> ocultarSeccion(login));
})
btnNav.addEventListener('click', () => {
    mostrarSeccion(nav);
    botonCerrar();
});

//Por cada boton de la nav usamos la funcion ocultarSeccion y eliminamos el boton cerrar en caso de que este 
botonesNav.forEach(btn => {
    btn.addEventListener('click', () => {
        ocultarSeccion(nav);
        setTimeout(() => {
            // Verificar si btnCerrar está definido antes de intentar eliminarlo
            if (typeof btnCerrar !== 'undefined' && nav.contains(btnCerrar)) {
                nav.removeChild(btnCerrar);
            }
        }, 200);
    });
});

slogan.addEventListener('mouseenter', () => {
    setTimeout(() => {
        video.classList.remove('video--none')
    }, 100);
})

slogan.addEventListener('mouseleave', () => video.classList.add('video--none'));

atras.addEventListener('click', () => {
    actual -= 1;

    if (actual === -1) {
        actual = cards.length - 1;
    }

    let plantilla = template.cloneNode(true);

    let img = plantilla.querySelector('.bowls__img');
    img.src = cards[actual].src;

    plantilla.querySelector('.bowls__titulo').innerText = cards[actual].nombre;
    plantilla.querySelector('.bowls__descripcion').innerText = cards[actual].descripcion;
    plantilla.querySelector('.bowls__price').innerText = cards[actual].precio;
    plantilla.querySelector('.bowls__btn').id = cards[actual].id;

    bowlsCont.innerHTML = '';
    bowlsCont.append(plantilla);
});

adelante.addEventListener('click', () => {
    actual += 1;

    if (actual === cards.length) {
        actual = 0;
    }

    let plantilla = template.cloneNode(true);

    let img = plantilla.querySelector('.bowls__img');
    img.src = cards[actual].src;

    plantilla.querySelector('.bowls__titulo').innerText = cards[actual].nombre;
    plantilla.querySelector('.bowls__descripcion').innerText = cards[actual].descripcion;
    plantilla.querySelector('.bowls__price').innerText = cards[actual].precio;
    plantilla.querySelector('.bowls__btn').id = cards[actual].id;

    bowlsCont.innerHTML = '';
    bowlsCont.append(plantilla);
});




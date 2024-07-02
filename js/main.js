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


/*........*/
/*EVENTOS*/
/*........*/

//Agregamos el evento para que este se ajuste a los pixeles adecuados
window.addEventListener('resize', handleBowlsCont);

//Evento para cargar el usuario del loocal storage al momento de cargar la pagina
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


// llamamos a las funciones de scroll y la iteracion de los bowls al sobrepasar los parametros
scrollWindows()
handleBowlsCont();


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

//Productos

const cargarDatos = () => {
	Promise.all([
		fetch('./js/productos.json').then((response) => {
			if (!response.ok) {
				throw new Error('Error al cargar productos.json');
			}
			return response.json();
		}),
		fetch('./js/sedes.json').then((response) => {
			if (!response.ok) {
				throw new Error('Error al cargar sedes.json');
			}
			return response.json();
		}),
		fetch('https://randomuser.me/api/?results=4').then((response) => {
			if (!response.ok) {
				throw new Error('Error al cargar datos de usuarios');
			}
			return response.json();
		}),
	])
		.then(([productosData, sedesData, dataUsers]) => {
			// Procesar productos
			tarjetas(productosData);

			// Procesar sedes
			sedesJson(sedesData);

			// Procesar usuarios
			const usuariosData = dataUsers.results;
			Usuarios(usuariosData);
		})
		.catch((error) => console.error('Error al cargar los datos:', error));
};

const tarjetas = (productos) => {
	productos.forEach((producto) => {
		const nuevaCard = new Card(
			producto.src,
			producto.descripcion,
			producto.precio,
			producto.id,
			producto.nombre,
		);
		cards.push(nuevaCard);
	});

	inicializarPrimeraCard();
	handleBowlsCont();
};

// Llamamos a las sucursales
const sedesJson = (sedes) => {
	sucursales = document.querySelector('.sucursales');
	sedes.map((sede) => {
		let divCont = document.createElement('div');
		divCont.classList.add('sede');
		divCont.innerHTML = `
            <iframe
                src='${sede.src}'
                style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
            </iframe>
            <div class="detalles">
                <h3 class="detalles__titulo">${sede.titulo}</h3>
                <p class="detalles__direccion">${sede.direccion}</p>
            </div>
        `;
		sucursales.append(divCont);
	});
};

//llamamos a los usuarios

const Usuarios = (usuariosData) => {
	const Grupos = document.querySelector('.grupos');
	usuariosData.forEach((usuario) => {
		const divGrupo = document.createElement('div');
		divGrupo.classList.add('grupo');
		divGrupo.innerHTML = `
            <img src="${usuario.picture.medium}" alt="Imagen de ${usuario.name.first}" class="grupo__img">
            <div class="datos">
                <h3 class="datos__titulo">${usuario.name.first} ${usuario.name.last}</h3>
                
            </div>
        `;

		Grupos.append(divGrupo);
	});
};

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
		userName.innerHTML = `<span>Nombre:</span> ${loginUser.nombre}`;
		botonMenu.addEventListener('clcik', () => mostrarSeccion(menu));
	} else {
		botonMenu.addEventListener('clcik', () => mostrarSeccion(login));
	}
});

cerrarMenu.addEventListener('click', () => mostrarSeccion(menu));
btnLogin.addEventListener('click', () => mostrarSeccion(login));
cerrar.forEach((btn) => {
	btn.addEventListener('click', () => ocultarSeccion(login));
});
btnNav.addEventListener('click', () => {
	mostrarSeccion(nav);
	botonCerrar();
});

//Por cada boton de la nav usamos la funcion ocultarSeccion y eliminamos el boton cerrar en caso de que este
botonesNav.forEach((btn) => {
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
		video.classList.remove('video--none');
	}, 100);
});

slogan.addEventListener('mouseleave', () => video.classList.add('video--none'));

adelante.addEventListener('click', () => {
	actual += 1;

	if (actual === cards.length) {
		actual = 0;
	}

	let plantilla = template.cloneNode(true);

	let img = plantilla.querySelector('.bowls__img');
	img.src = cards[actual].src;

	plantilla.querySelector('.bowls__titulo').innerText = cards[actual].nombre;
	plantilla.querySelector('.bowls__descripcion').innerText =
		cards[actual].descripcion;
	plantilla.querySelector(
		'.bowls__price',
	).innerText = `$${cards[actual].precio}`;
	plantilla.querySelector('.bowls__btn').id = cards[actual].id;

	bowlsCont.innerHTML = '';
	bowlsCont.append(plantilla);

	// Llamar a la función de inicialización de los botones
	inicializarBotonesComprar();
});

atras.addEventListener('click', () => {
	actual -= 1;

	if (actual === -1) {
		actual = cards.length - 1;
	}

	let plantilla = template.cloneNode(true);

	let img = plantilla.querySelector('.bowls__img');
	img.src = cards[actual].src;

	plantilla.querySelector('.bowls__titulo').innerText = cards[actual].nombre;
	plantilla.querySelector('.bowls__descripcion').innerText =
		cards[actual].descripcion;
	plantilla.querySelector(
		'.bowls__price',
	).innerText = `$${cards[actual].precio}`;
	plantilla.querySelector('.bowls__btn').id = cards[actual].id;

	bowlsCont.innerHTML = '';
	bowlsCont.append(plantilla);

	// Llamar a la función de inicialización de los botones
	inicializarBotonesComprar();
});

//llamamos a los productos y sedes

cargarDatos();

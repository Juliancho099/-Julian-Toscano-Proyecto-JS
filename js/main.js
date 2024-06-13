/**---------- */
/**Funciones */
/**-------- */



function mostrarSeccion(seccion) {
    if (seccion == menu || seccion == login) {
        seccion.classList.remove('container__display--none');
        seccion.classList.add('container__from-up');
        seccion.classList.remove('container__to-up');
        if (seccion == login) {
            btnLogin.classList.add('container__display--none');
        }
    } else if (seccion == nav) {
        seccion.classList.remove('contenedor__links--none');
        seccion.classList.remove('contenedor__right');
        seccion.classList.add('contenedor__left');
        btnNav.classList.add('contenedor__links--none');
    }
}

function ocultarSeccion(seccion) {
    if (seccion == menu || seccion == login) {
        seccion.classList.remove('container__from-up');
        seccion.classList.add('container__to-up');
        if (seccion == login) {
            setTimeout(() => {
                btnLogin.classList.remove('container__display--none');
            }, 700);
        }
        setTimeout(() => {
            seccion.classList.add('container__display--none');
        }, 700);
    } else if (seccion == nav) {
        seccion.classList.add('contenedor__right');
        seccion.classList.remove('contenedor__left');
        setTimeout(() => {
            seccion.classList.add('contenedor__links--none');
            btnNav.classList.remove('contenedor__links--none');
        }, 700);
    }
}

function ocultarMostrartabla(seccion) {
    seccion.classList.toggle('tabla__display');
}

const botonCerrar = () => {
    const btnCerrar = document.createElement('a');
    const overlay = document.createElement('div');
    overlay.classList.add('contenedor__links--cover');
    btnCerrar.classList.add('contenedor__boton', 'contenedor__boton--cerrar');
    btnCerrar.innerHTML = `<i class="bi bi-x-lg navegacion__hamburguesa navegacion__hamburguesa--cerrar"></i>`;

    nav.appendChild(btnCerrar);
    if (document.querySelectorAll('.contenedor__links--cover').length === 0) {
        articulo.appendChild(overlay);
    }

    const removeElements = () => {
        setTimeout(() => {
            if (btnCerrar.parentElement) nav.removeChild(btnCerrar);
            if (overlay.parentElement) articulo.removeChild(overlay);
            ocultarSeccion(nav);
        }, 100);
    };

    overlay.addEventListener('click', removeElements);
    btnCerrar.addEventListener('click', removeElements);
};

function botonVolver() {
    let button2 = document.createElement('button');
    button2.classList.add('boton__volver');
    button2.textContent = 'Volver';
    tablaAprobados.appendChild(button2);

    button2.addEventListener('click', () => {
        ocultarMostrartabla(tabla);
        ocultarMostrartabla(contenedorTabla);
        tablaAprobados.removeChild(button2);
    });

    return button2;
}

function moverBotonVolverAlFinal() {
    const botonVolver = document.querySelector('.boton__volver');
    if (botonVolver) {
        tablaAprobados.appendChild(botonVolver);
    }
}

/*..........*/
/*VARIABLES*/
/*..........*/

let botonMenu = document.querySelector('#show-menu'),
    menu = document.querySelector('#contain'),
    cerrarMenu = document.querySelector('.contenedor__navegacion'),
    btnLogin = document.querySelector('#btn-user'),
    login = document.querySelector('#log-in-container'),
    canelLogin = document.querySelector('#btn-cancel'),
    btnNav = document.querySelector('.contenedor__boton'),
    nav = document.querySelector('.contenedor__links'),
    articulo = document.querySelector('.contenedor'),
    botonesNav = document.querySelectorAll('.contenedor__link'),
    btnCerrar = document.querySelector('.contenedor__boton--cerrar'),
    overlay = document.querySelector('.contenedor__links--cover'),
    formulario = document.querySelector('.tabla__notas'),
    contenedorTabla = document.querySelector('.tabla__contenedor'),
    tablaAprobados = document.querySelector('.estudiante__tabla'),
    aprobadosContenedor = document.querySelector('.tabla__aprobados'),
    botonVer = document.querySelector('.boton__ver'),
    tabla = document.querySelector('.tabla__resultado');

let estudiantes = []
/*........*/
/*EVENTOS*/
/*........*/

botonMenu.addEventListener('click', () => ocultarSeccion(menu));
cerrarMenu.addEventListener('click', () => mostrarSeccion(menu));
btnLogin.addEventListener('click', () => mostrarSeccion(login));
canelLogin.addEventListener('click', () => ocultarSeccion(login));
btnNav.addEventListener('click', () => {
    mostrarSeccion(nav);
    botonCerrar();
});

botonesNav.forEach(btn => {
    btn.addEventListener('click', () => {
        const btnCerrar = document.querySelector('.contenedor__boton--cerrar');
        const overlay = document.querySelector('.contenedor__links--cover');
        setTimeout(() => {
            if (btnCerrar && nav.contains(btnCerrar)) nav.removeChild(btnCerrar);
            if (overlay && articulo.contains(overlay)) articulo.removeChild(overlay);
            ocultarSeccion(nav);
        }, 100);
    });
});


formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    ocultarMostrartabla(tabla);
    ocultarMostrartabla(contenedorTabla);
    if (!document.querySelector('.boton__volver')) {
        botonVolver();
    }

    const estudiante = document.querySelector('#estudiante').value;
    const cantNotas = parseInt(document.querySelector('#notas').value, 10);

    if (cantNotas > 10 || cantNotas < 7) {
        alert('ingrese maximo de 10 notas y un minimo de 7 notas');
        formulario.reset()
    } else {
        const estudianteExistente = estudiantes.find(est => est.nombre === estudiante);

        if (!estudianteExistente) {
            let nuevoEstudiante = { nombre: estudiante, notas: cantNotas };
            estudiantes.push(nuevoEstudiante);

            const divEstudiante = document.createElement('div');
            divEstudiante.classList.add('tabla__estudiante');
            divEstudiante.innerHTML = `
        <form class='form__notas'>
            <h3 class='tabla__titulo--estudiante'>${estudiante}</h3>
        </form>`;

            let tituloEstudiante = divEstudiante.querySelector('.tabla__titulo--estudiante');

            let formNotas = divEstudiante.querySelector('.form__notas');
            let button = document.createElement('button');
            button.type = 'submit';
            button.textContent = 'Enviar';

            const botonEliminar = document.createElement('button');
            botonEliminar.innerText = 'Eliminar'
            botonEliminar.addEventListener('click', () => {
                formNotas.remove()

                estudiantes = estudiantes.filter(est => est.nombre !== estudiante);

                tituloEstudiante.remove()

                botonEliminar.remove()

            })

            formNotas.append(button);
            formNotas.append(botonEliminar);

            for (let i = 1; i <= cantNotas; i++) {
                let label = document.createElement('label');
                label.classList.add('descripcion__nota');
                label.innerText = ` Nota ${i}`;
                let input = document.createElement('input');
                input.classList.add('nota__estudiante');
                input.type = 'number';
                input.name = `nota${i}`;

                formNotas.insertBefore(label, button);
                formNotas.insertBefore(input, button);
            }

            formNotas.addEventListener('submit', (e) => {
                e.preventDefault();
                const inputs = formNotas.querySelectorAll('.nota__estudiante');
                let suma = 0;
                let notaMayorADiez = false;

                inputs.forEach(input => {
                    let value = parseFloat(input.value) || 0;
                    suma += value;
                    if (value > 10 || value < 0) {
                        notaMayorADiez = true;
                    }
                });

                if (notaMayorADiez) {
                    alert('Ingrese un valor máximo de 10 para cada nota.');
                } else {
                    const contenedorTablas = document.createElement('section');
                    contenedorTablas.classList.add('tablas');
                    let tabla = document.createElement('table');
                    let cabecera = document.createElement('tr');
                    cabecera.innerHTML = `<th>Nota</th><th>Puntaje</th>`;
                    tabla.append(cabecera);

                    const nombreEstudiante = document.createElement('h4');
                    nombreEstudiante.classList.add('tabla__titulo--estudiante');
                    nombreEstudiante.innerText = estudiante;

                    let suma = 0;
                    let cantidadValida = 0;

                    contenedorTablas.append(nombreEstudiante);

                    inputs.forEach((input, index) => {
                        let value = parseFloat(input.value) || 0;
                        if (!isNaN(value)) { // Verifica si es un número válido
                            console.log(value);
                            suma += value;
                            cantidadValida++; // Incrementa el contador de valores válidos

                            let fila = document.createElement('tr');
                            let tdNota = document.createElement('td');
                            tdNota.innerText = `Nota ${index + 1}`;
                            fila.append(tdNota);

                            let tdValor = document.createElement('td');
                            tdValor.innerText = value;
                            fila.append(tdValor);

                            tabla.append(fila);
                        }
                    });

                    let promedioCant = 0; // Inicializa el promedio
                    if (cantidadValida > 0) { // Verifica si hay valores válidos
                        promedioCant = suma / cantidadValida; // Calcula el promedio
                        promedioCant = parseFloat(promedioCant.toFixed(2)); // Redondea el promedio a 2 decimales
                    }

                    console.log(promedioCant)


                    let filaPromedio = document.createElement('tr');
                    let promedio = document.createElement('td');
                    promedio.innerText = 'Promedio'
                    filaPromedio.append(promedio);

                    let promedioValor = document.createElement('td');
                    promedioValor.innerText = promedioCant
                    filaPromedio.append(promedioValor);
                    if (promedioCant <= 6) {
                        promedioValor.style.color = '#900';
                    } else if (promedioCant >= 7) {
                        promedioValor.style.color = '#690'
                        promedioValor = 10;
                    }
                    tabla.append(filaPromedio);


                    contenedorTablas.append(tabla);
                    tablaAprobados.append(contenedorTablas);

                    divEstudiante.remove();

                    let buttonCerrar = document.createElement('button');
                    buttonCerrar.innerText = '❌';
                    tabla.appendChild(buttonCerrar);
                    buttonCerrar.addEventListener('click', () => {
                        // Eliminar la tabla del DOM
                        tabla.remove();

                        // Eliminar el estudiante del array
                        estudiantes = estudiantes.filter(est => est.nombre !== estudiante);

                        // También eliminar el nombre del estudiante del DOM
                        nombreEstudiante.remove();

                        buttonCerrar.remove()

                    });
                    moverBotonVolverAlFinal();
                }
            });

            tabla.append(divEstudiante);


        } else {
            alert(`El estudiante ${estudiante} ya está en la lista`);
        }

        formulario.reset()
    }
}

);

botonVer.addEventListener('click', () => {
    ocultarMostrartabla(tabla);
    ocultarMostrartabla(contenedorTabla);
    botonVolver();
});


function pedir_nombre() {
    let nombre = prompt('Ingrese su nombre.').toLowerCase();
    let edad = Number(prompt('Ingrese su edad,'));
    const verificacion = /^[a-zA-Z]+$/;

    while (isNaN(edad) || edad === '' || (nombre === '' || !isNaN(nombre) || !verificacion.test(nombre))) {
        alert('Ingrese Datos correctos');
        nombre = prompt('Ingrese su nombre.').toLowerCase();
        edad = Number(prompt('Ingrese su edad,'));

    }

    return nombre;
}


function pedir_productos() {
    let productos = Number(prompt('Ingrese un Numero para ver la informacion del producto \n' +
        '1: Berry Acai\n' +
        '2: Penaut Acai\n' +
        '3: Protein Acai\n' +
        '4: Harper Acai\n' +
        '5: Flex Acai\n' +
        '6: Salir.'
    ));

    if (isNaN(productos) || productos < 1 || productos > 6) {
        alert('Solo admitimos números del 1 al 6, intente nuevamente');
        productos = Number(prompt('Ingrese un Numero para ver la informacion del producto \n' +
            '1: Berry Acai\n' +
            '2: Penaut Acai\n' +
            '3: Protein Acai\n' +
            '4: Harper Acai\n' +
            '5: Flex Acai\n' +
            '6: Salir.'
        ));
    }

    return productos;
}

function calculadora(num1, num2, operacion) {
    switch (operacion) {
        case 'suma':
        case '+':
            return num1 + num2;
        case 'resta':
        case '-':
            return num1 - num2;
        case 'multiplicacion':
        case '*':
            return num1 * num2;
        case 'division':
        case '/':
            if (num2 !== 0) {
                return num1 / num2;
            } else {
                return 'Error: División por cero';
            }
        default:
            return 'Operación no válida';
    }
}




    let confirmar = confirm('Te damos la bienvenida, ¿deseas continuar?');

    if (confirmar) {
        let nombre = pedir_nombre();

        alert('Gracias ' + nombre + ' Por interesarte en nuestro proyecto.');

        const PRODUCTOS = ['Berry Acai', 'Penaut Acai', 'Protein Acai', 'Harper Acai', 'Flex Acai'];

        while (true) {
            let opcion = pedir_productos();

            if (opcion === 1) {
                alert(nombre + ', El Bowl ' + PRODUCTOS[0] + ' Es una mezcla de frutos rojos Bastante refrescante.');
            } else if (opcion === 2) {
                alert(nombre + ', El Bowl ' + PRODUCTOS[1] + ' Es una mezcla de Acai con banana con unos toppins que combinan a la perfeccion.');
            } else if (opcion === 3) {
                alert(nombre + ', El Bowl ' + PRODUCTOS[2] + ' Es una mezcla parecida al ' + PRODUCTOS[0] + ' pero incluyendole proteina, que esperas para probarla?.');
            } else if (opcion === 4) {
                alert(nombre + ', El Bowl ' + PRODUCTOS[3] + ' Es una variedad de sabores que no te podes perder.');
            } else if (opcion === 5) {
                alert(nombre + ', El Bowl ' + PRODUCTOS[4] + ' Es el Acai mas puro y delicioso que vas a probar.');
            } else if (opcion === 6) {
                while (true) {
                    const JUEGO = confirm('Que pena, te esperamos en un futuro, te dejamos una calculadora por si la deseas usar');
        
                    if (JUEGO) {
                        let operacion = prompt('Ingrese la operación a realizar (+, -, *, / o suma, resta, multiplicacion, division)').toLowerCase();
                        let num1 = parseFloat(prompt("Introduce el primer número:"));
                        let num2 = parseFloat(prompt("Introduce el segundo número:"));
        
                        if (isNaN(num1) || isNaN(num2) || !['+', '-', '*', '/', 'suma', 'resta', 'multiplicacion', 'division'].includes(operacion)) {
                            alert('Ingrese datos correctos');
                        } else {
                            let resultado = calculadora(num1, num2, operacion);
                            alert("El resultado de la operación es: " + resultado);
                            break
                        }
                    } else {
                        alert('Que tengas un buen día');
                        break;
                    }
                }
                break;
            } else {
                alert('Ingresa un número válido por favor');
            }
        }
    } else {

        alert('Hasta Luego que tengas un buen dia');



    };




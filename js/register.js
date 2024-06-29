// Declaramos la variable del formulario de registro

const registerForm = document.querySelector('#register-form');
const btnCancel = document.querySelector('#btn-cancel-register');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.querySelector('#user').value;
    const mail = document.querySelector('#email-input').value;
    const pass = document.querySelector('#pass-input').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usuarioRegistrado = users.find(user => user.mail === mail);

    if (usuarioRegistrado) {
        return Swal.fire({
            position: "center",
            icon: "error",
            title: "El Usuario ya esta registrado",
            showConfirmButton: false,
            timer: 2000
        });
    } else {
        users.push({ nombre: nombre, mail: mail, pass: pass });
        localStorage.setItem('users', JSON.stringify(users));
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario Registrado con éxito",
            showConfirmButton: true,
        });

        mostrarFormularioLogin(); // Redirigir a la página de inicio de sesión
        registerForm.reset();
    }
});

btnCancel.addEventListener('click', () => {
    ocultarSeccion(login);
    setTimeout(() => {
        loginForm.classList.remove('form--display');
        registerForm.classList.add('form--display');
    });
});


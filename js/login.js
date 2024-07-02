registrate.addEventListener('click', () => {
    mostrarFormularioRegistro();
});


document.addEventListener('DOMContentLoaded', () => {
    loginUser = JSON.parse(localStorage.getItem('login-user'));
    if (loginUser) {
        widowUser.classList.remove('user__display');
        loginForm.classList.add('form--display');
        configurarBotonMenu();
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const mail = document.querySelector('#user-mail').value;
    const pass = document.querySelector('#pass').value;

    const usuarios = JSON.parse(localStorage.getItem('users')) || [];

    const usuarioValido = usuarios.find(usuario => usuario.mail === mail && usuario.pass === pass);

    if (!usuarioValido) {
        return Swal.fire({
            position: "center",
            icon: "error",
            title: "Usuario no registrado o datos incorrectos",
            showConfirmButton: false,
            timer: 2500
        });
    } else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: `Bienvenido ${usuarioValido.nombre}`,
            showConfirmButton: true,
        });

        localStorage.setItem('login-user', JSON.stringify(usuarioValido));
        loginUser = usuarioValido;

        widowUser.classList.remove('user__display');
        loginForm.classList.add('form--display');
        userName.innerHTML = `<span>Nombre:</span> ${usuarioValido.nombre}`
        configurarBotonMenu(); // Configura el comportamiento del botón del menú después de iniciar sesión

        loginForm.reset();
    }
});


userOut.addEventListener('click', () => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Has salido correctamente",
        showConfirmButton: false,
        timer: 1000
    });

    localStorage.removeItem('login-user');

    widowUser.classList.add('user__display');
    loginForm.classList.remove('form--display');
})

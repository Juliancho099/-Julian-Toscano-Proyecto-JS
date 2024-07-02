// Declaramos la variable del formulario de registro

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.querySelector('#user').value.trim();
    const mail = document.querySelector('#email-input').value;
    const pass = document.querySelector('#pass-input').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usuarioRegistrado = users.find(user => user.mail === mail);
    let mensajeError = document.querySelector('#rechazo-register');

    if (nombre === '' || !emailVerificacion.test(mail) || pass.length < 5) {
        

        mensajeError.classList.remove('user__display');

        setTimeout(()=>{
            mensajeError.classList.add('user__display');
        },1000)
    
    }else{

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
    }

    
});

btnCancel.addEventListener('click', () => {
    ocultarSeccion(login);
    setTimeout(() => {
        loginForm.classList.remove('form--display');
        registerForm.classList.add('form--display');
    });
});


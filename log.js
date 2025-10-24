
const firebaseConfig = {
apiKey: "AIzaSyBGITyECKZKF3OOQ5QlvgTQhlw7EuK99S4",
authDomain: "sets-6f1c9.firebaseapp.com",
projectId: "sets-6f1c9",
storageBucket: "sets-6f1c9.firebasestorage.app",
messagingSenderId: "908151246572",
appId: "1:908151246572:web:6f639ee756d2c720cf9fc9",
measurementId: "G-V0JJSC26K7"
};


firebase.initializeApp(firebaseConfig);

const database = firebase.database();

function register(){

        
    let names = document.getElementById("name").value.trim();
    let mail = document.getElementById("mail").value.trim();
    let pass = document.getElementById("pass").value;
    let confirmPass = document.getElementById("confirm-pass").value;

    if (pass !== confirmPass) {
        Swal.fire("Error", "Las contraseñas no coinciden", "error");
        return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (names === "") {
        Swal.fire("Error", "Por favor ingresa un nombre válido", "error");
        return;
    }
    if (!emailRegex.test(mail)) {
        Swal.fire("Error", "Por favor ingresa un correo electrónico válido", "error");
        return;
    }
    if (pass.length < 8) {
        Swal.fire("Error", "La contraseña debe tener al menos 6 caracteres", "error");
        return;
    }

    
    database.ref("Users/" + names).once("value").then(function(snapshot) {
        if (snapshot.exists()) {
            Swal.fire("Error", "El usuario ya existe. Por favor elige otro nombre.", "error");
        } else {
     
            database.ref("Users/" + names).set({
                nombre: names,
                correo: mail,
                contrasena: pass
            }).then(function() {
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro exitoso!',
                    showConfirmButton: false,
                    timer: 1200
                }).then(() => {
                    window.location.href = "log.html";
                });
            }).catch(function(error) {
                Swal.fire("Error", "No se pudo registrar el usuario", "error");
                console.error(error);
            });
        }
    }).catch(function(error) {
        Swal.fire("Error", "Ocurrió un error al verificar el usuario", "error");
        console.error(error);
    });
}



function iniciarSesion() {
    event.preventDefault();
    let names = document.getElementById("name").value;
    let mail = document.getElementById("mail").value;
    let pass = document.getElementById("pass").value;
    if (names === "" || mail === "" || pass === "") {
        Swal.fire("Error", "Por favor completa todos los campos", "error");
        return;
    }
    // Buscar usuario en la base de datos
    database.ref("Users/" + names).once("value").then(function(snapshot) {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            if (userData.correo === mail && userData.contrasena === pass) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Bienvenido!',
                    showConfirmButton: false,
                    timer: 1200
                }).then(() => {
                    window.location.href = "index.html";
                });
            } else {
                Swal.fire("Error", "Correo o contraseña incorrectos", "error");
            }
        } else {
            Swal.fire("Error", "Usuario no encontrado", "error");   
        }
    }).catch(function(error) {
        Swal.fire("Error", "Ocurrió un error al iniciar sesión", "error");
        console.error(error);
    });
}

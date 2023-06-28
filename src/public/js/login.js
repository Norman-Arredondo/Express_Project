//Variblaes 
const formulario = document.querySelector('#formulario');
const input_email = document.querySelector('#input_email');
const password = document.querySelector('#input_password');

let u_email = [];
let u_password = [];

//Event Listeners 
eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarDatos);

    //Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        //[] si no hay nada en localstorage se crea un arreglo vacío
        u_email = JSON.parse(localStorage.getItem('u_email')) || [];
        u_password = JSON.parse(localStorage.getItem('u_password')) || [];
        console.log(u_email);
    });

}


//Funciones
function agregarDatos(e) {
    e.preventDefault();

    //Label donde el usuario escribe
    const input_email = document.querySelector('#input_email').value;
    const input_password = document.querySelector('#input_password').value;


    //Validación
    if (input_email === '' || input_password === '') {
        mostrarError('Todos los campos son obligatorios');
        return;
    }

    //Añadir al arreglo la información de los input
    u_email = [...u_email, input_email];
    u_password = [...u_password, input_password];
    

    console.log('Se agregó el usuario y contraseña');

    //Funcion para guardar los datos en LocalStorage
    sincronizarStorage();

    //Limpiar formulario
    formulario.reset();

}

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Definir dónde va a salir el mensaje
    //Insertarlo
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 2000);
}

//Agrega los datos a LocalStorage
function sincronizarStorage() {
    localStorage.setItem('u_email', JSON.stringify(u_email));
    localStorage.setItem('u_password', JSON.stringify(u_password));
}




const login = async (e) => {
    try {
        const data = {
            user_email: "miguel@miguel.com",
            user_password: "123456"
        }
        const response = await fetch("http://localhost:3001/api/user/login/", {
            method: "POST",
            headers: {
                'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: new URLSearchParams(data)
        });

        const result = await response.json();
        console.log(result)

    } catch (error) {
        console.log(error)
    }
}

document.addEventListener("DOMContentLoaded", login);


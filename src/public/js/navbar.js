// Obtener el botón hamburguesa y el menú
const navbarBurger = document.querySelector('.navbar-burger');
const navbarMenu = document.getElementById('navbarMenu');

// Obtener el elemento del nav (Para mostrar el Nombre)
const user_session = document.getElementById("user_session");
// Obtener el elemento del nav (Para cerrar sesión)
const user_logout = document.getElementById("user_logout");

const showModal = () => {
    const modal = document.getElementById('myModal');
    modal.classList.add('is-active');
}

// Función para obtener el nombre del usuario en local Storage - Se guardó en la función del login (Controlador)
const localStorage_session = () => {
    // Obtener el objeto del usuario desde el localStorage
    const localStorage_name = localStorage.getItem("usuario");
    // Convertir la cadena del objeto a un objeto JavaScript
    const userObject = JSON.parse(localStorage_name);

    // Mostrar el nombre del usuario en el nav
    if (localStorage_name && userObject) {
        const userName = userObject.user_name;
        user_session.textContent = `${userName}`;

    } else {
        user_session.textContent = "Usuario";
    }
}

const end_session = async (e) => {
    try {

        // Realizar la solicitud POST al servidor para cerrar sesión
        const response = await fetch(`http://localhost:3001/api/user/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        });

        // Leer la respuesta del servidor
        const result = await response.json();
        console.log("result::::: ", result);

        // Eliminar la información de sesión del localStorage
        localStorage.removeItem("usuario");

        showModal();
        setTimeout(() => {
            // Redireccionar a la página de login
            window.location.replace("http://localhost:3001/login");
        }, 1000);



    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
};


document.addEventListener('DOMContentLoaded', () => {
    // Activar la funcionalidad del menú hamburguesa al hacer clic
    navbarBurger.addEventListener('click', () => {
        navbarBurger.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');
    });

    localStorage_session();
});

user_logout.addEventListener("click", end_session);
const user_name_input = document.querySelector('#user_name_input');
const user_email_input = document.querySelector('#user_email_input');
const user_password_input = document.querySelector('#user_password_input');

const editPasswordCheckbox = document.getElementById('edit_password_cb');//Checkbox para mostrar/ocultar contraseña
const password_field = document.getElementById('password_field'); //Div con los input contraseña, repetir contraseña y checkboxes


const show_password_cb = document.querySelector("#show_password_cb");
const show_password_cb2 = document.querySelector("#show_password_cb2");

const send_btn = document.getElementById("send_btn")
const id_input = document.querySelector("#id_input");



//Funciones con Arrow Funcions
const show_password = (e) => {
    //e.target.checked -> regresa true o false
    if (e.target.checked) {
        //Si el checkbox seleccionado es true
        user_password_input.setAttribute("type", "text"); //lo pasa a texto
    } else {
        user_password_input.setAttribute("type", "password");
    }
}

const show_repeat_password = (e) => {
    //e.target.checked -> regresa true o false
    if (e.target.checked) {
        //Si el checkbox seleccionado es true
        repeat_user_password_input.setAttribute("type", "text"); //lo pasa a texto
    } else {
        repeat_user_password_input.setAttribute("type", "password");
    }
}

const edit_password = (e) => {
    if (e.target.checked) {
        password_field.style.display = 'block';
       
    } else {
        password_field.style.display = 'none';
        
    }
}

const showModal = () => {
    const modal = document.getElementById('myModal');
    modal.classList.add('is-active');
}

const locationReplace = () => {
    window.location.replace("http://localhost:3001/users/dashboard");
}

const actualizar = async (e) => {
    
    e.preventDefault(); // Previene que se envíe el formulario de manera convencional

    const data = {};

    if(id_input.value !== '') {
        data.user_id = id_input.value
    }
    if(user_name_input.value.trim() !== '') {
        data.user_name = user_name_input.value
    }
    if(user_email_input.value.trim() !== '') {
        data.user_email = user_email_input.value
    }
    if(user_password_input.value.trim() !== '') {
        data.user_password = user_password_input.value
    }
    

    try {
        const response = await fetch(`http://localhost:3001/api/user/${id_input.value}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: new URLSearchParams(data),
        });

        const result = await response.json();
        console.log("result: ",result)

        const { mensaje } = result;

        if (mensaje === 'Usuario actualizado correctamente') {
            showModal();
        }
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
    }
};

editPasswordCheckbox.addEventListener('click', edit_password);

show_password_cb.addEventListener("click", show_password);
show_password_cb2.addEventListener("click", show_repeat_password);

send_btn.addEventListener("click", actualizar);
const show_password_cb = document.querySelector("#show_password_cb");
const show_password_cb2 = document.querySelector("#show_password_cb2");

const user_name_input = document.querySelector("#user_name_input");
const user_email_input = document.querySelector("#user_email_input");
const user_password_input = document.querySelector("#user_password_input");
const repeat_user_password_input = document.querySelector("#repeat_user_password_input");


const empty_inputs_message = document.querySelector("#empty_inputs_message");
const user_name_message = document.querySelector("#user_name_message");
const email_message = document.querySelector("#email_message");
const password_message = document.querySelector("#password_message");
const repeat_password_message = document.querySelector("#repeat_password_message");
const userCreated = document.querySelector('#userCreated');

const send_btn = document.querySelector("#send_btn");

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
/*
const mostrarError = (elemento, mensaje) => {
    elemento.classList.add("is-danger");
    mensaje.innerHTML = "El campo es obligatorio";
    mensaje.classList.add("has-text-weight-bold");
    setTimeout(() => {
        elemento.classList.remove("is-danger");
        mensaje.classList.remove("has-text-weight-bold");
    }, 1000);
};*/

const limpiar = () => {

    //Remover input en rojo
    user_name_input.classList.remove("is-danger");
    user_email_input.classList.remove("is-danger");
    user_password_input.classList.remove("is-danger");
    repeat_user_password_input.classList.remove("is-danger");

    // Remover mensaje
    empty_inputs_message.innerHTML = "";
    user_name_message.innerHTML = "";
    email_message.innerHTML = "";
    password_message.innerHTML = "";
    repeat_password_message.innerHTML = "";
}

const showModal = () => {
    const modal = document.getElementById('myModal');
    modal.classList.add('is-active');
}

const locationReplace =() => {
    window.location.replace("http://localhost:3001/users/users");
}

const enviar = async (e) => {
    try {
        e.preventDefault();
        limpiar();
        let camposVacios = false;

        if (user_name_input.value.trim() === "" ||
            user_email_input.value.trim() === "" ||
            user_password_input.value.trim() === "" ||
            repeat_user_password_input.value.trim() === ""
        ) {
            camposVacios = true;
        }

        const errores_array = [
            {
                field: 'user_name_input', // Nombre del campo
                inputText: user_name_input, //Valor del campo
                message_element: user_name_message, //Elemento donde se muestra el mensaje

            },
            {
                field: 'user_email_input',
                inputText: user_email_input,
                message_element: email_message,

            },
            {
                field: 'user_password_input',
                inputText: user_password_input,
                message_element: password_message,

            },
            {
                field: 'repeat_user_password_input',
                inputText: repeat_user_password_input,
                message_element: repeat_password_message,

            }

        ];

        //Validación para campos vacíos
        if (camposVacios) {

            errores_array.forEach(error => {
                if (error.field == 'user_name_input') {
                    if (user_name_input.value.trim() === "") {
                        // Código a ejecutar cuando user_name_input está vacío
                        user_name_message.innerHTML = "El campo nombre es obligatorio";
                        user_name_message.classList.add("has-text-weight-bold");
                        user_name_input.classList.add("is-danger");

                        setTimeout(() => {
                            user_name_message.classList.remove("has-text-weight-bold");
                        }, 1000);

                    } else {
                        //Remover input en rojo
                        user_name_input.classList.remove("is-danger");
                        // Remover mensaje
                        user_name_message.innerHTML = "";
                    }
                }

                if (error.field == 'user_email_input') {
                    if (user_email_input.value.trim() === "") {
                        // Código a ejecutar cuando user_email_input está vacío
                        email_message.innerHTML = "El campo email es obligatorio";
                        email_message.classList.add("has-text-weight-bold");

                        //Poner el input en rojo
                        user_email_input.classList.add("is-danger");

                        setTimeout(() => {
                            email_message.classList.remove("has-text-weight-bold");
                        }, 1000);

                    } else {
                        //Remover input en rojo
                        user_email_input.classList.remove("is-danger");
                        //Remover mensaje
                        email_message.innerHTML = "";
                    }
                }

                if (error.field == 'user_password_input') {
                    if (user_password_input.value.trim() === "") {
                        // Código a ejecutar cuando user_password_input está vacío
                        password_message.innerHTML = "El campo password es obligatorio";
                        password_message.classList.add("has-text-weight-bold");

                        //Poner el input en rojo
                        user_password_input.classList.add("is-danger");

                        setTimeout(() => {
                            password_message.classList.remove("has-text-weight-bold");
                        }, 1000);


                    } else {
                        //Remover input en rojo
                        user_password_input.classList.remove("is-danger");
                        //Remover mensaje
                        password_message.innerHTML = "";
                    }
                }

                if (error.field == 'repeat_user_password_input') {
                    if (repeat_user_password_input.value.trim() === "") {
                        // Código a ejecutar cuando repeat_user_password_input está vacío
                        repeat_password_message.innerHTML = "El campo password es obligatorio";
                        repeat_password_message.classList.add("has-text-weight-bold");

                        //Poner el input en rojo
                        repeat_user_password_input.classList.add("is-danger");

                        setTimeout(() => {
                            repeat_password_message.classList.remove("has-text-weight-bold");
                        }, 1000);

                    } else {
                        //Remover input en rojo
                        repeat_user_password_input.classList.remove("is-danger");
                        //Remover mensaje
                        repeat_password_message.innerHTML = "";
                    }
                }
            });
            return;
        }

        //Validamos que las contraseñas sean iguales
        if (user_password_input.value !== repeat_user_password_input.value) {
            // Código a ejecutar cuando las contraseñas no coinciden
            repeat_password_message.innerHTML = "Las contraseñas deben ser iguales";
            password_message.innerHTML = "Las contraseñas deben ser iguales";
            repeat_password_message.classList.add("has-text-weight-bold");
            password_message.classList.add("has-text-weight-bold");

            //Poner el input en rojo
            repeat_user_password_input.classList.add("is-danger");
            user_password_input.classList.add("is-danger");

            setTimeout(() => {
                repeat_password_message.classList.remove("has-text-weight-bold");
                password_message.classList.remove("has-text-weight-bold");

            }, 1000);
            return;

        } else {
            //Remover input en rojo
            repeat_user_password_input.classList.remove("is-danger");
            user_password_input.classList.remove("is-danger");
            //Remover mensaje
            repeat_password_message.innerHTML = '';
            password_message.innerHTML = ''
        }

        //Si pasa la validación
        const data = {
            user_name: user_name_input.value,
            user_email: user_email_input.value,
            user_password: user_password_input.value
        }

        const response = await fetch("http://localhost:3001/api/user/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: new URLSearchParams(data)
        })

        const result = await response.json();
        console.log("result: ", result)

        const { errores } = result;

        if (errores) {
            errores.forEach(err => {
                if (err.path == "user_email") {
                    email_message.innerHTML = err.msg;
                    email_message.classList.add("has-text-weight-bold");
                    email_message.classList.add("is-danger");

                    setTimeout(() => {
                        email_message.classList.remove("has-text-weight-bold");
                    }, 1000);
                    return;
                }

                if (err.path == "user_password") {
                    password_message.innerHTML = err.msg;
                    password_message.classList.add("has-text-weight-bold");
                    user_password_input.classList.add("is-danger");

                    setTimeout(() => {
                        password_message.classList.remove("has-text-weight-bold");
                    }, 1000);
                    return;
                }
            });

        } else {

            userCreated.innerHTML = user_name_input.value;
            showModal();
        }

    } catch (error) {
        console.log(error);
    }
}






//Events
show_password_cb.addEventListener("click", show_password);
show_password_cb2.addEventListener("click", show_repeat_password);
send_btn.addEventListener("click", enviar);

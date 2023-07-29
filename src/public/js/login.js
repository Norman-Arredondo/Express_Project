//Variables 

const password_input = document.querySelector("#password_input");
const email_input = document.querySelector("#email_input");
const show_password_cb = document.querySelector("#show_password_cb");
const send_btn = document.querySelector("#send_btn");
const mensaje_password = document.querySelector("#mensaje_password");
const mensaje_correo = document.querySelector("#mensaje_correo");
const iconExclamation = document.querySelector("#iconExclamation");
const iconGood = document.querySelector("#iconGood");


//Funciones con Arrow Funcions
const show_password = (e) => {
    //e.target.checked -> regresa true o false
    if(e.target.checked){
        //Si el checkbox seleccionado es true
        password_input.setAttribute("type", "text"); //lo pasa a texto
    }else {
        password_input.setAttribute("type", "password");
    }
} 

const enviar = async(e) => {
    try {
        e.preventDefault();

        //Validar los campos de email y password al mismo tiempo
        if(
            email_input.value.trim() === "" || password_input.value.trim() === ""
            ){
            mensaje_password.innerText = "Los campos son obligatorios"
            //Poner el input en negritas
            mensaje_password.classList.add("has-text-weight-bold")
            email_input.classList.add("is-danger");
            setTimeout(() => {
                mensaje_password.classList.remove("has-text-weight-bold")
            }, 1000);
            return; //Para que no se ejecute lo demás si no pasa
        }

        //Si pasa la validación
        const data = {
            user_email: email_input.value,
            user_password: password_input.value
        }

        //Comunicamos a la vista con el API
        const response = await fetch("http://localhost:3001/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: new URLSearchParams(data)
        });

        const result = await response.json();
        console.log('result',result)

        const {error, errores, token} = result; //usuario no registrado y contraseña
        
        if(errores){
            errores.forEach(err =>{
                if(err.path === "user_email"){
                    mensaje_correo.innerText = err.msg
                    //Poner el input en negritas
                    mensaje_correo.classList.add("has-text-weight-bold");
                    email_input.classList.add("is-danger");
                    setTimeout(() => {
                        mensaje_correo.classList.remove("has-text-weight-bold");
                        email_input.classList.remove("is-danger");
                    }, 1000);
                    return; //Para que no se ejecute lo demás si no pasa
                }

                if(err.path === "user_password"){
                    mensaje_password.innerHTML = err.msg;
                    mensaje_password.classList.add("has-text-weight-bold");
                    password_input.classList.add("is-danger");
                    console.log("user_password")
                    
                    setTimeout(() => {
                        mensaje_password.classList.remove("has-text-weight-bold");
                        password_input.classList.remove("is-danger");
                    }, 1000);
                    return;
                }
            });
        }
        if(error){
            mensaje_password.innerText = error;
            mensaje_password.classList.add("has-text-weight-bold")
            password_input.classList.add("is-danger");
            setTimeout(() => {
                mensaje_password.classList.remove("has-text-weight-bold")
                password_input.classList.remove("is-danger");
            }, 1000);
            return;
        }else{
            mensaje_password.innerText = "";

            if(token){
                email_input.classList.add("is-success");
                password_input.classList.add("is-success");

                localStorage.setItem("usuario",JSON.stringify(result));
                setTimeout(() => {
                    // alert("usuario logueado")
                    window.location.replace("http://localhost:3001/");
                }, 1000);
            }
        }

    } catch(error) {
        console.log(error)
    }
}

//Events
show_password_cb.addEventListener("click", show_password);
send_btn.addEventListener("click", enviar);
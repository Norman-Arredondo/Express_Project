//Variables 

const password_input = document.querySelector("#password_input");
const repetir_password_input = document.querySelector("#repetir_password_input");
const email_input = document.querySelector("#email_input");
const show_password_cb = document.querySelector("#show_password_cb");
const show_password_cb2 = document.querySelector("#show_password_cb2");
const send_btn = document.querySelector("#send_btn");
const mensaje_password = document.querySelector("#mensaje_password");
const mensaje_password2 = document.querySelector("#mensaje_password2");
const mensaje_correo = document.querySelector("#mensaje_correo");
//const iconExclamation = document.querySelector("#iconExclamation");
//const iconGood = document.querySelector("#iconGood");


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

//Funciones con Arrow Funcions
const show_repetir_password = (e) => {
    //e.target.checked -> regresa true o false
    if(e.target.checked){
        //Si el checkbox seleccionado es true
        repetir_password_input.setAttribute("type", "text"); //lo pasa a texto
    }else {
        repetir_password_input.setAttribute("type", "password");
    }
} 


//Events
show_password_cb.addEventListener("click", show_password);
show_password_cb2.addEventListener("click", show_repetir_password);
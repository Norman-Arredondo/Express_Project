const tabla = document.querySelector('#lista-usuarios');

let usuarios = JSON.parse(localStorage.getItem('u_email'));
let passwords = JSON.parse(localStorage.getItem('u_password'));


insertarHTML();

//Funciones
function insertarHTML() {
    if (usuarios && passwords != null) {
        //for loop
    for(let i=0; i<usuarios.length && passwords.length; i++){
        const a = document.createElement('a');
        a.classList.add('panel-block');
        a.classList.add('is-active');
        a.classList.add('ml-2');
        a.idList
        

        // Agregar un btn de eliminar 
        const btnEliminar = document.createElement('button');
        btnEliminar.classList = 'button is-small is-responsive is-danger is-outlined ml-6';
        btnEliminar.textContent = 'X'; // Puede ser .innerText
        btnEliminar.settAtrribute
        
 
        // función eliminar 
        btnEliminar.onclick= () => {
            borrarDatos();
        }
        // añadir Texto
        a.innerText = 'Usuario:' + ' ' + usuarios[i].usuario + '  '+'Contraseña:'+ ' '+ passwords[i].contrasena;
            
        // insertar en el html.
        tabla.appendChild(a); // no limpia el código previo

        //Asignar el botón de borrar
        a.appendChild(btnEliminar);
        }
    }
}

//Elimina los datos 
function borrarDatos(){
    
}
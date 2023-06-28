        //Variblaes 
        const formulario = document.querySelector('#formulario');
        const input_email = document.querySelector('#input_email');
        const password = document.querySelector('#input_password');

        let u_email = [];
        let u_password = [];


        //Event Listeners 
        eventListeners()

        function eventListeners() {
            formulario.addEventListener('submit', agregarDatos);
            

        }


        //Funciones
        function agregarDatos(e) {
            e.preventDefault();

            //Label donde el usuario escribe
            const email = document.querySelector('#input_email').value;
            const password = document.querySelector('#input_password').value;
           // const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            //Validación
            if(email === '' || password==='' ) {
                
                mostrarError('Todos los campos son obligatorios');

                return;
            }

            //Añadir al arreglo
            u_email = [...u_email, email];
            u_password = [...u_password, password];
            console.log(u_email);
            console.log(u_password);
            console.log('Agregando datos')
            
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

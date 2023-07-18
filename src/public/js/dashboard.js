function searchUsers() {
    const searchTerm = document.getElementById('searchTerm').value;

    fetch('/users/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm }),
    })
        .then(response => response.json())
        .then(data => {
            // Actualizar la tabla con los usuarios encontrados
            const div = document.querySelector('#lista-usuarios');
            div.innerHTML = '';
            //const tbody = document.querySelector('tbody');
            //tbody.innerHTML = '';

            data.users.forEach(user => {
                const row = document.createElement('div');
                row.classList = 'panel-block';
                const columid = document.createElement('p');
                columid.classList = 'control px-2';
                const columname = document.createElement('p');
                columname.classList = 'control px-2';
                const columemail = document.createElement('p');
                columemail.classList = 'control px-2';
                const columbtn = document.createElement('p');
                columbtn.classList = 'control px-2';

                const buttonEdit = document.createElement('button');
                buttonEdit.classList = 'button is-small is-responsive is-warning is-outlined fas fa-pencil-alt';
                const buttonDelete = document.createElement('button');
                buttonDelete.classList = 'button is-small is-responsive is-danger is-outlined fas fa-trash-alt';

                columid.textContent = user.user_id;
                columname.textContent = user.user_name;
                columemail.textContent = user.user_email;

                columbtn.appendChild(buttonEdit);
                columbtn.appendChild(buttonDelete);

                row.appendChild(columid);
                row.appendChild(columname);
                row.appendChild(columemail);
                
                row.appendChild(columbtn)
                div.appendChild(row);

            });
            /*
            data.users.forEach(user => {
                const row = document.createElement('tr');
                const emailCell = document.createElement('td');
                emailCell.textContent = user.user_email;
                row.appendChild(emailCell);
                tbody.appendChild(row);
            });*/
        })
        .catch(error => console.error(error));
}
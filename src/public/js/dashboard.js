const searchTermInput = document.getElementById('searchTerm');
const listaUsuarios = document.getElementById('lista-usuarios');

const searchUsers = async () => {
  const searchTerm = searchTermInput.value;

  const data = {
    buscador: searchTerm
  };

  try {
    const response = await fetch(`http://localhost:3001/api/user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Error al realizar la búsqueda');
    }

    const responseData = await response.json();
    const users = responseData.users;

    // Actualizar la tabla con los usuarios filtrados
    listaUsuarios.innerHTML = '';

    users.forEach(user => {
      listaUsuarios.innerHTML += `
        <div class="panel-block">
          <p class="control px-2">
            ${user.user_id}
          </p>
          <p class="control px-2">
            ${user.user_name}
          </p>
          <p class="control px-2">
            ${user.user_email}
          </p>
          <p class="control px-2">
            <a class="button is-small is-responsive is-warning is-outlined fas fa-pencil-alt" href=""></a>
            <a class="button is-small is-responsive is-danger is-outlined fas fa-trash-alt" href="/users/delete/${user.user_id}"></a>
          </p>
        </div>
      `;
    });
  } catch (error) {
    console.error(error);
    alert('Error al realizar la búsqueda');
  }
};

// Asignar la función searchUsers al evento click del botón de búsqueda
document.getElementById('searchButton').addEventListener('click', searchUsers);
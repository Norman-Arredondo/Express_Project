const send_btn = document.getElementById("send_btn")
const id_input = document.querySelector("#id_input");


const showModal = () => {
    const modal = document.getElementById('myModal');
    modal.classList.add('is-active');
}

const locationReplace = () => {
    window.location.replace("http://localhost:3001/users/users");
}

const eliminar = async (e) => {
    const response = await fetch(`http://localhost:3001/api/user/${id_input.value}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    })

    const result = await response.json();
    console.log("result: ", result)


    const { respuesta } = result;

    if (respuesta) {
        showModal();
    }


}


send_btn.addEventListener("click", eliminar)
import { getPeople, createPeople, deletePeople } from "../services/peopleService.js";

//Referenicas al TBODY
const tablasPersonas = document.getElementById("tablaPersonas");

//Referencias a elemenots de la pagina
const frmPeople = document.getElementById("formPeople");
const txtName = document.getElementById("txtName");
const txtEmail = document.getElementById("txtEmail");
const txtNumber = document.getElementById("txtNumber");
const btnGuardar = document.getElementById("btnGuardar");


//Funcion para mostrar a las peronas en la tablas
async function mostrarPersonas(){
    try{
        const personas = await getPeople();//Metodo que llama a la API y trae e JSON
        
        tablasPersonas.innerHTML = "";//Vaciamos la tabla

        personas.forEach((persona)=>{
            tablasPersonas.innerHTML += `
                <tr>
                    <td>${persona.id}</td>
                    <td>${persona.name}</td>
                    <td>${persona.email}</td>
                    <td>${persona.phone}</td>
                    <td>
                        <button class="btn btn-danger" onclick="borrarPersona(${persona.id})">🗑️</button>
                        <button class="btn btn-warning">🖊️</button>
                    </td>
                 </tr>
            `;
        } 
    );
    }
    catch(error){
        alert("No se pudieron cargar las persoas: " + error);
    }
}

//EventListener para dectetar si toda la pagina ya cargo
document.addEventListener("DOMContentLoaded", async function(){
    await mostrarPersonas()
}
);

//Funcion para agregar un nuevo registro 
frmPeople.addEventListener("submit", async function(e){
    e.preventDefault();//Evta quue el formulario se envie

    const name = txtName.value.trim();
    const email = txtEmail.value.trim();
    const phone = txtNumber.value.trim();

    if(name == "" || email == "" || phone == ""){
        alert("Debes llenar todos los campos");
        return; //Para evitar el envio de los datos
    }

    //Objeto que se enviara a la API
    const perona = {
        name: name,
        email: email,
        phone: phone
    }

    try{
        await createPeople(perona);//Se envia el objecto al Service para ir a la API
        alert("La persona a sido creada");
    }
    catch(error){
        alert("No se pudo guardara la persona: " + error);
    }

    //Recargar la list con el nuevo registro
    await mostrarPersonas();

    limpiarFormulario();
}
);

function limpiarFormulario(){
    frmPeople.reset();//Borra los valores de los campos
}

//Funcion para borrar a una persona
async function borrarPersona(id){
    const confirmar = confirm("¿Desea eliminar a esta persona?");

    if(!confirmar){
        return;//Si la persona cancela,entocees detenemos la eliminar
    }

    try{
        await deletePeople(id);//1
        alert("Se ha eliminado a la persona existosamente");//2
        limpiarFormulario();//3
        await mostrarPersonas();//4
    }
    catch(error){
        alert("No se pudo eliminar a la persona");
    }
}

window.borrarPersona = borrarPersona;
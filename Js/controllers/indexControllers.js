import { getPeople, createPeople, deletePeople, getPeson, updatePerson } from "../services/peopleService.js";

//Referenicas al TBODY
const tablasPersonas = document.getElementById("tablaPersonas");

//Referencias a elemenots de la pagina
const frmPeople = document.getElementById("formPeople");
const txtName = document.getElementById("txtName");
const txtEmail = document.getElementById("txtEmail");
const txtNumber = document.getElementById("txtNumber");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");

const idPerson = document.getElementById("idPerson");//Campo Hidden



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
                        <button class="btn btn-warning" onclick = "colocarDatosFormulario(${persona.id})">🖊️</button>
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

    const id = idPerson.value.trim();//<----
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
        //Si el ID no esta vacio, estamoss editando
        if(id != ""){
            await updatePerson(id,perona);
            alert("La persona se ha actualizado correctamente")
        }
        //Si el ID esta vacio
        else{
            await createPeople(perona);//Se envia el objecto al Service para ir a la API
            alert("La persona a sido creada");
        }

        //Resetear el formulario con 
        limpiarFormulario();
        //Recagar la listas
        await mostrarPersonas();
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

    idPerson.value = "";//Vaciamos el ID para evitar errores
    btnGuardar.textContent ="Guardar Persona";//Restauramos boton de guardar
    btnCancelar.classList.add("d-none");
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

//Funcion para cargar los datos de la persona en ele formulario y editar
async function colocarDatosFormulario(id){

    try{
        const persona = await getPeson(id);//Traemos los datos de la persona

        //Colocamos los valores que vienen en el JSON dentro de los campos
        idPerson.value = persona.id;
        txtName.value = persona.name;
        txtEmail.value = persona.email;
        txtNumber.value = persona.phone;
        
        btnGuardar.textContent = "Actualizar persona"; //Se cambia el texto temporalmete
        btnCancelar.classList.remove("d-none");//El boton cancelar aparece
    }
    catch(error){
        alert("Error al cargar los datos de la perosna " + error);
        console.error(error);
    }
}

//Enlazar el boton de cancelar con limpiarFormulario
btnCancelar.addEventListener("click", limpiarFormulario);

window.borrarPersona = borrarPersona;
window.colocarDatosFormulario = colocarDatosFormulario;
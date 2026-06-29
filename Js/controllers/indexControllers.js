import { getPeople } from "../services/peopleService.js";

//Referenicas al TBODY
const tablasPersonas = document.getElementById("tablaPersonas");

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
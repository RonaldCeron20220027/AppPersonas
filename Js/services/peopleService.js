//Una constante donde Almacenamos una URL del EndPoint
const API_URL = "https://retoolapi.dev/xRg4zj/people";

//Fuction para obteer daos por GET 
export async function getPeople(){
    try{
        //Llamado a la API
        const repuesta = await fetch(API_URL);//GET por defecto

        //Validamos si hubo error en la llamada a la API
        if(!repuesta.ok){
            throw new Error("Error al obtenre personas");
        }

        const personas = await repuesta.json();//Convertimos a JSON

        return personas;//Enviamos el JSON al controller
    }
    catch(error){
        console.error("Error al cargar las personas");
        throw error;//Propagar la ecepcion al siguiente try-catch
    }
}

export async function createPeople(persona){
    try{
        const repuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(persona)
        });

        if(!repuesta.ok){
            throw new Error("Error al crea la persona")
        }

        const nuevaPersona = await repuesta.json();

        return nuevaPersona;//Retornamos los datos de la persona creada
    }
    catch(error){
        console.error("Error al crear persona: " + error);
        throw error;
    }
}

export async function deletePeople(id){
    try{
        const repuesta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        if(!repuesta.ok){
            throw new Error("Error al eliminar la persona");
        }
        return true; //Avisamos al controller que si se elimino
    }
    catch(error){
        console.error("Error al eliminar a la persona: " + error)
        throw error;
    }
}

export async function getPeson(id){
    try{
        //Llamado a la API
        const repuesta = await fetch(`${API_URL}/${id}`);
        //GET por defecto

        //Validamos si hubo error en la llamada a la API
        if(!repuesta.ok){
            throw new Error("Error al obtenre a la personas");
        }

        const personas = await repuesta.json();//Convertimos a JSON

        return personas;//Enviamos el JSON al controller
    }
    catch(error){
        console.error("Error al cargar a la persona");
        throw error;//Propagar la ecepcion al siguiente try-catch
    }
}

export async function updatePerson(id,perona){
    try{
        const repuesta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers : {
                "Content-Type" : "application/json"
            } ,
            body : JSON.stringify(perona)
        });

        if(!repuesta.ok){
            throw new Error("Error al actualizar a la persona " + repuesta.statusText);
        }

        const personaActulizada = await repuesta.json();
        return personaActulizada;//Retornar la persona actualizada al controller
    }
    catch(error){
        console.error(error);
    }
}
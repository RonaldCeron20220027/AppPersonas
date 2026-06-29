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
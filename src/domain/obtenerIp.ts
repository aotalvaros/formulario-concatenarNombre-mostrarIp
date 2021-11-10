
export const obtenerIp = async() => {
    try {
        const respuesta = await fetch("https://api.ipify.org/?format=json");
        const datos = await respuesta.json();
        const ip = datos.ip;
        return ip       
    } catch (error) {
        return 'Error de conexion'
    };
                          
};
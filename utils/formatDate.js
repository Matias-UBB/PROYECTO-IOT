import format from "date-fns";

export const formatDate = (date) => {
    const anio = date.getFullYear();
    const mes = date.getMonth() + 1;
    const dia = date.getDate();
    const hora = date.getHours();
    const minutos = date.getMinutes();
    const segundos = date.getSeconds();
    const fecha = `${anio}/${mes}/${dia} ${hora}:${minutos}:${segundos}`;
    return fecha;
}
   

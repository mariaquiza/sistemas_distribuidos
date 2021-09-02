const Equipo = require('../models/equipo');


exports.agregarJugador= async (request, response, next)=>{
    const equipo = await Equipo.findOne({where:{url:request.params.url}});

    //console.log(proyecto);
    //console.log(request.body);

    const {nombre,apellido,tipodocumento,numeroidentificacion,telefono,email} = request.body;

    const estado = 0;

    const equipoId = equipo.id;

    //Insertar
    const resultado = await Jugador.create({
        nombre:nombre, 
        apellido:apellido,
        tipodocumento:tipodocumento,
        numeroidentificacion:numeroidentificacion,
        telefono:telefono,
        email:email,
        estado, 
        equipoId});

    if(!resultado){
        return next();
    }

    response.redirect(`/equipos/${request.params.url}`);
}

exports.cambiarEstadoJugador = async (request, response)=>{
   //Viene del click frontend
    const { id }= request.params;
    //viene de la base de datos
    const jugador = await Jugador.findOne({where:{id}});

    let estado =0;
    if(jugador.estado === estado){
        estado =1;
    }
    jugador.estado = estado;

    const resultado = await jugador.save();

    if(!resultado) return next();

    response.status(200).send('Actualizado');

    
}

exports.eliminarJugador = async (request, response)=>{
    //console.log(request.query);
    const { id }= request.params;
    const resultado= await Jugador.destroy({where:{id}});

    if(!resultado) return next();

    response.status(200).send('Jugador Eliminado Correctamente!');

}
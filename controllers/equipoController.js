const { request } = require('express');
const Equipo = require('../models/equipo');
const slug = require('slug');


exports.FedssportHome = (request, response)=>{
    response.render('index',{nombrePagina:'FedsSport'});
}
 
exports.Inicio = async(request, response)=>{
    
    const usuarioId = response.locals.usuarios.id;
    const equipo = await Equipo.findAll({where:{usuarioId}});
 
     response.render('menu',{
         nombrePagina:'Inicio',
         equipo
     
     });
 }

 exports.equipo = async(request, response)=>{

    const usuarioId = response.locals.usuarios.id;
    const equipo = await Equipo.findAll({where:{usuarioId}});
 
     response.render('FrmEquipo',{
         nombrePagina:'Registrar Equipo',
         equipo
     
     });
}
exports.InsertarFrmEquipo = async (request, response)=>{
    console.log(request.body);
    
 
    const {nombre,tipotorneo,tipoequipo} = request.body;
 
    let errores = [];
 
    if(!nombre){
       errores.push({'texto':'Agrega Nombre'})
    }
   if(!tipotorneo){
    errores.push({'texto':'Agrega tipo de torneo'})
   }
   if(!tipoequipo){
    errores.push({'texto':'Agrega Numero Identificacion'})
   }
   if(errores.length>0){
    response.render('FrmEquipo',{
        nombrePagina:'Registro equipo',
        errores
    })
  }else{
    console.log(slug(nombre).toLocaleLowerCase());
    
    const usuarioId = response.locals.usuarios.id;

    const equipo = await Equipo.create({
        nombre: nombre,
        tipotorneo: tipotorneo,
        tipoequipo: tipoequipo,
        usuarioId,
  }).catch(e =>{ console.error(e) });
     response.redirect('/menu');
  }
 }
 exports.EquipoporUrl= async (request, response, next)=>{

    const usuarioId = response.locals.usuarios.id;
    const equiposPromise = Equipo.findAll({where:{usuarioId}});

      const equipoPromise = Equipo.findOne(
       {
           where:{
               url:request.params.url
           }
       }
   );

   const[equipos, equipo] = await Promise.all([equiposPromise,equipoPromise]);

   //Buscar Jugador 
   const jugador = await Jugador.findAll({
    where:{
        equipoId : equipo.id
    },
    include: [{ model: Equipo}]
});

   if(!equipo) return next();

  // console.log('Listo');

   //response.send(proyecto);

   response.render('TareasEquipo', {
       nombrePagina: 'Tareas Del equipo',
       equipos, //findOne -url
       equipo, // findAll
       jugador
   })

}
exports.FrmEditarEquipo = async(request, response)=>{
    const usuarioId = response.locals.usuarios.id;
    const equiposPromise = Equipo.findAll({where:{usuarioId}});
 
    const equipoPromise = Equipo.findOne(
        {
            where:{
                id:request.params.id
            }
        }
    );
 
    const[equipos, equipo] = await Promise.all([equiposPromise,equipoPromise]);
 
    response.render('FrmEquipo',{
        nombrePagina:'Editar Equipo',
        equipos,
        equipo
    })
 
 }
 exports.EditarEquipo = async (request, response)=>{
    console.log(request.body);
 
    const {nombre,tipotorneo,tipoequipo} = request.body;
 
    let errores = [];
 
    if(!nombre){
        errores.push({'texto':'Agrega Nombre'})
     }
    if(!tipotorneo){
     errores.push({'texto':'Agrega tipo de torneo'})
    }
    if(!tipoequipo){
     errores.push({'texto':'Agrega Numero Identificacion'})
    }
   if(errores.length>0){
    response.render('FrmEquipo',{
        nombrePagina:'Editar Equipo',
        errores
    })
  }else{
 console.log(slug(nombre).toLocaleLowerCase());
  await Equipo.update({
    nombre: nombre,
    tipotorneo: tipotorneo,
    tipoequipo: tipoequipo,
  },{
    where:{id:request.params.id}
  }).catch(e =>{ console.error(e) });
     response.redirect('/menu');
  }
 }
 exports.eliminarEquipo = async(request, response, next)=>{

    const {urlEquipo} = request.query;

    const resultado = await Equipo.destroy({where:{url:urlEquipo}});

    if(!resultado){
        return next();
    }

    response.status(200).send('Equipo Eliminado Correctamente!');

}

 
const { json } = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '5681',
    database: 'transportes',
    port: '5432'
});

const getCamioneroByrutaID = async (req, res) => {
  const idRuta = req.params.id;
  console.log(idRuta);
  try {
      const nombreCamionero = await pool.query('SELECT camioneros.nombre FROM camioneros JOIN camiones ON camioneros.id = camiones.camionero_id JOIN rutas ON camiones.id = rutas.camion_id WHERE rutas.id = $1', [idRuta]);
      if (nombreCamionero.rowCount > 0) {
          console.log(nombreCamionero.rows);
          res.json(nombreCamionero.rows);
      } else {
          console.log('No existe ruta asociada a este ID')
          res.json({
              message: 'No existe ruta asociada a este ID'
          });
      }
  } catch (error) {
      console.log(error);
  }
};

const createAyudantes = async (req, res) =>{
  const { nombre, apellido, rut, rut_dv, nacimiento } = req.body;
    try{
      const ayudante = await pool.query('SELECT ayudantes.rut, ayudantes.rut_dv  FROM ayudantes WHERE ayudantes.rut = $1 AND ayudantes.rut_dv = $2', [rut, rut_dv]);
      if(ayudante.rowCount !== 1){
        const response = await pool.query('INSERT INTO ayudantes (nombre, apellido, rut, rut_dv, nacimiento) VALUES($1, $2, $3, $4, $5)', [nombre, apellido, rut, rut_dv, nacimiento]);
        console.log('ayudante creado correctamente');
        res.json({
          message: 'Ayudante creado correctamente',
          body: {
            ayudantebody: {nombre, apellido, rut, rut_dv, nacimiento}
          }
        })
      }else{
        console.log('ayudante ya existe');
        res.json({message:'ayudante ya existe'});
      }
    }
   catch(error){
    console.log(error)
   }
};

const updateCliente = async (req, res) => {
  const {nombre_cliente, calle, dr_num, comuna_id } = req.body;
  const id = req.params.id;
  try {
      const clienteExistente = await pool.query('SELECT clientes.nombre_cliente, clientes.calle, clientes.dr_num, clientes.comuna_id FROM clientes WHERE nombre_cliente = $1 AND calle = $2 AND dr_num = $3 AND comuna_id = $4', [nombre_cliente, calle, dr_num, comuna_id]);
      if (clienteExistente.rowCount === 0) {
          if (id !== req.params.id ) {
              console.log("No existe ningún cliente con este ID");
              res.json({ message: 'No existe ningún cliente con este ID' });
              return;
          }
          const clienteNuevo = await pool.query('UPDATE clientes SET nombre_cliente = $1, calle = $2, dr_num = $3, comuna_id = $4 WHERE id = $5', [nombre_cliente, calle, dr_num, comuna_id,id]);
          console.log('Cliente actualizado correctamente');
          res.json({
              message: 'Cliente actualizado correctamente',
              body: {
                  clienteBody: { id, nombre_cliente, calle, dr_num, comuna_id }
              }
          });
      } else {
          console.log('Ya existe un cliente con estos datos');
          res.json({ message: 'Ya existe un cliente con estos datos' });
      }
  } catch (error) {
      console.log(error);
  }
};

const delCamiones = async (req, res) =>{
  const { patente } = req.body;
  try{
    const camionExiste = await pool.query('SELECT camiones.patente FROM camiones WHERE camiones.patente = $1', [patente]);
      if(camionExiste.rowCount === 1){
        const del = await pool.query('DELETE FROM camiones WHERE patente = $1',[patente]);
        if (del.rowCount > 0) {
          console.log(`Camión con patente ${patente} borrado exitosamente`);
          res.json({ message: `Camión con patente ${patente} borrado exitosamente` });
        } else {
          console.log(`No existe ningun camion con patente ${patente}`);
          res.json({ message: `No existe ningun camion con patente ${patente}` });
        }
      }else{
        console.log('No existe ningun camion con esta patente');
          res.json({ message: 'No existe ningun camion con esta patente' });
    }
  }
  catch(error){
    console.log(error);
  }
};

const comProveedor = async (req, res) => {
  const id = req.params.id;
  try{
    const nomComuna = await pool.query('SELECT comunas.nombre_comuna FROM comunas JOIN proveedores ON comunas.id = proveedores.comuna_id where proveedores.id = $1', [id]);
    if (nomComuna.rowCount > 0) {
      console.log(nomComuna.rows);
      res.json(nomComuna.rows);
    } else {
      console.log('No existe un proovedor con ese ID')
      res.json({
          message: 'No existe un proovedor con ese ID'
      });
    }
  }
  catch(error){
    console.log(error)
  }
};


const getCamiones = async (req, res) => {
  const idcamion = req.params.id;
  try{
    const Cam = await pool.query('SELECT camiones.patente, camiones.modelo, camiones.capacidad_kg, camiones.kilometraje, camiones.gps, camioneros.nombre AS camionero_nombre, camioneros.apellido AS camionero_apellido, ayudantes.nombre AS ayudante_nombre, ayudantes.apellido AS ayudante_apellido FROM camiones JOIN camioneros ON camiones.camionero_id = camioneros.id JOIN ayudantes ON ayudantes.id = camiones.ayudante_id WHERE camiones.id = $1', [idcamion]);
    if(Cam.rowCount > 0){
      console.log(Cam.rows);
      res.json(Cam.rows);
    }else{
      console.log('No existe un camión con ese ID');
      res.json({
        message: 'No existe un camión con ese ID'
      });
    }
  }
  catch(error){
    console.log(error);
  }
};

const createRuta = async (req, res) => {
  const { camion_id, proveedores_id, cliente_id, estado_ruta, fecha_salida } = req.body;
  try{
    const proveedor = await pool.query('SELECT id, nombre_empresa FROM proveedores WHERE id = $1', [proveedores_id]);
    const cliente = await pool.query('SELECT id, nombre_cliente FROM clientes WHERE id = $1', [cliente_id]);
    if(proveedor.rowCount > 0 && cliente.rowCount > 0){
      const response = await pool.query('INSERT INTO rutas (camion_id, proveedores_id, cliente_id, estado_ruta, fecha_salida) VALUES($1, $2, $3, $4, $5)', [camion_id, proveedores_id, cliente_id, estado_ruta, fecha_salida]);
      console.log('Ruta creada correctamente');
      res.json({
        message: 'Ruta creada correctamente',
        body: {
          rutabody: {camion_id, proveedores_id, cliente_id, estado_ruta, fecha_salida}
        }
      })
    }else{
      console.log('Datos mal ingresados');
      res.json({ message: 'Datos mal ingresados' });
    }
  }
  catch(error){
    console.log(error);
  }
};

const createCamionero = async (req, res) => {
  const { nombre, apellido, rut, rut_dv, nacimiento, licencia } = req.body;
  try{
    const camionero = await pool.query('SELECT rut, rut_dv FROM camioneros WHERE rut = $1 AND rut_dv = $2', [rut, rut_dv]);
    if(camionero.rowCount < 1){
      const response = await pool.query('INSERT INTO camioneros (nombre, apellido, rut, rut_dv, nacimiento, licencia) VALUES($1, $2, $3, $4, $5, $6)', [nombre, apellido, rut, rut_dv, nacimiento, licencia]);
      console.log('Camionero creado correctamente');
      res.json({
        message: 'Camionero creado correctamente',
        body: {
          camionerobody: {nombre, apellido, rut, rut_dv, nacimiento, licencia}
        }
      });
    }else{
      console.log('Camionero ya existe');
      res.json({message:'Camionero ya existe'});
    }
  }
  catch(error){
    console.log(error);
  }
};

const updateStatus = async (req, res) => {
  const { camion_id, estado_ruta, fecha_salida } = req.body;
  const id = req.params.id;
  try{
    const r = await pool.query('SELECT id, camion_id, proveedores_id, cliente_id, estado_ruta, fecha_salida FROM rutas WHERE id = $1', [id]);
    if(r.rowCount === 0){
      console.log('No existe una ruta con ese id');
      res.json({ message: 'No existe una ruta con ese id' });
    }else{
      const update = await pool.query('UPDATE rutas SET camion_id = $1, estado_ruta = $2, fecha_salida = $3 WHERE id = $4', [camion_id, estado_ruta, fecha_salida, id]);
      const nuevo = await pool.query('SELECT id, camion_id, proveedores_id, cliente_id, estado_ruta, fecha_salida FROM rutas WHERE id = $1', [id]);
      console.log('Ruta actualizada correctamente');
      res.json({
        message: 'Ruta actualizada correctamente',
        body: nuevo.rows
      });
    }
  }
  catch(error){
    console.log(error);
  }
};

const delAyudantes = async (req, res) => {
  const { rut, rut_dv } = req.body;
  try{
    const ayd = await pool.query('SELECT rut, rut_dv FROM ayudantes WHERE rut = $1 AND rut_dv = $2', [rut, rut_dv]);
    if(ayd.rowCount > 0){
      const del = await pool.query('DELETE FROM ayudantes WHERE rut = $1 AND rut_dv = $2', [rut, rut_dv]);
      if(del.rowCount > 0){
        console.log(`Ayudante de rut ${rut}-${rut_dv} eliminado`);
        res.json({ message: `Ayudante de rut ${rut}-${rut_dv} eliminado` });
      }else{
        console.log(`No existe ningun ayudante de rut ${rut}-${rut_dv}`);
        res.json({ message: `No existe ningun ayudante de rut ${rut}-${rut_dv}` });
      }
    }else{
      console.log('No existe ningun ayudante con ese rut');
      res.json({ message: 'No existe ningun ayudante con ese rut' });
    }
  }
  catch(error){
    console.log(error);
  }
};

module.exports = {
    getCamioneroByrutaID,
    createAyudantes,
    updateCliente,
    delCamiones,
    comProveedor,
    createRuta,
    getCamiones,
    createCamionero,
    delAyudantes,
    updateStatus
}
-- getCamioneroByrutaID
SELECT camioneros.nombre
FROM camioneros
JOIN camiones ON camioneros.id = camiones.camionero_id
JOIN rutas ON camiones.id = rutas.camion_id
WHERE rutas.id = $1;

-- createAyudantes
SELECT ayudantes.rut, ayudantes.rut_dv
FROM ayudantes
WHERE ayudantes.rut = $1 AND ayudantes.rut_dv = $2;

INSERT INTO ayudantes (nombre, apellido, rut, rut_dv, nacimiento) VALUES($1, $2, $3, $4, $5);

-- updateCliente
SELECT clientes.nombre_cliente, clientes.calle, clientes.dr_num, clientes.comuna_id
FROM clientes
WHERE nombre_cliente = $1 AND calle = $2 AND dr_num = $3 AND comuna_id = $4;

UPDATE clientes SET nombre_cliente = $1, calle = $2, dr_num = $3, comuna_id = $4 WHERE id = $5;

-- delCamiones
SELECT camiones.patente
FROM camiones
WHERE camiones.patente = $1;

DELETE FROM camiones WHERE patente = $1;

-- comProveedor
SELECT comunas.nombre_comuna
FROM comunas
JOIN proveedores ON comunas.id = proveedores.comuna_id
WHERE proveedores.id = $1;

-- getCamiones
SELECT camiones.patente, camiones.modelo, camiones.capacidad_kg, camiones.kilometraje, camiones.gps,
camioneros.nombre AS camionero_nombre, camioneros.apellido AS camionero_apellido,
ayudantes.nombre AS ayudante_nombre, ayudantes.apellido AS ayudante_apellido
FROM camiones
JOIN camioneros ON camiones.camionero_id = camioneros.id
JOIN ayudantes ON ayudantes.id = camiones.ayudante_id
WHERE camiones.id = $1;

-- createRuta
SELECT id, nombre_empresa
FROM proveedores
WHERE id = $1;

SELECT id, nombre_cliente
FROM clientes
WHERE id = $1;

INSERT INTO rutas (camion_id, proveedores_id, cliente_id, estado_ruta, fecha_salida) VALUES($1, $2, $3, $4, $5);

-- createCamionero
SELECT rut, rut_dv
FROM camioneros
WHERE rut = $1 AND rut_dv = $2;

INSERT INTO camioneros (nombre, apellido, rut, rut_dv, nacimiento, licencia) VALUES($1, $2, $3, $4, $5, $6);

-- updateStatus
SELECT id, camion_id, proveedores_id, cliente_id, estado_ruta, fecha_salida
FROM rutas
WHERE id = $1;

UPDATE rutas SET camion_id = $1, estado_ruta = $2, fecha_salida = $3 WHERE id = $4;

-- delAyudantes
SELECT rut, rut_dv
FROM ayudantes
WHERE rut = $1 AND rut_dv = $2;

DELETE FROM ayudantes WHERE rut = $1 AND rut_dv = $2;
-- Comunas
INSERT INTO comunas (nombre_comuna) VALUES
('Colina'),
('Lampa'),
('Til Til'),
('Pirque'),
('Puente Alto'),
('San José de Maipo'),
('Buin'),
('Calera de Tango'),
('Paine'),
('San Bernardo'),
('Alhué'),
('Curacaví'),
('María Pinto'),
('Melipilla'),
('San Pedro'),
('Cerrillos'),
('Cerro Navia'),
('Conchalí'),
('El Bosque'),
('Estación Central'),
('Huechuraba'),
('Independencia'),
('La Cisterna'),
('La Granja'),
('La Florida'),
('La Pintana'),
('La Reina'),
('Las Condes'),
('Lo Barnechea'),
('Lo Espejo'),
('Lo Prado'),
('Macul'),
('Maipú'),
('Ñuñoa'),
('Pedro Aguirre Cerda'),
('Peñalolén'),
('Providencia'),
('Pudahuel'),
('Quilicura'),
('Quinta Normal'),
('Recoleta'),
('Renca'),
('San Miguel'),
('San Joaquín'),
('San Ramón'),
('Santiago'),
('Vitacura'),
('El Monte'),
('Isla de Maipo'),
('Padre Hurtado'),
('Peñaflor'),
('Talagante');

-- Camioneros
INSERT INTO camioneros (nombre, apellido, rut, rut_dv, nacimiento, licencia) VALUES
('Jorge', 'Gonzales', 9156405, 'K', '1964-12-06', false),
('Claudio', 'Narea', 9905936, '2', '1965-07-13', false),
('Miguel', 'Tapia', 10091282, '1', '1964-05-09', false),
('Álvaro', 'Henriquez', 8358456, '4', '1969-10-18', true),
('Roberto', 'Lindl', 10063923, '8', '1967-06-08', true),
('Francisco', 'Molina', 8684497, '4', '1969-05-25', true),
('Ángel', 'Parra', 8321597, '6', '1966-05-22', true),
('Álvaro', 'López', 13552091, '8', '1979-11-04', true),
('Mauricio', 'Durán', 12974791, '9', '1976-10-19', true),
('Francisco', 'Durán', 15173184, '8', '1982-04-13', true),
('Gonzalo', 'López', 15376719, 'K', '1982-01-22', true),
('Mauricio', 'Basualto', 10941107, '8', '1968-11-11', true);

-- Ayudantes
INSERT INTO ayudantes (nombre, apellido, rut, rut_dv, nacimiento) VALUES
('Diego', 'Banda', 21604354, '5', '2004-06-13'),
('Diego', 'Salazar', 21152957, '1', '2002-10-27'),
('Claudio', 'Bravo', 14329176, '6', '1983-04-13'),
('Matías', 'Fernández', 17537317, '9', '1986-05-15'),
('Humberto', 'Suazo', 14003294, '8', '1981-05-10'),
('Jorge', 'Valdivia', 16081087, '4', '1983-10-19'),
('Carlos', 'Caszely', 5426249, '3', '1950-07-05'),
('Esteban', 'Paredes', 13899344, '2', '1980-08-01'),
('Arturo', 'Vidal', 16713130, '1', '1987-05-22'),
('Brayan', 'Cortes', 18899595, '0', '1995-03-11');

-- Camiones
INSERT INTO camiones (patente, camionero_id, ayudante_id, modelo, capacidad_kg, kilometraje, gps) VALUES
('BCDF12', 12, 1, 'Chevrolet NPR715', 4000, 500, true),
('VXQR15', 11, 2, 'Chevrolet NPR715', 4000, 450, true),
('KLMN34', 10, 3, 'Chevrolet NPR715', 4000, 354, true),
('PSTT78', 9, 4, 'Chevrolet NPR715', 4000, 548, true),
('WXYZ90', 8, 5, 'Chevrolet NPR715', 4000, 308, true),
('VWXQ11', 7, 6, 'Volkswagen Delivery 9.170', 8800, 100, true),
('KLMN67', 6, 7, 'Volkswagen Delivery 9.170', 8800, 98, true),
('PQRS23', 5, 8, 'Volkswagen Delivery 9.170', 8800, 76, true),
('FGHD45', 4, 9, 'Volkswagen Delivery 9.170', 8800, 122, true),
('CDFX56', 3, 10, 'Volkswagen Delivery 9.170', 8800, 168, true);

-- Proveedores
INSERT INTO proveedores (nombre_empresa, comuna_id) VALUES
('Bredenmaster', 38),
('Coca-Cola Norte', 42);

-- Clientes
INSERT INTO clientes (nombre_cliente, calle, dr_num, comuna_id) VALUES
('Almacén R', 'Bucalemu', '5681', 42),
('Minimarket DS', 'Avda Salomon Sack', '455', 22),
('U. Diego Portales', 'Avda Ejército Libertador', '441', 46);

-- Rutas
INSERT INTO rutas (camion_id, proveedores_id, cliente_id, estado_ruta, fecha_salida) VALUES
(1, 1, 3, true, '2023-12-01 06:30:00'),
(NULL, 2, 1, false, NULL),
(NULL, 2, 2, false, NULL);
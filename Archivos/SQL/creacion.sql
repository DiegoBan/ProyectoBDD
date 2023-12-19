CREATE DATABASE transportes
\c transportes

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Creación de tablas
CREATE TABLE camioneros (
    id serial NOT NULL,
    nombre varchar(30) NOT NULL,
    apellido varchar(30) NOT NULL,
    rut int NOT NULL,
    rut_dv char(1) NOT NULL,
    nacimiento date NOT NULL,
    licencia boolean NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE ayudantes (
    id serial NOT NULL,
    nombre varchar(30) NOT NULL,
    apellido varchar(30) NOT NULL,
    rut int NOT NULL,
    rut_dv char(1) NOT NULL,
    nacimiento date NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE camiones (
    id serial NOT NULL,
    patente varchar(6) NOT NULL,
    camionero_id int,
    ayudante_id int,
    modelo varchar(40) NOT NULL,
    capacidad_kg int,
    kilometraje int,
    gps boolean NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (camionero_id) REFERENCES camioneros(id),
    FOREIGN KEY (ayudante_id) REFERENCES ayudantes(id)
);

CREATE TABLE comunas (
    id serial NOT NULL,
    nombre_comuna varchar(20),
    PRIMARY KEY (id)
);

CREATE TABLE proveedores (
    id serial NOT NULL,
    nombre_empresa varchar(40) NOT NULL,
    comuna_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (comuna_id) REFERENCES comunas(id)
);

CREATE TABLE clientes (
    id serial NOT NULL,
    nombre_cliente varchar(30) NOT NULL,
    calle varchar(50) NOT NULL,
    dr_num varchar(6) NOT NULL,
    comuna_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (comuna_id) REFERENCES comunas(id)
);

CREATE TABLE rutas (
    id serial NOT NULL,
    camion_id int,
    proveedores_id int NOT NULL,
    cliente_id int NOT NULL,
    estado_ruta boolean NOT NULL,
    fecha_salida timestamp,
    PRIMARY KEY (id),
    FOREIGN KEY (camion_id) REFERENCES camiones(id),
    FOREIGN KEY (proveedores_id) REFERENCES proveedores(id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
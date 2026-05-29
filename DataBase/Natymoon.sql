create table rol (
    id int,
    descripcion varchar(150),
    constraint pk_rol_id primary key (id)
);

create table usuario (
    id int, 
    nombre varchar(150),
    email varchar(150),
    contrasena varchar(150),
    estado varchar(150),
    id_rol int,
    constraint pk_usuario_id primary key (id),
    constraint fk_usuario_id_rol foreign key (id_rol) references rol (id),
    constraint unico_usuario_email unique (email)
);

create table direccion_usuario (
    id int, 
    id_usuario int, 
    linea_direccion varchar(150),
    ciudad varchar(150),
    telefono_contacto varchar(20),
    constraint pk_direccion_id primary key (id),
    constraint fk_direccion_id_usuario foreign key (id_usuario) references usuario (id)
);

create table categoria (
    id int, 
    nombre varchar(150),
    constraint pk_categoria_id primary key (id)
);

create table producto (
    id int, 
    nombre varchar(150),
    descripcion varchar(160),
    stock int, 
    precio int,
    url_imagen varchar(150),
    id_categoria int, 
    constraint pk_producto_id primary key (id),
    constraint fk_producto_id_categoria foreign key (id_categoria) references categoria (id)
);

create table carrito_compras (
    id int, 
    id_usuario int,
    constraint pk_carrito_id primary key (id),
    constraint fk_carrito_id_usuario foreign key (id_usuario) references usuario (id)
);

create table detalle_carrito (
    id int,    
    id_carrito_compras int, 
    id_producto int, 
    cantidad int,
    constraint pk_detalle_carrito_id primary key (id),
    constraint fk_detalle_id_carrito foreign key (id_carrito_compras) references carrito_compras (id),
    constraint fk_detalle_id_producto foreign key (id_producto) references producto (id)
);

create table cupon (
    id int,
    codigo varchar(50),
    descripcion varchar(150),
    valor_descuento decimal(10,2),
    estado varchar(50),
    fecha_inicio date,
    fecha_fin date,
    constraint pk_cupon_id primary key (id),
    constraint unico_cupon_codigo unique (codigo)
);

create table pago (
    id int,
    monto decimal(10,2),
    metodo_pago varchar(50),
    fecha_pago timestamp,
    constraint pk_pago_id primary key (id)
);

create table orden_compra ( 
    id int,
    id_usuario int,
    id_pago int,
    id_cupon int,
    id_direccion_usuario int,
    estado varchar(50),
    fecha_entrega date,
    precio_total decimal(10,2),
    constraint pk_orden_id primary key (id),
    constraint fk_orden_id_usuario foreign key (id_usuario) references usuario (id),
    constraint fk_orden_id_pago foreign key (id_pago) references pago (id),
    constraint fk_orden_id_cupon foreign key (id_cupon) references cupon (id),
    constraint fk_orden_id_direccion foreign key (id_direccion_usuario) references direccion_usuario (id)
);

create table detalle_orden (
    id int,
    id_orden_compra int,
    id_producto int,
    cantidad int,
    precio_unitario decimal(10,2),
    constraint pk_detalle_orden_id primary key (id),
    constraint fk_detalle_id_orden foreign key (id_orden_compra) references orden_compra (id),
    constraint fk_detalle_orden_id_producto foreign key (id_producto) references producto (id)
);


INSERT INTO rol (id, descripcion) VALUES 
(1, 'Administrador'),
(2, 'Cliente');

INSERT INTO usuario (id, nombre, email, contrasena, estado, id_rol) VALUES 
(1, 'Agustín Cabezas', 'agustin@email.com', 'pass123', 'Activo', 1),
(2, 'Camila Restrepo', 'camila@email.com', 'mila2026', 'Activo', 2),
(3, 'Carlos Mendoza', 'carlos@email.com', 'carlitos99', 'Inactivo', 2),
(4, 'Laura Sofia', 'laura@email.com', 'laura456', 'Activo', 2);

INSERT INTO direccion_usuario (id, id_usuario, linea_direccion, ciudad, telefono_contacto) VALUES 
(1, 2, 'Calle 45 # 12-34', 'Bogotá', '3101234567'),
(2, 3, 'Carrera 7 # 72-10', 'Bogotá', '3159876543'),
(3, 4, 'Avenida Suba # 115-05', 'Bogotá', '3204567890');

INSERT INTO categoria (id, nombre) VALUES 
(1, 'Pijamas Térmicas'),
(2, 'Pijamas de Satín / Seda'),
(3, 'Pijamas de Algodón'),
(4, 'Pijamas Animadas (Kigurumi)');

INSERT INTO producto (id, nombre, descripcion, stock, precio, url_imagen, id_categoria) VALUES 
(1, 'Pijama Térmica de Oso', 'Pijama entera térmica abrigada con capucha de oso', 12, 65000, 'img_oso.jpg', 1),
(2, 'Pijama Satín Premium Negra', 'Conjunto de short y camisa en satín suave color negro', 8, 85000, 'img_satin_n.jpg', 2),
(3, 'Pijama Algodón Clásica Gris', 'Pijama de dos piezas pantalón y manga larga gris', 3, 45000, 'img_gris.jpg', 3), 
(4, 'Pijama Kigurumi de Dinosaurio', 'Pijama térmica entera enteriza de dinosaurio verde', 0, 95000, 'img_dino.jpg', 4),  
(5, 'Pijama Algodón Short Rosada', 'Conjunto fresco de short y esqueleto rosado', 20, 38000, 'img_rosa.jpg', 3);

INSERT INTO cupon (id, codigo, descripcion, valor_descuento, estado, fecha_inicio, fecha_fin) VALUES 
(1, 'NATYNOM10', '10% de descuento en la primera compra', 10000.00, 'Activo', '2026-01-01', '2026-12-31'),
(2, 'PROMOLLUVIA', 'Descuento especial de temporada', 15000.00, 'Activo', '2026-05-01', '2026-06-30'),
(3, 'EXPIPAGO', 'Cupón antiguo ya vencido', 5000.00, 'Inactivo', '2025-01-01', '2025-05-01');

INSERT INTO carrito_compras (id, id_usuario) VALUES 
(1, 2), 
(2, 4); 

INSERT INTO detalle_carrito (id, id_carrito_compras, id_producto, cantidad) VALUES 
(1, 1, 1, 1), 
(2, 1, 2, 2), 
(3, 2, 5, 1); 

INSERT INTO pago (id, monto, metodo_pago, fecha_pago) VALUES 
(1, 220000.00, 'Nequi', '2026-05-28 14:30:00'),
(2, 45000.00, 'Daviplata', '2026-05-29 09:15:00');

INSERT INTO orden_compra (id, id_usuario, id_pago, id_cupon, id_direccion_usuario, estado, fecha_entrega, precio_total) VALUES 
(1, 2, 1, 2, 1, 'Enviado', '2026-06-02', 220000.00), 
(2, 4, 2, NULL, 3, 'Entregado', '2026-05-30', 45000.00);  

INSERT INTO detalle_orden (id, id_orden_compra, id_producto, cantidad, precio_unitario) VALUES 
(1, 1, 1, 1, 65000.00),  
(2, 1, 2, 2, 85000.00),  
(3, 2, 3, 1, 45000.00);
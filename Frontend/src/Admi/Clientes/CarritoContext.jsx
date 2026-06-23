import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto) => {
    const existe = carrito.find(
      (item) =>
        item.id === producto.id &&
        item.talla === producto.talla
    );

    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id &&
          item.talla === producto.talla
            ? {
                ...item,
                cantidad:
                  item.cantidad + producto.cantidad,
              }
            : item
        )
      );
    } else {
      setCarrito([...carrito, producto]);
    }
  };

  const eliminarProducto = (id, talla) => {
    setCarrito(
      carrito.filter(
        (item) =>
          !(item.id === id && item.talla === talla)
      )
    );
  };

  const aumentarCantidad = (id, talla) => {
    setCarrito(
      carrito.map((item) =>
        item.id === id &&
        item.talla === talla
          ? {
              ...item,
              cantidad: item.cantidad + 1,
            }
          : item
      )
    );
  };

  const disminuirCantidad = (id, talla) => {
    setCarrito(
      carrito
        .map((item) =>
          item.id === id &&
          item.talla === talla
            ? {
                ...item,
                cantidad: item.cantidad - 1,
              }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        eliminarProducto,
        aumentarCantidad,
        disminuirCantidad,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}
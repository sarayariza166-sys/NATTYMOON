import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() =>
    JSON.parse(localStorage.getItem("carrito")) || []
  );

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const totalItems = useMemo(
    () => carrito.reduce((total, item) => total + Number(item.cantidad || 0), 0),
    [carrito]
  );

  const agregarProducto = (producto) => {
    setCarrito((actual) => {
      const existe = actual.find(
        (item) => item.id === producto.id && item.talla === producto.talla
      );

      if (!existe) return [...actual, producto];

      return actual.map((item) =>
        item.id === producto.id && item.talla === producto.talla
          ? { ...item, cantidad: Number(item.cantidad) + Number(producto.cantidad) }
          : item
      );
    });
  };

  const eliminarProducto = (id, talla) => {
    setCarrito((actual) => actual.filter((item) => !(item.id === id && item.talla === talla)));
  };

  const aumentarCantidad = (id, talla) => {
    setCarrito((actual) =>
      actual.map((item) =>
        item.id === id && item.talla === talla
          ? { ...item, cantidad: Number(item.cantidad) + 1 }
          : item
      )
    );
  };

  const disminuirCantidad = (id, talla) => {
    setCarrito((actual) =>
      actual
        .map((item) =>
          item.id === id && item.talla === talla
            ? { ...item, cantidad: Number(item.cantidad) - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, totalItems, agregarProducto, eliminarProducto, aumentarCantidad, disminuirCantidad }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const context = useContext(CarritoContext);
  if (!context) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return context;
}

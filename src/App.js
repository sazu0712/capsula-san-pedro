import React, { useState } from "react";

const shirtBaseImages = {
  blanco: "/mockups/camiseta_blanco.png",
  negro: "/mockups/camiseta_negro.png",
  azul: "/mockups/camiseta_azul_bebe.png",
  verde: "/mockups/camiseta_verde_agua.png",
  gris: "/mockups/camiseta_gris.png",
  marfil: "/mockups/camiseta_marfil.png",
  cafe: "/mockups/camiseta_cafe.png",
  palorosa: "/mockups/camiseta_palo_rosa.png",
};

const stampOptions = [
  {
    name: "Tambora",
    src: "/mockups/Tambora.png",
    style: {
      top: "40%",
      left: "50%",
      width: "280px",
      height: "330px",
    },
  },
  {
    name: "Tocado",
    src: "/mockups/Tocado.png",
    style: {
      top: "30%",
      left: "55%",
      width: "500px",
      height: "550px",
    },
  },
  {
    name: "Ole y Entonces",
    src: "/mockups/Ole_y_entonces.png",
    style: {
      top: "27%",
      left: "50%",
      width: "200px",
      height: "100px",
    },
  },
  {
    name: "Sirvame uno",
    src: "/mockups/Sirva.png",
    style: {
      top: "35%",
      left: "50%",
      width: "220px",
      height: "220px",
    },
  },
  {
    name: "Neiva York",
    src: "/mockups/Neivayork.png",
    style: {
      top: "30%",
      left: "52%",
      width: "250px",
      height: "130px",
    },
  },
  {
    name: "Todo es gloria",
    src: "/mockups/mi_tierra.png",
    style: {
      top: "20%",
      left: "51%",
      width: "330px",
      height: "220px",
    },
  },
  {
    name: "Corona de flor",
    src: "/mockups/Corona.png",
    style: {
      top: "18%",
      left: "51%",
      width: "320px",
      height: "190px",
    },
  },
];

const sizes = ["S", "M", "L", "XL"];

export default function ShirtCustomizer() {
  const [order, setOrder] = useState([]);
  const [color, setColor] = useState("blanco");
  const [stamp, setStamp] = useState(stampOptions[0]);
  const [size, setSize] = useState("M");

  const addToOrder = () => {
    setOrder([...order, { color, stamp, size }]);
  };

  const removeFromOrder = (indexToRemove) => {
    setOrder(order.filter((_, index) => index !== indexToRemove));
  };

  const generateWhatsAppLink = () => {
    const message = order
      .map(
        (item, index) =>
          `Camiseta ${index + 1}: Talla ${item.size}, Color ${item.color}, Diseño "${item.stamp.name}"`
      )
      .join("%0A");

    return `https://wa.me/573123672978?text=${encodeURIComponent(
      `Hola, quiero hacer el siguiente pedido:%0A${message}`
    )}`;
  };

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold">Selecciona el color de la camiseta</h2>
          {Object.keys(shirtBaseImages).map((colorName) => (
            <label key={colorName} className="mr-4 cursor-pointer inline-block">
              <input
                type="radio"
                name="shirtColor"
                value={colorName}
                checked={color === colorName}
                onChange={() => setColor(colorName)}
                className="mr-1"
              />
              {colorName}
            </label>
          ))}

          <h2 className="mt-4 text-lg font-semibold">Selecciona la talla</h2>
          {sizes.map((s) => (
            <label key={s} className="mr-4 cursor-pointer inline-block">
              <input
                type="radio"
                name="shirtSize"
                value={s}
                checked={size === s}
                onChange={() => setSize(s)}
                className="mr-1"
              />
              {s}
            </label>
          ))}

          <h2 className="mt-4 text-lg font-semibold">Selecciona el diseño del estampado</h2>
          {stampOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => setStamp(option)}
              className="mr-2 px-2 py-1 border rounded"
            >
              {option.name}
            </button>
          ))}

          <button
            onClick={addToOrder}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
          >
            Agregar al pedido
          </button>
        </div>

        <div style={{ position: "relative", width: 700, height: 800 }}>
          <img
            src={shirtBaseImages[color]}
            alt={`Camiseta color ${color}`}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          {stamp && (
            <img
              src={stamp.src}
              alt="Estampado"
              style={{
                position: "absolute",
                top: stamp.style.top,
                left: stamp.style.left,
                width: stamp.style.width,
                height: stamp.style.height,
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Resumen del pedido</h2>
        <ul className="list-disc ml-6">
          {order.map((item, index) => (
            <li key={index}>
              Camiseta {index + 1}: Talla {item.size}, Color {item.color}, Diseño "{item.stamp.name}"
              <button
                onClick={() => removeFromOrder(index)}
                className="ml-2 px-2 py-1 text-sm text-red-600 border border-red-600 rounded"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>

        {order.length > 0 && (
          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block px-6 py-3 bg-green-500 text-white rounded shadow"
          >
            Enviar pedido por WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

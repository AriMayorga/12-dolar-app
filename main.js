import "./style.css";
import Chart from "chart.js/auto";
const ctx = document.getElementById("myChart");

import { Colors } from "chart.js";
Chart.register(Colors);

const obtenerDolares = async () => {
  const url = "https://dolarapi.com/v1/dolares";
  const request = await fetch("https://dolarapi.com/v1/dolares");
  const data = await request.json();

  let labels = [];
  let values = [];

  data.map((d) => {
    labels.push(d.nombre);
    values.push(d.venta);
  });

  return {
    labels: labels,
    values: values,
  };
};

const datos = await obtenerDolares();

new Chart(ctx, {
  type: "bar",
  data: {
    labels: datos.labels,
    datasets: [
      {
        label: "# valor venta",
        data: datos.values,
        borderWidth: 1,
        backgroundColor: "orange",
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const boton_pesos = document.getElementById("boton_pesos");
const pesos = document.getElementById("pesos");
const resultado = document.getElementById("resultado");

const obtenerDolarBlue = async () => {
  const url = "http://dolarapi.com/v1/dolares/blue";
  const requestData = await fetch(url);
  const data = await requestData.json();
  return data.venta;
};

const calcularDolarBlue = async (pesos) => {
  const dolarBlue = await obtenerDolarBlue();
  return parseFloat(pesos) / dolarBlue;
};

boton_pesos.addEventListener("click", async () => {
  const conversion = await calcularDolarBlue(pesos.value);
  resultado.value = conversion.toFixed(2);
  pesos.value = "";
});

import "./style.css";

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

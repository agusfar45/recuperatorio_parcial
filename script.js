const formulario = document.getElementById("formularioBoletos");
const destino = document.getElementById("destino");
const fechaIda = document.getElementById("fechaIda");
const fechaVuelta = document.getElementById("fechaVuelta");
const fechaVueltaGroup = document.getElementById("fechaVueltaGroup");
const pasajeros = document.getElementById("pasajeros");
const resultado = document.getElementById("resultado");
const errorFecha = document.getElementById("errorFecha");

// Precios por destino 
const precios = {
  COR: 120000,
  MDZ: 210800,
  BUE: 135000,
};

// Establecer fechas mínimas desde hoy
const hoy = new Date();
const yyyy = hoy.getFullYear();
const mm = String(hoy.getMonth() + 1).padStart(2, "0");
const dd = String(hoy.getDate()).padStart(2, "0");
const fechaMinima = `${yyyy}-${mm}-${dd}`;
fechaIda.min = fechaMinima;
fechaVuelta.min = fechaMinima;

// Mostrar/ocultar campo de fecha de vuelta según opción seleccionada
const radios = document.querySelectorAll('input[name="opcionVuelo"]');

radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    const opcion = document.querySelector('input[name="opcionVuelo"]:checked').value;
    if (opcion === "ida_vuelta") {
      fechaVueltaGroup.style.display = "block";
      fechaVuelta.required = true;
    } else {
      fechaVueltaGroup.style.display = "none";
      fechaVuelta.required = false;
      fechaVuelta.value = "";
    }
  });
});

// Evento de envio de formulario
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  errorFecha.textContent = "";
  resultado.textContent = "";

  const dest = destino.value;
  const opcion = document.querySelector('input[name="opcionVuelo"]:checked').value;
  const ida = new Date(fechaIda.value);
  const vuelta = new Date(fechaVuelta.value);
  const cantPasajeros = parseInt(pasajeros.value);

  // Validar fechas
  if (opcion === "ida_vuelta") {
    if (!fechaVuelta.value || vuelta <= ida) {
      errorFecha.textContent = "La fecha de vuelta debe ser mayor que la de ida.";
      return;
    }
  }

  // Calculo del precio
  let precioBase = precios[dest] || 0;
  if (opcion === "ida") {
    precioBase /= 2;
  }
  // Profe lo estoy calculando asi porque de esta manera me da directamente el resultado deseado con el impeusto IVA
  let precioConIVA = precioBase * 1.21;
  let total = precioConIVA * cantPasajeros;

  resultado.textContent = `El precio total es: 
  $${total.toLocaleString("es-AR", {
    minimumFractionDigits: 2
  })}`;
});

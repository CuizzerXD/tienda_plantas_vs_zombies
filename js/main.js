// Logica para animacion de las plantas
document.addEventListener("DOMContentLoaded", () => {
  const imgs = document.querySelectorAll("img[data-static][data-gif]");
  imgs.forEach((img) => {
    const staticSrc = img.dataset.static;
    const gifSrc = img.dataset.gif;
    if (!staticSrc || !gifSrc) return;

    img.addEventListener("mouseover", () => {
      img.src = gifSrc;
    });

    img.addEventListener("mouseout", () => {
      img.src = staticSrc;
    });
  });
});

// Logica para musica de fondo (prender o apagar)
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music");
  const toggle = document.getElementById("musicToggle");
  const label = document.getElementById("musicLabel");

  if (!audio || !toggle || !label) return;

  audio.volume = 0.2;

  const setUI = (isOn) => {
    toggle.checked = isOn;
    label.textContent = isOn ? "Música: ON" : "Música: OFF";
  };

  setUI(false);

  toggle.addEventListener("change", async () => {
    if (toggle.checked) {
      try {
        await audio.play();
        setUI(true);
      } catch (e) {
        // Si el navegador bloquea el autoplay, revertimos el switch
        setUI(false);
      }
    } else {
      audio.pause();
      audio.currentTime = 0;
      setUI(false);
    }
  });
});

function validaFormulario() {
  /* Evita que se recarge la pagina */
  event.preventDefault();

  /* Obtener datos del formulario */
  let nombre = document.getElementById("nombre").value.trim();
  let email = document.getElementById("email").value.trim();
  let bando = document.getElementById("bando").value;
  let mensaje = document.getElementById("mensaje").value.trim();
  let form = document.getElementById("formMensaje");

  /* Validar el ingreso de los campos */
  if (!nombre || !email || !bando || !mensaje) {
    form.classList.add("was-validated");
    return;
  }
  form.reset();
  form.classList.remove("was-validated");
  // Crear objeto nuevoComentario
  let nuevoComentario = { nombre, email, bando, mensaje };
  // Obtener mensajes guardados o crear un arreglo vacio
  let mensajes = JSON.parse(localStorage.getItem("comentarios")) || [];
  // Agregar nuevo mensaje  al arreglo
  mensajes.push(nuevoComentario);
  // Guardar en LocalStorage
  localStorage.setItem("comentarios", JSON.stringify(mensajes));
}

function extraerNumeroPrecioDesdeH6(col) {
  const card = col.querySelector(".card");
  if (!card) return 0;
  const h6 = card.querySelector("h6.fs-5");
  if (!h6) return 0;
  const texto = h6.textContent || "";
  // Quita todo menos dígitos (y punto/coma por si acaso)
  const soloNumero = texto.replace(/[^\d.,]/g, "").replace(",", ".");
  const n = parseFloat(soloNumero);
  return Number.isFinite(n) ? n : 0;
}

function filtradoTienda(orden) {
  //Traemos de dentro del elemento main el elemento que concuerde con la clase .row ya que este es el contenedor
  //que tiene dentro todas las cards
  const row = document.querySelector('main .row.g-4.mb-5');
  //Si no existe se sale de la funcion
  if (!row) return;

  // Solo selecciona columnas que son hijos directos de la clase rows
  // :scope significa el elemento actual en este caso el row, el mayor que (>) sirve para apuntar al hijo directo
  //Basicamente aqui lo que se hace es meter en un NodeList todos los elementos que concuerden con la clase
  //cool md-4 y col-sm-6 para despues agregarlos a un arreglo para poder utilizar el metodo sort
  const columnas = Array.from(row.querySelectorAll(':scope > .col-md-4.col-sm-6'));

  columnas.sort((colA, colB) => {
    const precioA = extraerNumeroPrecioDesdeH6(colA);
    const precioB = extraerNumeroPrecioDesdeH6(colB);
    if (orden === "mayor-menor") return precioB - precioA;
    return precioA - precioB;
  });
  columnas.forEach((col) => row.appendChild(col));
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContador();
  renderizarCarrito();

  const gif = document.getElementById("myAnimacion");
  const imagenEstatica = gif.dataset.static;
  const gifSrc = gif.dataset.gif;
  const botonesComprar = document.querySelectorAll(".btn-add-carrito");

  gif.addEventListener("mouseover", () => {
    gif.src = gifSrc;
  });

  gif.addEventListener("mouseout", () => {
    gif.src = imagenEstatica;
  });

  botonesComprar.forEach((boton) => {
    boton.addEventListener("click", (evento) => {
      const id = evento.target.dataset.id;
      const nombre = evento.target.dataset.nombre;
      const precio = parseInt(evento.target.dataset.precio);
      const moneda = evento.target.dataset.moneda;

      let producto = { id, nombre, precio, moneda };

      agregarAlCarrito(producto);
    });
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

const keyCarrito = "carrito";

function cargarCarrito() {
  return JSON.parse(localStorage.getItem(keyCarrito)) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(keyCarrito, JSON.stringify(carrito));
}

function agregarAlCarrito(producto) {
  const carrito = cargarCarrito();
  const existe = carrito.find((item) => item.id === producto.id);
  if (existe) existe.qty += 1;
  else carrito.push({ ...producto, qty: 1 });
  guardarCarrito(carrito);
  actualizarContador();
  renderizarCarrito();
}

function eliminarDelCarrito(id) {
  const carrito = cargarCarrito().filter((item) => item.id !== id);
  guardarCarrito(carrito);
}

function actualizarContador() {
  const carritoActual = cargarCarrito();
  const totalItems = carritoActual.reduce(
    (acumulador, producto) => acumulador + producto.qty,
    0,
  );
  document.getElementById("cart-count").innerHTML = totalItems;
}

function renderizarCarrito() {
  const carrito = cargarCarrito();
  const listaHTML = document.getElementById("cart-items");
  listaHTML.innerHTML = "";

  if (carrito.length === 0) {
    listaHTML.innerHTML = `<li class="list-group-item text-center text-muted">El carrito está vacío... 🧟‍♂️🌻</li>`;
  } else {
    carrito.forEach((producto) => {
      listaHTML.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
          ${producto.nombre} (x${producto.qty})
          <span class="badge bg-secondary rounded-pill">
            ${producto.precio * producto.qty} ${producto.moneda}
          </span>
        </li>`;
    });
  }

  const plantasEnCarrito = carrito.filter((item) => item.moneda === "soles");
}

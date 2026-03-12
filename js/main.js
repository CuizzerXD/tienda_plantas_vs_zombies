document.addEventListener("DOMContentLoaded", () => {
  const gif = document.getElementById("myAnimacion");
  const imagenEstatica = gif.dataset.static;
  const gifSrc = gif.dataset.gif;
  const botonesComprar = document.querySelectorAll(".btn-add-carrito");
  const botonVaciarCarrito = document.getElementById("btn-vaciar-carrito");

  if (botonVaciarCarrito) {
    botonVaciarCarrito.addEventListener("click", () => {
      vaciarCarrito();
      contadorCarrito();
      renderCarrito();
    });
  }

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
  contadorCarrito();
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

function vaciarCarrito() {
  guardarCarrito([]);
  contadorCarrito();
  renderCarrito();
}

function agregarAlCarrito(producto) {
  const carrito = cargarCarrito();
  const existe = carrito.find((item) => item.id === producto.id);
  if (existe) existe.qty += 1;
  else carrito.push({ ...producto, qty: 1 });
  guardarCarrito(carrito);
  contadorCarrito();
}

function eliminarDelCarrito(id) {
  const carrito = cargarCarrito().filter((item) => item.id !== id);
  guardarCarrito(carrito);
}

function contadorCarrito() {
  const carrito = cargarCarrito();
  const total = carrito.reduce((acc, item) => acc + item.qty, 0);
  const contador = document.getElementById("cart-count");
  if(contador){
    contador.textContent = total;
  }
}

function renderCarrito() {
  const carrito = cargarCarrito();
  const tbody = document.getElementById("cart-items");
  const spanTotal = document.getElementById("cart-total");

  if (!tbody || !spanTotal) return;

  tbody.innerHTML = "";
  let total = 0;

  carrito.forEach((item) => {
    const subtotal = item.precio * item.qty;
    total += subtotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.nombre}</td>
      <td>${item.precio} ${item.moneda}</td>
      <td>${item.qty}</td>
      <td>${subtotal} ${item.moneda}</td>
      <td>
        <button class="btn btn-sm btn-danger btn-eliminar-item" data-id="${item.id}">
          Eliminar
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  spanTotal.textContent = total;

  // Listeners para botones "Eliminar" dentro del modal
  const botonesEliminar = document.querySelectorAll(".btn-eliminar-item");
  botonesEliminar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      eliminarDelCarrito(id);
      contadorCarrito();
      renderCarrito();
    });
  });
}


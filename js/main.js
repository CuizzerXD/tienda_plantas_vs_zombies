//Logica para animacion de las plantas
document.addEventListener("DOMContentLoaded", () => {
  const gif = document.getElementById("myAnimacion");
  const imagenEstatica = gif.dataset.static;
  const gifSrc = gif.dataset.gif;


  gif.addEventListener("mouseover", () => {
    gif.src = gifSrc;
  });

  gif.addEventListener("mouseout", () => {
    gif.src = imagenEstatica;
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

function filtradoTienda(){
  
}

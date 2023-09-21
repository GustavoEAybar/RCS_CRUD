import {
  camposRequeridos,
  validarGeneral,
  validarGeneral,
  validarNumeros,
  validarURL,
} from "./validaciones";

import { Producto } from "./productClass";

//traer los elementos que necesito del html
let campoCodigo = document.getElementById("codigo");
let campoProducto = document.getElementById("producto");
let campoDescripcion = document.getElementById("descripcion");
let campoCantidad = document.getElementById("cantidad");
let campoURL = document.getElementById("URL");
let formProducto = document.getElementById("formProducto");

let productoExistente = false; //variable bandera o boolana si el producoto existete es falso quiero crear y si es true quiero modificarlo.


//Si hay productos en localStorage quiero guardarlos en listaProductuos si no que sea un array vacio
let listaProductos = JSON.parse(localStorage.getItem('arrayProductosKey')) || [];

//asociar un evento a cada elemento obtenido

campoCodigo.addEventListener("blur", (input) => {
  console.log("desde Codigo");
  camposRequeridos(campoCodigo);
  if (input.value.length > 0) {
    console.log("aqui ta todo bien");
    input.className = "form-control is-valid";
    return true;
  } else {
    console.log("aqui muestro el error");
    input.className = "form-control is-invalid";
    return false;
  }
});

campoProducto.addEventListener("blur", () => {
  console.log("desde Producto");
  camposRequeridos();
  if (input.value.length > 0) {
    console.log("aqui ta todo bien");
    input.className = "form-control is-valid";
    return true;
  } else {
    console.log("aqui muestro el error");
    input.className = "form-control is-invalid";
    return false;
  }
});

campoDescripcion.addEventListener("blur", () => {
  console.log("desde Descriptcion");
  camposRequeridos();
  if (input.value.length > 0) {
    console.log("aqui ta todo bien");
    input.className = "form-control is-valid";
    return true;
  } else {
    console.log("aqui muestro el error");
    input.className = "form-control is-invalid";
    return false;
  }
});

campoCantidad.addEventListener("blur", () => {
  console.log("desde Cantidad");
  camposRequeridos();
  if (input.value.length > 0) {
    console.log("aqui ta todo bien");
    input.className = "form-control is-valid";
    return true;
  } else {
    console.log("aqui muestro el error");
    input.className = "form-control is-invalid";
    return false;
  }
});

campoURL.addEventListener("blur", () => {
  console.log("desde URL");
  camposRequeridos();
  if (input.value.length > 0) {
    console.log("aqui ta todo bien");
    input.className = "form-control is-valid";
    return true;
  } else {
    console.log("aqui muestro el error");
    input.className = "form-control is-invalid";
    return false;
  }
});

formProducto.addEventListener("submit", guardarProducto);

//llamo a carga inicial: lo tengo productos
cargaInicial();

//aqui empieza la logica del CRUD
function guardarProducto(e) {
  //para prevenir la actualizacion de la pagina
  e.preventDefault();
  //verificar que todos los datos sean correctos
  if (
    validarGeneral(
      campoCodigo,
      campoProducto,
      campoDescripcion,
      campoCantidad,
      campoURL
    )
  ) {
    console.log("los datos correctos listos para enviar");
    if (!productoExistente) {
      //crear producto
      crearProducto();
    } else {
      //modificar producto
      modificarProducto();
    }
  }
}

function cadaProducto() {
  //crear un objeto producto
  let prodcutoNuevo = new Producto(
    campoCodigo.value,
    campoProducto.value,
    campoDescripcion.value,
    campoCantidad.value,
    campoURL.value
  );
  console.log(prodcutoNuevo);
  listaProductos.push(prodcutoNuevo);
  console.log("se agrego el producto con exito");
  //limpiar el formulario
  limpiarFormulario();
  //guardar el array de productos dentro de local storage
  guardarLocalStorage();
  //mostrara el cartel al usuario
  Swal.fire(
    'Producto creado',
    'El producto fue creado correctamente',
    'success'
  )
  //cargar el producto en la tabla
  crearFila(prodcutoNuevo)
}

function limpiarFormulario() {
  //limpiar los values del formulario
  formProducto.reset();
  //resetear las clases de los input
  campoCodigo.className = "form-control";
  campoProducto.className = "form-contro";
  campoDescripcion.className = "form-contro";
  campoCantidad.className = "form-contro";
  campoURL.className = "form-contro";
  //reseteamos el estado de la variable bandera
  productoExistente = false;
}

function guardarLocalStorage(){
  localStorage.setItem("arrayProductosKey", JSON.stringify(listaProductos))
}

function crearFila(){
  let tablaProducto = document.getElementById("tablaProducto");
  //usamos el operador de asignacion por adicion para concatenar con lo que ya tengo de contenido de tabla porducto
  tablaProducto.innerHTML += `<tr>
  <td>${prudcto.codigo}</td>
  <td>${prudcto.producto}</td>
  <td>${prudcto.descripcion}</td>
  <td>${prudcto.cantidad}</td>
  <td>${prudcto.url}</td>
  <td>
  <button class="btn btn-warning mb-3 onclick="prepararEdicionProducto()">Editar</button>
  <button class="ben ben-danger mb-3" onclick="borrarProducto()">Eliminar</button>
  </td>
  </tr>`;
}

function cargaInicial(){
  if(listaProductos.length > 0){
    //crear fila
    listaProductos.map((itemProducto) => crearFila(itemProducto));
    //listaProductos.foreach((itemProducto) => crearFila(itemProducto));

  }
};
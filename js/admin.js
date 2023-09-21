import {
  camposRequeridos,
  validarNumeros,
  validarUrl,
  validarGeneral
} from './validaciones.js';

import { Producto } from './productClass.js';

//traer los elementos que necesito del html
let campoCodigo = document.getElementById("codigo");
let campoProducto = document.getElementById("producto");
let campoDescripcion = document.getElementById("descripcion");
let campoCantidad = document.getElementById("cantidad");
let campoUrl = document.getElementById("url");
let formProducto = document.getElementById("formProducto");

 //variable bandera o boolana si el producoto existete es falso quiero crear y si es true quiero modificarlo.
let productoExistente = false;



//Si hay productos en localStorage quiero guardarlos en listaProductuos si no que sea un array vacio
let listaProductos = JSON.parse(localStorage.getItem('arrayProductosKey')) || [];

//asociar un evento a cada elemento obtenido


campoCodigo.addEventListener("blur", (input) => {
  camposRequeridos(campoCodigo);
});

campoProducto.addEventListener("blur", () => {
  camposRequeridos(campoProducto);
});

campoDescripcion.addEventListener("blur", () => {
  camposRequeridos(campoDescripcion);
});

campoCantidad.addEventListener("blur", () => {
  validarNumeros(campoCantidad);
});

campoUrl.addEventListener("blur", () => {
  validarUrl(campoUrl);
});

formProducto.addEventListener('submit', guardarProducto);

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
      campoUrl
    )
  ) {
    if (!productoExistente) {
      //crear producto
      crearProducto();
    } else {
      //modificar producto
      modificarProducto();
    }
  }
}

function crearProducto() {
  //crear un objeto producto
  let prodcutoNuevo = new Producto(
    campoCodigo.value,
    campoProducto.value,
    campoDescripcion.value,
    campoCantidad.value,
    campoUrl.value
  );

  listaProductos.push(prodcutoNuevo);
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
  campoUrl.className = "form-contro";
  //reseteamos el estado de la variable bandera
  productoExistente = false;
}

function guardarLocalStorage(){
  localStorage.setItem("arrayProductosKey", JSON.stringify(listaProductos))
}

function crearFila(producto) {
  let tablaProducto = document.getElementById("tablaProducto");
  //usamos el operador de asignacion por adicion para concatenar con lo que ya tengo de contenido de tabla porducto
  tablaProducto.innerHTML += `<tr>
  <td>${producto.codigo}</td>
  <td>${producto.producto}</td>
  <td>${producto.descripcion}</td>
  <td>${producto.cantidad}</td>
  <td>${producto.url}</td>
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
//validaciones
export const camposRequeridos = (input) => {
  if (input.value.trim()?.length > 0) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

export const validarNumeros = (input) => {
  //vamos a crear una expresion regular
  let patron = /^[0-9]{1,3}$/;
  //el metodo test me sirve para comparar un string cualquiera con el patron y devuelve true o false si hay match o no
  //regex.test('string a validar')
  if (patron.test(input.value)) {
    //cuando cumpla con la expresion regular
    input.className = "form-control is-valid";
    return true;
  } else {
    //cuando no cumpla
    input.className = "form-control is-invalid";
    return false;
  }
};

export const validarUrl = (input) => {
  let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (patron.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

export const validarGeneral = (
  campoCodigo,
  campoProducto,
  campoDescripcion,
  campoCantidad,
  campoUrl
) => {
  let alert = document.querySelector("#alert");
  //comprobar que pasen cada una de las validaciones y si no pasan mostrar un alert
  if (
    camposRequeridos(campoCodigo) &&
    camposRequeridos(campoProducto) &&
    camposRequeridos(campoDescripcion) &&
    validarNumeros(campoCantidad) &&
    validarUrl(campoUrl)
  ) {
    alert.className = "alert alert-danger my-3 d-none";
    return true;
  } else {
    alert.className = "alert alert-danger my-3";
    return false;
  }
};

//pueden usar export general como el siguiente
//o anteponer la palabra export en cada definicion de funcion a exportar
//export { camposRequeridos, validarNumeros, validarUrl, validarGeneral };

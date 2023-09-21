export class Producto{
    constructor(parametrocodigo, parametroProducto, parametroDescripcion, parametroCantidad, parametroURL){
        this.codigo = parametrocodigo;
        this.producto = parametroProducto;
        this.descripcion = parametroDescripcion;
        this.cantidad = parametroCantidad;
        this.url = parametroURL;
    }

    //getter

    get mostrarCodigo(){
        return this.codigo;
    }
    get mostrarProducto(){
        return this.producto;
    }
    get mostrarDescripcion(){
        return this.descripcion;
    }
    get mostrarCantidad(){
        return this.cantidad;
    }
    get mostrarUrl(){
        return this.url;
    }

    //setter

    set modificarCodigo(){
        this.codigo = nuevoCodigo;
    }
    set modificarProducto(){
        this.producto = nuevoProducto;
    }
    set modificarDescripcion(){
        this.descripcion = nuevaDescription;
    }
    set modificarCantidad(){
        this.cantidad = nuevaCantidad;
    }
    set modificarUrl(){
        this.url = nuevaUrl;
    }
    
}
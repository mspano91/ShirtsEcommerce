//declaramos el localstorage

let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

//traemos los datos del dom
 const contenedorCarritovacio = document.querySelector("#carrito-vacio");
 const cotenedorCarritoProductos = document.querySelector("#carrito-productos");
 const cotenedorCarritoAcciones = document.querySelector("#carrito-acciones");
 const cotenedorCarritoComprado = document.querySelector("#carrito-comprado");  
 let botonesEliminar = document.querySelector(".carrito-producto-eliminar");
 const botonVaciar= document.querySelector("#carrito-acciones-vaciar")
 const contenedorTotal= document.querySelector(".total0")
 const botonComprar= document.querySelector(".carrito-acciones-comprar")
 

 

 //creamos y los productos en carrito

function cargarProductosCarrito(){

    if(productosEnCarrito && productosEnCarrito.length > 0){

        contenedorCarritovacio.classList.add("disabled");
        cotenedorCarritoProductos.classList.remove("disabled");
        cotenedorCarritoAcciones.classList.remove("disabled");
        cotenedorCarritoComprado.classList.add("disabled");
   
   
        cotenedorCarritoProductos.innerHTML="";
   
        productosEnCarrito.forEach(producto=>{
   
        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = `
   
        <img class="carrito-producto-imagen" src="${producto.imagen}" alt=${producto.titulo}>
        <div class="carrito-producto-titulo">
            <small>Articulo</small>
            <h3>${producto.titulo}</h3>
        </div>
            <div class="carrito-producto-cantidad">
                <small>cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>subtotal</small>
                <p>$${producto.precio*producto.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar id=${producto.id}>
                <i class="bi bi-trash-fill"></i>
                Quitar
            </button>
            `;
            cotenedorCarritoProductos.append(div);
           })
           actualizarTotal()
           actualizarBotonesEliminar();
    }else{
   
       contenedorCarritovacio.classList.remove("disabled");
       cotenedorCarritoProductos.classList.add("disabled");
       cotenedorCarritoAcciones.classList.add("disabled");
       cotenedorCarritoComprado.classList.add("disabled");
    }
}

 cargarProductosCarrito()
 


//eliminar productos del carrito

 function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar"); 

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e){
 const idboton= e.currentTarget.id;
 const index= productosEnCarrito.findIndex( producto => producto.id === idboton);

 productosEnCarrito.splice(index, 1); 
 cargarProductosCarrito();

 localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));


}


botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();

}

function actualizarTotal(){
    const totalCalculado =  productosEnCarrito.reduce((acc,producto) => acc + (producto.precio * producto.cantidad), 0);
    contenedorTotal.innerHTML=  `$${totalCalculado}`;
}


botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito(){

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritovacio.classList.add("disabled");
    cotenedorCarritoProductos.classList.add("disabled");
    cotenedorCarritoAcciones.classList.add("disabled");
    cotenedorCarritoComprado.classList.remove("disabled");
    
}

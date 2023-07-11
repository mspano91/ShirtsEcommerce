

class BaseDeDatos{
    constructor(){
        this.productos = [];

        //Premier legue
        this.agregarRegistro("Camiseta-premier01","Manchester Untd","Home Kit",90,"../img/manchester.jpg","Premier-legue");
        this.agregarRegistro("Camiseta-premier02","Manchester city","Home Kit",90,"../img/Mancity.jpg","Premier-legue");
        this.agregarRegistro("Camiseta-premier03","Liverpool Fc","Home Kit",90,"../img/pool.jpg","Premier-legue");
        this.agregarRegistro("Camiseta-premier04","Totenham spurs","Home Kit",90,"../img/tot.jpg","Premier-legue");
        this.agregarRegistro("Camiseta-premier05","Brigthon Fc","Home Kit",90,"../img/brigthon.png","Premier-legue");
        this.agregarRegistro("Camiseta-premier06","Chelsea Fc","Home Kit",90,"../img/chelsea.png","Premier-legue");
        this.agregarRegistro("Camiseta-premier07","New Castle U.Fc","Home Kit",90,"../img/newcastel.png","Premier-legue");
        this.agregarRegistro("Camiseta-premier08","Arsenal Fc","Home Kit",90,"../img/arsenal.png","Premier-legue",);

        //serie A
        this.agregarRegistro("Camiseta-SerieA01","Juventus","Home Kit",90,"../img/JUVE HOME.png","SerieA");
        this.agregarRegistro("Camiseta-SerieA02","Inter FC","Home Kit",90,"../img/inter home.png","SerieA");
        this.agregarRegistro("Camiseta-SerieA03","AS ROMA","Home Kit",90,"../img/roma home.png","SerieA");
        this.agregarRegistro("Camiseta-SerieA04","US Sasuolo","Home Kit",90,"../img/SAUOLO.PNG","SerieA");
        this.agregarRegistro("Camiseta-SerieA05","Napoli Ss","Home Kit",90,"../img/NAPOLI.PNG","SerieA");
        this.agregarRegistro("Camiseta-SerieA06","AS Milan","Home Kit",90,"../img/MILAN.PNG","SerieA");
        this.agregarRegistro("Camiseta-SerieA07","AC Fiorentina","Home Kit",90,"../img/FIORE.PNG","SerieA");
        this.agregarRegistro("Camiseta-SerieA08","Venezia FC","Home Kit",90,"../img/VENEZIA.PNG","SerieA");

      }

    agregarRegistro(id,nombre,detalle,precio,imagen,categoria){
        const producto = new Producto(id,nombre,detalle,precio,imagen,categoria);
        this.productos.push(producto);
    }

    traerRegistros(){
        return this.productos;
    }

    registroPorId(id) {
        return this.productos.find((producto) => producto.id === id);
      }

      registrosPorNombre(palabra) {
        return this.productos.filter((producto) => producto.nombre.toLowerCase().includes(palabra));
      }

      registrosPorCategoria(categoria) {
        return this.productos.filter((producto) => producto.categoria === categoria);
      }
}




     class Carrito{
        constructor(){
             const carritoStorage = JSON.parse(localStorage.getItem("carrito1"));

             this.carrito = carritoStorage || [];
             this.total = 0
             this.totalProductos = 0;

            this.listar();
         }

        estaEnCarrito({ id }) {
            return this.carrito.find((producto) => producto.id === id);
          }

          agregar(producto) {
            const productoEnCarrito = this.estaEnCarrito(producto);
            if(producto){
              btnVacio.innerHTML="Tu carrito";
              seComp.classList.remove("ocultar");
            }

            if (productoEnCarrito){ 
              productoEnCarrito.cantidad++;
            } else {
                this.carrito.push({ ...producto, cantidad: 1 });
                
    }

         localStorage.setItem("carrito1", JSON.stringify(this.carrito));

         this.listar();
         

}


   quitar(id) {

     const indice = this.carrito.findIndex((producto) => producto.id === id);

     if (this.carrito[indice].cantidad > 1) {
       this.carrito[indice].cantidad--;

     } else {
       this.carrito.splice(indice, 1);
     }

    localStorage.setItem("carrito1", JSON.stringify(this.carrito));

     this.listar();

     


// alerta de eliminando producto
Toastify({
  text: "Product deleted!",
  duration: 3000,
  gravity: 'bottom',
  position: 'right',
  style: {background:"rgb(167, 127, 35)"}
}).showToast();

  

   }



   listar() {
   
      this.total = 0;
      this.totalProductos = 0;
      divCarrito.innerHTML = "";
     for (const producto of this.carrito) {
       divCarrito.innerHTML += `
       <div class="productoCarrito">

       <div class="pictureCart">
       <img class="carrito-producto-imagen" src="${producto.imagen}">
       </div>

      <div class="detallesCart">
       <h2>${producto.nombre}</h2>
       <p>$${producto.precio}</p>
       <p>Cantidad: ${producto.cantidad}</p>
       <a href="#" data-id="${producto.id}" class="btnQuitar">Quitar del carrito</a>
       </div>
       
   </div>
`;

      this.total += producto.precio * producto.cantidad;
      this.totalProductos += producto.cantidad;
     }

    //botones quitar producto en carrito
     const botonesQuitar = document.querySelectorAll(".btnQuitar");
    for (const boton of botonesQuitar) {
        boton.onclick = (event) => {
        event.preventDefault()
        this.quitar(boton.dataset.id);
      };
    }

     spanCantidadProductos.innerText = this.totalProductos;
     spanTotalCarrito.innerText = this.total;

   }

   vaciar(){
    this.carrito = [];
    localStorage.removeItem("carrito1");
    this.listar();
   }
  }





// Clase "molde" para los productos
class Producto {
    constructor(id,nombre,detalle,precio,imagen,categoria) {
      this.id = id;
      this.nombre = nombre;
      this.detalle=detalle;
      this.precio = precio;
      this.imagen = imagen;
      this.categoria = categoria;
    }
  }


  const bd = new BaseDeDatos();

  // conectamos el dom para renderizamos los productos y el carrito
  const divProductos = document.querySelector("#contenedor-productos");
  const divCarrito = document.querySelector(".carrito-producto");

  //conexion con los valores del carrito
  const spanCantidadProductos = document.querySelector("#cantidadProductos");
  const numerito = document.querySelector("#numerito")
  const spanTotalCarrito = document.querySelector("#totalCarrito");
  const btnVacio = document.querySelector(".carrito-vacio")
  const seComp = document.querySelector("#carrito-acciones")
  const BotonCart = document.querySelector(".appear")

  const divCarro = document.querySelector(".contenedor-carrito")

  //modo oscuro
  const modOscuro = document.querySelector("#oscuro")




 



  // Llamamos a la función
  cargarProductos(bd.traerRegistros());


//renderizamos los productos de la base de datos
  function cargarProductos(productos) {

    divProductos.innerHTML = "";
    
    for (const producto of productos) {
      divProductos.innerHTML += `
          <div class="producto">
          <img class="imagen-prod" src="${producto.imagen}">
          <div class="producto-detalles">
          <h3 class="producto-titulo">${producto.nombre}  ${producto.detalle}</h3>
          <p class="producto-precio">$${producto.precio}</p>
          <button class="producto-agregar" data-id="${producto.id}">agregar</button>
          </div>
          </div>
          `;
    }

    //boton agregar de cada producto
    const botonesAgregar = document.querySelectorAll(".producto-agregar");

    for (const boton of botonesAgregar) {
      boton.addEventListener("click", (event) => {
        event.preventDefault();
        const id = (boton.dataset.id);
        const producto = bd.registroPorId(id);
        carrito.agregar(producto);

        //alerta de agregado al carrito
        Toastify({
          text: "Has been added!",
          duration: 3000,
          gravity: 'bottom',
          position: 'right',
          style: {background:"#037bf2"}
      }).showToast();

      }
      );
    }
  }

  



//seleccionar categorias
const botonesCategorias = document.querySelectorAll(".botones-categoria");
  
botonesCategorias.forEach(boton => {
  boton.addEventListener("click", (event)=>{
      event.preventDefault();

      const id = boton.id;
      const producto = bd.registrosPorCategoria(id);
 
    //aca filtramos las categorias por id
      if(id!="todos"){
        cargarProductos(producto)
      }
      else{cargarProductos(bd.productos)}
  })
})


// funcion buscar
const inputBuscar = document.querySelector("#inputBuscar");

  inputBuscar.addEventListener("keyup", (event) => {
    event.preventDefault();
    const palabra = inputBuscar.value;
    const productos = bd.registrosPorNombre(palabra.toLowerCase());
    cargarProductos(productos);
  });



  //alerta de compra exitosa!
  const btnComprar = document.querySelector("#btnComprar");

  btnComprar.addEventListener("click", (event)=>{
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'your purchase was successful! ',
      showConfirmButton: false,
      timer: 1800
    })
    carrito.vaciar();
    seComp.classList.add("ocultar")
    btnVacio.innerHTML="Tu carrito esta vacio";
  })

  modOscuro.addEventListener("click", (e)=>{
    document.querySelector(".Maintodo").classList.toggle("oscuro");
  })

  BotonCart.addEventListener("click", (e) => {
    document.querySelector(".contenedor-carrito").classList.toggle("ocultar");
  });

  const carrito = new Carrito();

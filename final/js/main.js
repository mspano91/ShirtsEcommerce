// productos AARAY DE OBJETOS

const productos= [

{
    id:"Camiseta-premier01",
    titulo: "Manchester Untd",
    detalle:"Home Kit",
    precio:90,
    imagen:"../img/manchester.jpg",
    categoria:{
        nombre:"premier legue",
        id:"Premier-legue",
    },
},

{
    id:"Camiseta-premier02",
    titulo:"Manchester city",
    detalle:"Home Kit",
    precio:90,
    imagen:"../img/Mancity.jpg",
    categoria:{
        nombre:"premier legue",
        id:"Premier-legue",
    },

},


{
    id:"Camiseta-premier03",
    titulo:"Liverpool Fc",
    detalle:"Home Kit",
    precio:90,
    imagen:"../img/pool.jpg",
    categoria:{
        nombre:"premier legue",
        id:"Premier-legue",
    },
},


{
    id:"Camiseta-premier04",
    titulo:"Totenham spurs",
    detalle:"Home Kit",
    precio:90,
    imagen:"../img/tot.jpg",
    categoria:{
        nombre:"premier legue",
        id:"Premier-legue",
    },
},


{
    id:"Camiseta-premier05",
    titulo:"Brigthon Fc",
    detalle:"Home Kit",
    precio:90,
    imagen:"../img/brigthon.png",
    categoria:{
        nombre:"premier legue",
        id:"Premier-legue",
    },
},


{
    id:"Camiseta-premier06",
    titulo:"Chelsea Fc",
    detalle:"Home Kit",
    precio:90,
    imagen:"../img/chelsea.png",
    categoria:{
        nombre:"premier legue",
        id:"Premier-legue",
    },
},


{
    id:"Camiseta-premier07",
    titulo:"Arsenal Fc",
    detalle:"Home Kit",
    precio:90,
    imagen:"../img/arsenal.png",
    categoria:{
        nombre:"premier legue",
        id:"Premier-legue",
    },
},


{
    id:"Camiseta-premier08",
    titulo:"New Castle U.Fc",
    detalle:"Home Kit",
    precio:90,
    imagen:"../img/newcastel.png",
    categoria:{
        nombre:"premier legue",
        id:"Premier-legue",
    },
},




// SERIE A OBJETOS

{
    id:"Camiseta-SerieA01",
    titulo:"Juventus",
    detalle:"Home Kit",
    precio:90,
    imagen:"../img/JUVE HOME.png",
    categoria:{
        nombre:"SerieA",
        id:"SerieA",
    },
},

{
    id:"Camiseta-SerieA02",
    titulo:"Inter FC",
    detalle:"Home Kit",
    precio:90,
    imagen:"../img/inter home.png",
    categoria:{
        nombre:"SerieA",
        id:"SerieA",
    },
},


{
    id:"CamisetaSerieA03",
    titulo:"AS ROMA",
    detalle:"Home Kit",
    precio:90,
    imagen:"../img/roma home.png",
    categoria:{
        nombre:"SerieA",
        id:"SerieA",
    },

},


{
    id:"CamisetaSerieA04",
    titulo:"US Sasuolo",
    detalle:"Home Kit",
    precio:90,
    imagen:"../img/SAUOLO.PNG",
    categoria:{
        nombre:"SerieA",
        id:"SerieA",
    },
},

{
    id:"CamisetaSerieA05",
    titulo:"Napoli Ss",
    detalle:"Home Kit",
    precio:90,
    imagen:"../img/NAPOLI.PNG",
    categoria:{
        nombre:"SerieA",
        id:"SerieA",
    },
},

{
    id:"CamisetaSerieA06",
    titulo:"AS Milan",
    detalle:"Home Kit",
    precio:90,
    imagen:"../img/MILAN.PNG",
    categoria:{
        nombre:"SerieA",
        id:"SerieA",
    },
},

{
    id:"Camiseta-SerieA07",
    titulo:"AC Fiorentina",
    detalle:"Home Kit",
    precio:90,
    imagen:"../img/FIORE.PNG",
    categoria:{
        nombre:"SerieA",
        id:"SerieA",
    },
},

{
    id:"Camiseta-SerieA08",
    titulo:"Venezia FC",
    detalle:"Home Kit",
    precio:90,
    imagen:"../img/VENEZIA.PNG",
    categoria:{
        nombre:"SerieA",
        id:"SerieA",
    },
},
];


// CONECTAMOS con el DOM
const contenedorProductos = document.querySelector("#contenedor-productos"); 
const botonesCategorias = document.querySelectorAll(".botones-categoria");
let botonesAgregar = document.querySelectorAll(".producto-agregar"); 
const numerito = document.querySelector("#numerito")


//creamos los productos
function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="imagen-prod" src="${producto.imagen}" alt=${producto.titulo}>
        <div class="producto-detalles">
        <h3 class="producto-titulo">${producto.titulo}  ${producto.detalle}</h3>
        <p class="producto-precio">$${producto.precio}</p>
        <button class="producto-agregar" id="${producto.id}" >agregar</button>
        </div>
        `;

        contenedorProductos.append(div);
    })

actualizarBotonesAgregar();

}

cargarProductos(productos);


// filtramos los botones de las categorias///////////////////


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e)=>{
        const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosBoton);
    })
})


function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar"); 
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
    
}

//llevamos los productos con el local storage al carrito

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
    productosEnCarrito =  JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = [];
}

//Agregamos los productos al carrito

        function agregarAlCarrito(e){

            const idboton = e.currentTarget.id;
            const productoAgregado = productos.find(producto => producto.id === idboton);

                    if(productosEnCarrito.some(producto => producto.id===idboton)){
                 const index = productosEnCarrito.findIndex(producto => producto.id === idboton);
                 productosEnCarrito[index].cantidad++;

             }else{
                 productoAgregado.cantidad=1; 
                 productosEnCarrito.push(productoAgregado)
                 
             }

             actualizarNumerito()
         
          
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
          
            

 }

  function actualizarNumerito() {
     let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
     console.log(nuevoNumerito)
     numerito.innerText = nuevoNumerito;

 } 
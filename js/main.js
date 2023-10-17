let productos = [];
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    });

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");

// create a function that adds the selected products to the dome
function cargarProductos(productos) {
    contenedorProductos.innerHTML = "";
    productos.forEach(producto => {
        
        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio}€</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
        
    })
    actualizarBotonesAgregar();

}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id==="todos") {
            tituloPrincipal.textContent = "Todos los productos";
            cargarProductos(productos);
            
    }else{
            let categoria = e.currentTarget.id;
            let productosFiltrados = productos.filter(producto => producto.categoria.id === categoria);
            let Categoria=productosFiltrados[0].categoria.nombre;
            tituloPrincipal.textContent=(Categoria)
           
            cargarProductos(productosFiltrados);
        }
       
    
        
    })
})

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
console.log(productosEnCarritoLS);
if(productosEnCarritoLS){
    productosEnCarrito = productosEnCarritoLS;
    actualizarNumerito();
}else{
    productosEnCarrito=[];
}

function agregarAlCarrito(e) {
    Toastify({
        text: `${e.currentTarget.id} ---> carrito`,
        duration: 1000,
        destination: "https://av3ca3sar.github.io",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #4b33a8, #785ce9)",
            borderRadius: "1rem",
            textTransform: "uppercase",
            color: "white",
        },
        offset: {
            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 70 // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
        }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.includes(productoAgregado)) {
        const index = productosEnCarrito.indexOf(productoAgregado);
        productosEnCarrito[index].cantidad++;

    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    

    
}

function actualizarNumerito() {
    const numero = document.querySelector("#numerito");
    const numero2 = document.querySelector("#numerito2");
    
    numero.textContent = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero2.textContent = numero.textContent;

}
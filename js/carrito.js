const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));
const contenedorCarritoVacio= document.querySelector("#carrito-vacio");
const contenedorCarritoProductos= document.querySelector("#carrito-productos");
const contenedorCarritoAcciones= document.querySelector("#carrito-acciones");
const contenedorCarritoComprado= document.querySelector("#carrito-comprado");
const contenedorTotal = document.querySelector("#total");
const botonVaciarCarrito = document.querySelector("#vaciar-carrito");
const botonComprar = document.querySelector("#carrito-acciones-comprar")
let botonesEliminar=document.querySelectorAll(".carrito-producto-eliminar");

botonVaciarCarrito.addEventListener("click", ()=>{
   eliminarTodoElCarrito();
} )

botonComprar.addEventListener("click", ()=>{
   comprar();
} )

cargarProductosCarrito();

function cargarProductosCarrito(){
    

    if(productosEnCarrito && productosEnCarrito.length > 0){
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML="";
       
        
       
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}<h3>
                </div></h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad} unidades</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>${producto.precio}€</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>${producto.precio * producto.cantidad}€</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}" title="Eliminar producto"><i class="bi-trash-fill"></i></button>
            `;
             
    
    
    
            contenedorCarritoProductos.append(div);

    
            const botonEliminar = document.querySelector(`#${producto.id}`);    
            botonEliminar.addEventListener("click", () => {
                eliminarDelCarrito(producto.id);
            });
    

        
    
        });
        actualizarTotal();
    
        
        
    }else{
        contenedorCarritoProductos.innerHTML="";
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
};

function eliminarTodoElCarrito(){

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html:`Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos del carrito`,
        showCloseButton: false,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          'Sí',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          'No',
        cancelButtonAriaLabel: 'Thumbs down'
      }).then((result) => {
        if (result.isConfirmed) {
            
            productosEnCarrito.length=0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();


          Swal.fire(
            'Borrados!',
            'Puedes seguir comprando.',
            'success'
          )
        }
      })

};
function comprar(){
    productosEnCarrito.length=0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
    
};

function eliminarDelCarrito(e){
    let productoEliminado = productosEnCarrito.find(producto => producto.id === e);
    

    Toastify({
        text: `${productoEliminado.titulo} ---> eliminado`,
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

    const index = productosEnCarrito.findIndex(producto => producto.id === e);
    productosEnCarrito.splice(index, 1);
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
    // actualizarNumerito();

};

function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    contenedorTotal.innerText = `${totalCalculado}€`;
}

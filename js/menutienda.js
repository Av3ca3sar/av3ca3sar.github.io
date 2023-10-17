const botonCloseMenu = document.querySelector("#close-menu");
const contenedorAside = document.querySelector("aside");
const botonOpenMenu = document.querySelector("#open-menu");


botonCloseMenu.addEventListener("click", () => {
    contenedorAside.classList.remove("aside-visible");
});

botonOpenMenu.addEventListener("click", () => {
    contenedorAside.classList.add("aside-visible");
    console.log("activado")
});

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", () => {
        contenedorAside.classList.remove("aside-visible");
    });
});

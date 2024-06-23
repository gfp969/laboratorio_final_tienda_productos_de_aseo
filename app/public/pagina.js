let carritovista = false;

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    let botoneliminar = document.getElementsByClassName('eliminar-product')
    for (i = 0; i < botoneliminar.length; i++) {
        let boton = botoneliminar[i];
        boton.addEventListener('click', eliminarproductocarrito)
    }

    let botonSumar = document.getElementsByClassName('sumar-cantidad');
    for (let i = 0; i < botonSumar.length; i++) {
        let buton = botonSumar[i];
        buton.addEventListener('click', sumarCantidad);
    }

    let botonRestar = document.getElementsByClassName('menos-cantidad');
    for (let i = 0; i < botonRestar.length; i++) {
        let buton = botonRestar[i];
        buton.addEventListener('click', restarCantidad);
    }

    let botonesAgregarCarrito = document.getElementsByClassName('botonproduct');
    for (let i = 0; i < botonesAgregarCarrito.length; i++) {
        let buton = botonesAgregarCarrito[i];
        buton.addEventListener('click', agregarProductCarrito);
    }

    document.getElementsByClassName('pagar-products')[0].addEventListener('click', pagarPorFin)
}

function pagarPorFin(event){
    alert("Gracias por su compra");

    let carritoproductos = document.getElementsByClassName('carritoproducts')[0];
    while (carritoproductos.hasChildNodes()){
        carritoproductos.removeChild(carritoproductos.firstChild);
    }
    actualizarpreciofinal();
    ocultarcarrito();
}

function agregarProductCarrito(event) {
    let buton = event.target;
    let item = buton.parentElement;
    let titulo = item.getElementsByClassName('titulo_product')[0].innerText;
    console.log(titulo);
    let precio = item.getElementsByClassName('precioproduct')[0].innerText;
    let imagen = item.getElementsByClassName('imgproduct')[0].src;
    console.log(imagen);

    agregarProductAlCarrito(titulo, precio, imagen);
}

function agregarProductAlCarrito(titulo, precio, imagen) {
    let item = document.createElement('div');
    item.classList.add = 'item';
    let itemscarrito = document.getElementsByClassName('carritoproducts')[0];

    let nombresProducts = itemscarrito.getElementsByClassName('carrito-titulo');
    for (let i = 0; i < nombresProducts.length; i++) {
        if (nombresProducts[i].innerText == titulo) {
            alert('el item ya esta');
            return;
        }
    }

    let itemCarritoContent = ` 
        <div class="carritoproduct">
            <img src="${imagen} " alt="" width="80px">
            <div class="carrito-descripcion-detalles">
                <span class="carrito-titulo">${titulo}</span>
                <div class="seleccionar-cantidad">
                    <i class="fa-solid fa-minus menos-cantidad"></i>
                    <input type="text" value="1" class="carrito-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-product-precio">${precio}</span>
            </div>
            <span class="eliminar-product">
                <i class="fa-solid fa-trash"></i>
            </span>
        </div>
    `
    item.innerHTML=itemCarritoContent;
    itemscarrito.append(item);

    item.getElementsByClassName('eliminar-product')[0].addEventListener('click',eliminarproductocarrito);

    let botonSumar = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumar.addEventListener('click', sumarCantidad);

    let botonRestar = item.getElementsByClassName('menos-cantidad')[0];
    botonRestar.addEventListener('click', restarCantidad);
}

function sumarCantidad(event) {
    let butonclick = event.target;
    let selector = butonclick.parentElement;
    let cantidadReciente = selector.getElementsByClassName('carrito-cantidad')[0].value;
    console.log(cantidadReciente);
    cantidadReciente++;
    selector.getElementsByClassName('carrito-cantidad')[0].value = cantidadReciente;

    actualizarpreciofinal();
}

function restarCantidad(event) {
    let butonclick = event.target;
    let selector = butonclick.parentElement;
    let cantidadReciente = selector.getElementsByClassName('carrito-cantidad')[0].value;
    console.log(cantidadReciente);
    cantidadReciente--;

    if (cantidadReciente >= 1) {
        selector.getElementsByClassName('carrito-cantidad')[0].value = cantidadReciente;

        actualizarpreciofinal();
    }
}

function eliminarproductocarrito(event) {
    let botonclick = event.target;
    botonclick.parentElement.remove();

    actualizarpreciofinal();
    ocultarcarrito();
}

function ocultarcarrito() {
    let carritoElementos = document.getElementsByClassName('carritoproduct')[0];
    if (carritoElementos.childElementCount == 0) {
        let carrito = document.getElementsByClassName('carritogeneral')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritovista = false;

        let items = document.getElementsByClassName('container_products')[0];
        items.style.width = '100%';
    }
}

function actualizarpreciofinal() {
    let carritoCont = document.getElementsByClassName('carritogeneral')[0];
    let carritoproducts = carritoCont.getElementsByClassName('carritoproduct');
    let total = 0;

    for (var i = 0; i < carritoproducts.length; i++) {
        let product = carritoproducts[i];
        let preciofinal = product.getElementsByClassName('carrito-product-precio')[0];
        console.log(preciofinal);

        let price = parseFloat(preciofinal.innerText.replace('$', '').replace('.', ''));
        console.log(price);

        let cantidadproduct = product.getElementsByClassName('carrito-cantidad')[0];
        let cantidad = cantidadproduct.value;
        console.log(cantidad);

        total = total + (price * cantidad);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('carrito-total-final')[0].innerText = '$' + total.toLocaleString('es') + ',00';
}

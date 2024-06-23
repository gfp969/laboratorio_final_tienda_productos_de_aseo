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

    let botonSumar=document.getElementsByClassName('sumar-cantidad');
    for(let i=0;i<botonSumar.length;i++){
        let buton = botonSumar[i];
        buton.addEventListener('click', sumarCantidad);
    }
}
function eliminarproductocarrito(event) {
    let botonclick = event.target;
    botonclick.parentElement.remove();

    actualizarpreciofinal();
    ocultarcarrito();
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

function ocultarcarrito() {
    let carritoElementos = document.getElementsByClassName('carritoproducts')[0];
    if (carritoElementos.childElementCount == 0) {
        let carrito = document.getElementsByClassName('carritogeneral')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritovista = false;

        let items = document.getElementsByClassName('container_products')[0];
        items.style.width = '100%';
    }
}

function sumarCantidad(event){
    let butonclick = event.target;
    let selector = butonclick.parentElement;
    let cantidadReciente = selector.getElementsByClassName('carrito-cantidad')[0].value;
    console.log(cantidadReciente);
    cantidadReciente++;
    selector.getElementsByClassName('carrito-cantidad')[0].value=cantidadReciente;

    actualizarpreciofinal();
}
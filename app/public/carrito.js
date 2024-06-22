function agregaralcarrito (producto){
    const memoria = localStorage.getItem('productosDeAseo');
    console.log(memoria);
    if(memoria){
        const nuevoproducto = producto;
        nuevoproducto.cantidad = 1;
        localStorage.setItem('productos de aseo',JSON.stringify[nuevoproducto]);
    }
}
const express=require("express");

//servidor
const app=express();
app.set("port",4000);
app.listen(app.get("port"));
console.log("servidor esuchando en puerto",app.get("port"));

//configuraciones
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/img"));

//rutas
app.get("/",(req,res)=>res.sendFile(__dirname + "/pages/index.html"));
app.get("/carrito",(req,res)=>res.sendFile(__dirname + "/pages/carrito.html"));
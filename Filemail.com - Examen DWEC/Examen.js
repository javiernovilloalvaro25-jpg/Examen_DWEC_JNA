
let contador = 0;
let usuarios = [];
let ultimoGeneradoMuchos = false;

class Usuario {
  constructor(id, nombre, edad, email, activo, fecha) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.email = email;
    this.activo = activo;   
    this.fecha = fecha;
  }

  presentar() {
    const estado = this.activo ? "activo" : "inactivo";
    return `Hola, soy ${this.nombre}, tengo ${this.edad} años y estoy ${estado}.`;
  }
}

function generarNombre() {
  const nombres = ["Javier", "Oscar", "Mauri", "Ruben", "Alejandro", "Pablo"];
  const apellidos = ["García", "Novillo", "Saez", "Matos", "Perez"];
  const nombre = nombres[Math.floor(Math.random() * nombres.length)];
  const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
  return `${nombre} ${apellido}`;
}

function generarEmail(nombre, usados) {
  let base = nombre.toLowerCase().replace(/\s+/g, ".");
  let intento = 1;
  let user = base;

  while (usados.has(user)) {
    user = base + intento;
    intento++;
  }

  usados.add(user);
  return `${user}@correo.com`;
}

function generarUsuarios() {
  let cantidad = prompt("¿Cuántos usuarios deseas generar? (1–20)");

  cantidad = Number(cantidad);

  if (Number.isNaN(cantidad) || cantidad <= 0) {
    alert("Introduce un número válido.");
    return;
  }

  if (cantidad > 20) {
    alert("Máximo 20. Se generarán 20.");
    cantidad = 20;
  }

  usuarios = [];
  contador = 0;

  const usados = new Set();

  for (let i = 0; i < cantidad; i++) {
    contador++;

    const nombre = generarNombre();
    const edad = Math.floor(Math.random() * 60) + 18;
    const email = generarEmail(nombre, usados);
    const activo = Math.random() > 0.3;
    const fecha = new Date();

    const user = new Usuario(contador, nombre, edad, email, activo, fecha);
    usuarios.push(user);
  }

  ultimoGeneradoMuchos = usuarios.length >= 10;
  mostrarUsuarios();
}

function mostrarUsuarios() {
  const cont = document.getElementById("contenedor-tarjetas");
  cont.innerHTML = "";

  usuarios.forEach(usuario => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta");

   

    const h2 = document.createElement("h2");
    h2.textContent = usuario.nombre;

    const p1 = document.createElement("p");
    p1.innerHTML = `<strong>Email:</strong> ${usuario.email}`;

    const p2 = document.createElement("p");
    p2.innerHTML = `<strong>Edad:</strong> ${usuario.edad}`;

    
    const pEstado = document.createElement("p");
    pEstado.innerHTML = `<strong>Estado:</strong> ${usuario.activo ? "Activo" : "Inactivo"}`;

    const p3 = document.createElement("p");
    p3.innerHTML = `<strong>Fecha registro:</strong> ${usuario.fecha.toLocaleDateString()}`;

    tarjeta.appendChild(h2);
    tarjeta.appendChild(p1);
    tarjeta.appendChild(p2);
    tarjeta.appendChild(pEstado); 
    tarjeta.appendChild(p3);

    cont.appendChild(tarjeta);
  });

  cont.style.border = ultimoGeneradoMuchos
    ? "3px solid #007bff"
    : "1px solid #ccc";
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("generar-btn").addEventListener("click", () => {
    generarUsuarios();
  });
});









let videojuegos = [];


let form = document.getElementById("form-anadir");

let LS = window.localStorage;
if (LS.getItem('videojuegos')) {
    videojuegos = JSON.parse(LS.getItem('videojuegos'));
}

imprimirV(videojuegos);

form.addEventListener('submit', e =>{
    e.preventDefault();
    agregarV();
})

function agregarV(){
    const nombre = document.getElementById("nombres").value;
    const tematica = document.getElementById("tematica").value;
    const valor = document.getElementById("valor").va;
    const puntos = document.getElementById("puntos").value;

    let nuevoV = {
        id: Date.now(),
        nombre,
        tematica,
        valor,
        puntos
    }

    videojuegos.push(nuevoV);

    LS.setItem('videojuegos', JSON.stringify(videojuegos));

    imprimirV(videojuegos);
}

function imprimirV(dic){
    let tabla = document.getElementById("tabla-vid");
    tabla.innerHTML = "";

    dic.forEach(videojuego => {
        tabla.innerHTML += `
        <tr>
        <td>${videojuego.id}</td>
        <td>${videojuego.nombre}</td>
        <td>${videojuego.tematica}</td>
        <td>${videojuego.valor}</td>
        <td>${videojuego.puntos}</td>
        <td class="">
        <div class="d-flex justify-content-center align-items-center">
        <button class="btn btn-danger" onclick="eliminar(${videojuego.id})"> B </button>
        </div>
        </td>
        </tr>
        `
    });
}

function eliminar(id){
    videojuegos = videojuegos.filter(videojuego => videojuego.id !== id)
    LS.setItem('videojuegos', JSON.stringify(videojuegos));
    imprimirV(videojuegos)
}
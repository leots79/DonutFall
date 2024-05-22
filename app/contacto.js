let DB;

const formulario = document.querySelector('#contacto-nuevo')
formulario.addEventListener('submit', crearContacto)

window.onload = () => {
    crearDB();

  }

  function crearDB() {
    const crearDB = window.indexedDB.open("contacto", 1)
     crearDB.onerror = () =>{
        console.log("Hay un error")
     }

     crearDB.onsuccess = () => {
        DB = crearDB.result;
     }

     crearDB.onupgradeneeded = (evento) =>{
        const db = evento.target.result
        const objectStore = db.createObjectStore("contacto", {
            keyPath: "contacto",
            autoIncrement: true
        })

        objectStore.createIndex("nombre", "nombre", {unique: false})
        objectStore.createIndex("email", "email", {unique: true})
        objectStore.createIndex("mensaje", "mensaje", {unique: false})

        console.log("Base de datos creada con exito")
    }
  }

  function crearContacto (e){
    e.preventDefault();

    let transaction = DB.transaction(["contacto"], "readwrite")
    transaction.oncomplete = function (){
        console.log("Transaccion completada")
    }

    transaction.onerror = function (){
        console.log("Hubo un error en la transaccion")
    }

    const objectStore = transaction.objectStore("contacto")
    const nuevoContacto = {
        nombre: document.querySelector('#nombre').value,
        correo: document.querySelector('#email').value,
        mensaje: document.querySelector('#mensaje').value
    }

    console.log(nuevoContacto)

    const peticion = objectStore.add(nuevoContacto);
    console.log(peticion);

    window.alert("Recibimos tu mensaje  ");
  }
document.addEventListener("DOMContentLoaded", function() {

    // Seleccionar los Elementos de la interfaz
    const inputEmail = document.querySelector("#email");
    // console.log(inputEmail);
    const inputAsunto = document.querySelector("#asunto");
    // console.log(inputAsunto);
    const inputMensaje = document.querySelector("#mensaje"); 
    // console.log(inputMensaje);
    const formulario = document.querySelector("#formulario");



    // Asignacion de Eventos
    /*
    inputEmail.addEventListener("blur", function(e) {
        // console.log("Salí del Input");
        // console.log(e.target.value); // Imprime el valor de que se escribe en el Input
    });
    */

    // Manera más Reducida de Asiganar Eventos
    inputEmail.addEventListener("blur", validar);
    inputAsunto.addEventListener("blur", validar);
    inputMensaje.addEventListener("blur", validar);

    function validar(e){
        // console.log(e.target.value);
        // console.log(e.target.id);
        // console.log(e.target.parentElement.NextElementSibling);
        if(e.target.value.trim() === ''){ // trim Validará que no tenga Espacios en Blanco 
            mostrarAlerta(`El Campo ${e.target.id} es Obligatorio.`, e.target.parentElement);
        }else{
            console.log("Si existe algo");
        }
    }

    function mostrarAlerta(mensaje, referencia) {

        // Cumprueba si ya Existe una Alerta
        const alerta = referencia.querySelector('.bg-red-600');
         // console.log(alerta);
         if(alerta){ // Si la Alerta ya Existe, Removera la Alerta Duplicada
            alerta.remove();
         }

        // console.log("Hubo un Error...");
        const error = document.createElement('P'); // Es recomendable que la Etiqueta HTML sea Mayuscula
        error.textContent = mensaje;
        // console.log(error);
        error.classList.add('bg-red-600', 'text-waith', 'p-2', 'text-center');
        // Inyectar el Error al Formulario
        // formulario.innerHTML = error.textContent;
        referencia.appendChild(error);
        
    }

});
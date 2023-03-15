document.addEventListener("DOMContentLoaded", function() {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }
    console.log(email);
    // Seleccionar los Elementos de la interfaz
    const inputEmail = document.querySelector("#email");
    // console.log(inputEmail);
    const inputAsunto = document.querySelector("#asunto");
    // console.log(inputAsunto);
    const inputMensaje = document.querySelector("#mensaje"); 
    // console.log(inputMensaje);
    const formulario = document.querySelector("#formulario");
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const sppiner = document.querySelector('#spinner');



    // Asignacion de Eventos
    /*
    inputEmail.addEventListener("blur", function(e) {
        // console.log("Salí del Input");
        // console.log(e.target.value); // Imprime el valor de que se escribe en el Input
    });
    */

    // Manera más Reducida de Asiganar Eventos
    /*
    inputEmail.addEventListener("blur", validar);
    inputAsunto.addEventListener("blur", validar);
    inputMensaje.addEventListener("blur", validar);
    */
   // Con Input da una esperiencia más "En Timepo Real"
    inputEmail.addEventListener("input", validar);
    inputAsunto.addEventListener("input", validar);
    inputMensaje.addEventListener("input", validar);
    
    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        resetFormulario();
    });

    function enviarEmail(e) {
        e.preventDefault();
        // console.log("Enviando...")
        sppiner.classList.add('flex');
        sppiner.classList.remove('hidden');
        // Tiempo que tarda en estar ahí el Sppiner y Resetear el Formulario
        setTimeout(() => {
            sppiner.classList.remove('flex');
            sppiner.classList.add('hidden');
            resetFormulario();

            // Crear una Alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = "Mensaje Enviado Correctamente!!";
            formulario.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.remove();
            }, 2000);
        }, 3000);
    }

    function validar(e){
        // console.log(e.target.value);
        // console.log(e.target.id);
        // console.log(e.target.parentElement.NextElementSibling);
        if(e.target.value.trim() === ''){ // trim Validará que no tenga Espacios en Blanco 
            mostrarAlerta(`El Campo ${e.target.id} es Obligatorio.`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return; // Detiene la Ejecución del Codigo
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)){ // Valida que el Email este escrito de Manera Correcta
            mostrarAlerta(`El Email No es Valido.`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement);// Función que Limpia la Alerta en Especifico
        //console.log("Despues del IF");

        // Asignar Valores al Objeto
        email[e.target.name] = e.target.value.trim().toLowerCase();
        // console.log(email);
        // Comprobar el Objeto de Email
        comprobarEmail();
    

    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);

        // console.log("Hubo un Error...");
        const error = document.createElement('P'); // Es recomendable que la Etiqueta HTML sea Mayuscula
        error.textContent = mensaje;
        // console.log(error);
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        // Inyectar el Error al Formulario
        // formulario.innerHTML = error.textContent;
        referencia.appendChild(error);   
    }

    function limpiarAlerta(referencia){
        // Cumprueba si ya Existe una Alerta
        const alerta = referencia.querySelector('.bg-red-600');
         // console.log(alerta);
         if(alerta){ // Si la Alerta ya Existe, Removera la Alerta que ya se ha llenado
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/; // Expresión Regular para Validar un Email
        const resultado = regex.test(email); // Devuelve true o false Dependiendo si cumple o no
        //console.log(resultado);
        return resultado;
    }

    function comprobarEmail(){
        // console.log(Object.values(email).includes('')); // Toma todos los valores del Objeto y lo tranforma en Arreglo y con includes retorna true o false
        // console.log(email);
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;   
    }
    // Reincia el Objeto y Resetea el Formulario
    function resetFormulario(){
        // Reiniciar el Objeto
        email.email = ''; 
        email.asunto = ''; 
        email.mensaje = ''; 
        formulario.reset();
        comprobarEmail();
    }


});
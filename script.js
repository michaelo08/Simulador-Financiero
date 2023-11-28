function handleButtonClick() {
    // Muestra el contenedor de carga
    var loadingContainer = document.querySelector('.loading-container');

    // Agrega las propiedades de alineación
    loadingContainer.style.display = 'flex';
    loadingContainer.style.justifyContent = 'center';
    loadingContainer.style.alignItems = 'center';
    loadingContainer.style.textAlign = 'center';
    loadingContainer.style.height = '80%';

    // Oculta el botón durante el tiempo de carga (opcional)
    var btn = document.querySelector('.btn');
    btn.style.display = 'none';
    var contentresult = document.querySelector('.container-simulator-result');


    var btnabono = document.querySelector('.btn-abono');

    var groupinputs = document.querySelector('.input-group');
    groupinputs.style.display = 'none';
    var contentinput = document.querySelector('.content-inputs');
    contentinput.style.display = 'none';
    
    var title = document.querySelector('.form-title');
    title.style.display = 'none';

    // Capturar los valores de los campos de entrada
    var capital = parseFloat(document.getElementById('Capital').value);
    var tasaAnual = parseFloat(document.getElementById('tasa').value);

    // Verificar si la tasa de interés está en formato decimal y convertirla a porcentaje
    if (isNaN(tasaAnual) || tasaAnual < 0) {
        // Mostrar un mensaje de error o tomar alguna acción apropiada
        console.error('Error: La tasa de interés ingresada no es válida.');
        return;
    }

    // Convertir a porcentaje si es necesario
    var tasaInteres = tasaAnual / 100;

    var plazoPrestamo = parseFloat(document.getElementById('plazoPrestamo').value);
    var frecuenciaPago = document.getElementById('frecuenciaPago').value;
    var fechaInicio = new Date(document.getElementById('fechaInicio').value);


    var totalcuotas = document.querySelector('.totalcuotas');
    var Intereses = document.querySelector('.Intereses');
    totalcuotas.style.display = 'block';
    Intereses.style.display = 'block';



    // Limpiar la tabla de amortización
    document.getElementById('tablaAmortizacion').innerHTML = '<thead><tr><th>Número de Cuota</th><th>Fecha de Pago</th><th>Valor de la Cuota</th><th>Interés</th><th>Amortización</th><th>Saldo</th></tr></thead><tbody></tbody>';

    // Calcular la fórmula de interés compuesto y generar la tabla de amortización
    var tablaAmortizacion = document.getElementById('tablaAmortizacion').getElementsByTagName('tbody')[0];

    // Frecuencia de pagos por año
    var frecuenciaPorAnio = {
        mensual: 12,
        trimestral: 4,
        semestral: 2
    };

    var cuotasTotales = plazoPrestamo * frecuenciaPorAnio[frecuenciaPago];
    var valorCuota = calcularCuotaMensual(capital, tasaInteres, plazoPrestamo, frecuenciaPorAnio[frecuenciaPago]);
    
    var numeroCuotasTotal = cuotasTotales;
    var sumaInteresesTotal = 0;

    for (var cuota = 1; cuota <= cuotasTotales; cuota++) {
        var interes = capital * tasaInteres / frecuenciaPorAnio[frecuenciaPago];
        var amortizacion = valorCuota - interes;
        var saldo = capital - amortizacion;
        sumaInteresesTotal += interes;
        // Calcular la fecha de pago
        var fechaPago = new Date(fechaInicio);
        fechaPago.setMonth(fechaPago.getMonth() + cuota - 1);

        // Agregar fila a la tabla
        var fila = tablaAmortizacion.insertRow();
        fila.insertCell(0).innerText = cuota;
        fila.insertCell(1).innerText = fechaPago.toLocaleDateString('es-ES');
        fila.insertCell(2).innerText = valorCuota.toFixed(2);
        fila.insertCell(3).innerText = interes.toFixed(2);
        fila.insertCell(4).innerText = amortizacion.toFixed(2);
        fila.insertCell(5).innerText = saldo.toFixed(2);

        // Actualizar el capital para el próximo período
        capital = saldo;
    }
    totalcuotas.value = cuotasTotales;
    Intereses.value = sumaInteresesTotal.toFixed(2);
    // Oculta el contenedor de carga después de un tiempo simulado (en este caso, después de 2 segundos)
    setTimeout(function () {
        // Oculta el contenedor de carga
        loadingContainer.style.display = 'none';

        // Muestra la tabla de amortización con display: block
        document.getElementById('tablaAmortizacion').style.display = 'block';
        document.getElementById('tablaAmortizacion').style.marginBottom = '50px';


        var table = document.querySelector('.container-simulator-result');
        contentinput.style.display = 'block';
        // Muestra el botón nuevamente (opcional)
        
        btn.style.display = 'block';
        btnabono.style.display = 'block';
        contentresult.style.display = 'block';
        title.style.display = 'block';
        groupinputs.style.display = 'flex';
        
        if(table){
            table.scrollIntoView({behavior :'smooth'});
        }


        
    }, 2000); // 2000 milisegundos (2 segundos)
}

function calcularCuotaMensual(capital, tasaInteres, plazoPrestamo, frecuenciaPorAnio) {
    var r = tasaInteres / frecuenciaPorAnio;
    var n = frecuenciaPorAnio * plazoPrestamo;

    // Fórmula de cuota mensual (anualidad) en interés compuesto
    var cuotaMensual = capital * (r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1);

    return cuotaMensual;
}
function mostrarCuadroAbono() {
    // Muestra el cuadro de abono
    var cuadroAbono = document.getElementById('cuadroAbono');
    cuadroAbono.style.display = 'flex';
    cuadroAbono.style.justifyContent = 'center';
    cuadroAbono.style.marginBottom='40px'
}

function aplicarAbono() {
    // Obtener los valores del número de cuota y valor del abono
    var numeroCuotaAbono = parseInt(document.getElementById('numeroCuotaAbono').value);
    var valorAbono = parseFloat(document.getElementById('valorAbono').value);

    // Validar que los campos no estén vacíos y que el número de cuota sea válido
    if (isNaN(numeroCuotaAbono) || isNaN(valorAbono) || numeroCuotaAbono < 1 || valorAbono < 0) {
        alert('Por favor, ingrese valores válidos para el número de cuota y el valor del abono.');
        return;
    }

    // Ocultar el cuadro de abono
    var cuadroAbono = document.getElementById('cuadroAbono');
    cuadroAbono.style.display = 'none';

    // Obtener la tabla de amortización
    var tablaAmortizacion = document.getElementById('tablaAmortizacion').getElementsByTagName('tbody')[0];

    // Validar que el número de cuota sea válido
    if (numeroCuotaAbono > tablaAmortizacion.rows.length || numeroCuotaAbono <= 0) {
        alert('Número de cuota no válido.');
        return;
    }

    // Obtener la fila de la cuota seleccionada
    var filaCuota = tablaAmortizacion.rows[numeroCuotaAbono - 1];

    // Obtener los valores actuales de la fila
    var valorCuotaActual = parseFloat(filaCuota.cells[2].innerText);
    var interesActual = parseFloat(filaCuota.cells[3].innerText);
    var amortizacionActual = parseFloat(filaCuota.cells[4].innerText);
    var saldoActual = parseFloat(filaCuota.cells[5].innerText);

    // Validar que el abono no sea mayor que el saldo actual
    if (valorAbono > saldoActual) {
        alert('El valor del abono no puede ser mayor que el saldo actual.');
        return;
    }

    // Aplicar el abono restando el valor del abono al saldo actual
    saldoActual -= valorAbono;

    // Actualizar los valores de la fila con el abono aplicado
    filaCuota.cells[2].innerText = (valorCuotaActual - valorAbono).toFixed(2); // Actualizar el valor de la cuota restando el abono
    filaCuota.cells[4].innerText = (amortizacionActual + valorAbono).toFixed(2); // Actualizar la amortización sumando el abono
    filaCuota.cells[5].innerText = saldoActual.toFixed(2); // Actualizar el saldo restando el abono
    sumaInteresesTotal =0;
    // Recalcular los saldos y actualizar las filas siguientes
    for (var i = numeroCuotaAbono; i < tablaAmortizacion.rows.length; i++) {
        var fila = tablaAmortizacion.rows[i];

        // Obtener los valores actuales de la fila
        var valorCuota = parseFloat(fila.cells[2].innerText);
        var interes = parseFloat(fila.cells[3].innerText);
        var amortizacion = parseFloat(fila.cells[4].innerText);
        sumaInteresesTotal +=interes;
        // Actualizar el saldo restando el abono
        fila.cells[5].innerText = (saldoActual - amortizacion).toFixed(2);

        // Actualizar el saldo actual para la próxima iteración
        saldoActual -= amortizacion;
    }

    totalcuotas.value = tablaAmortizacion.rows.length;
    Intereses.value = sumaInteresesTotal.toFixed(2);
}

let elementoNombre = document.getElementById("nombreUser");
let elementoCal1 = document.getElementById("cal1");
let elementoCal2 = document.getElementById("cal2");
let elementoCal3 = document.getElementById("cal3");
let elementoCal4 = document.getElementById("cal4");
let elementoSaludo = document.getElementById("saludoAlumno");
let elementoMesajeCal = document.getElementById("title-cal");
let elementoPromedioTexto = document.getElementById("resultado-promedio");
let elementoNotaMayorTexto = document.getElementById("resultado-NM");
let elementoReprobadaTexto = document.getElementById("resultado-repro");

function verificarDatos() {
    let nombre = elementoNombre.value;
    let cal_mate = parseFloat(elementoCal1.value);
    let cal_espa = parseFloat(elementoCal2.value);
    let cal_progra = parseFloat(elementoCal3.value);
    let cal_ingles = parseFloat(elementoCal4.value);

    if (!nombre) {
        elementoSaludo.textContent = "Ingresa tu nombre!";
        if (
            isNaN(cal_mate) || isNaN(cal_espa) || isNaN(cal_progra) || isNaN(cal_ingles) ||
            cal_mate < 0 || cal_espa < 0 || cal_progra < 0 || cal_ingles < 0 ||
            cal_mate > 10 || cal_espa > 10 || cal_progra > 10 || cal_ingles > 10
        ) {
            elementoMesajeCal.textContent = "Ingresa correctamente todas tus calificaciones (0 a 10)";
        }
        return;

    } else if (
        isNaN(cal_mate) || isNaN(cal_espa) || isNaN(cal_progra) || isNaN(cal_ingles) ||
        cal_mate < 0 || cal_espa < 0 || cal_progra < 0 || cal_ingles < 0 ||
        cal_mate > 10 || cal_espa > 10 || cal_progra > 10 || cal_ingles > 10
    ) {
        elementoMesajeCal.textContent = "Ingresa correctamente todas tus calificaciones (0 a 10)";
        return;
    }


    return { nombre, cal_mate, cal_espa, cal_progra, cal_ingles };
}

function mostrarCalificaciones() {
    let datos = verificarDatos();
    if (!datos) return;
    let nombre = elementoNombre.value;
    let materias = ["Matemáticas", "Español", "Programación", "Inglés"];
    let calificaciones = [
        datos.cal_mate,
        datos.cal_espa,
        datos.cal_progra,
        datos.cal_ingles,
    ];
    let cont = 0;

    document.getElementById("body-cal").innerHTML = "";
    elementoPromedioTexto.textContent = "Promedio";
    elementoNotaMayorTexto.textContent = "Nota Mayor";
    elementoReprobadaTexto.innerHTML = "<h3>Reprobadas</h3>";
    elementoSaludo.textContent = "Hola " + nombre + "!";
    for (cali of calificaciones) {
        let fila = document.createElement("tr");

        let celdaMateria = document.createElement("td");
        celdaMateria.textContent = materias[cont];

        let celdaCal = document.createElement("td");
        celdaCal.textContent = cali;

        fila.appendChild(celdaMateria);
        fila.appendChild(celdaCal);

        document.getElementById("body-cal").appendChild(fila);
        cont++;
    }
}

function promediar() {
    let datos = verificarDatos();
    let suma = 0;
    let promedio = 0;

    if (!datos) return;

    let calificaciones = [
        datos.cal_mate,
        datos.cal_espa,
        datos.cal_progra,
        datos.cal_ingles,
    ];

    for (cali of calificaciones) {
        suma = suma + cali;
    }
    promedio = suma / calificaciones.length;

    elementoPromedioTexto.textContent = "Tu promedio es " + promedio;

}

function notaMayor() {
    let datos = verificarDatos();
    let mayor = 0;
    let indc = 0;
    let materias = ["Matemáticas", "Español", "Programación", "Inglés"];
    if (!datos) return;

    let calificaciones = [
        datos.cal_mate,
        datos.cal_espa,
        datos.cal_progra,
        datos.cal_ingles,
    ];

    for (let i = 0 ; i < calificaciones.length ; i++) {
        if (calificaciones[i] > mayor) {
            mayor = calificaciones[i];
            indc = i;
        }
    }

    elementoNotaMayorTexto.textContent = "Tu calificación más alta es " + mayor + " y fue en "+ materias[indc];
}

function reprobadas() {
    document.getElementById("resultado-repro").innerHTML = "";
    let lista = document.createElement("ul");
    let punto_lista;
    let datos = verificarDatos();
    if (!datos) return;
    let materias = ["Matemáticas", "Español", "Programación", "Inglés"];
    let calificaciones = [
        datos.cal_mate,
        datos.cal_espa,
        datos.cal_progra,
        datos.cal_ingles,
    ];
    let cont = 0;
    let reprobadas = [];
    for (cali of calificaciones) {
        if (cali < 6) {
            reprobadas.push({ materia: materias[cont], cal: cali });
        }
        cont++;
    }

    if(reprobadas.length === 0) {
        document.getElementById("resultado-repro").innerHTML = "<h3>No tienes materias reprobadas!</h3>";
    } else {
        for (let item of reprobadas) {
            punto_lista = document.createElement("li");
            punto_lista.textContent = item.materia + " - " + item.cal;
            lista.appendChild(punto_lista);
        }
        document.getElementById("resultado-repro").innerHTML = "<h3>Materias Reprobadas</h3>";
        document.getElementById("resultado-repro").appendChild(lista);
    }
}

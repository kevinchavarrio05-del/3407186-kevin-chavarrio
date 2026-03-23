// ============================================
// PROYECTO SEMANA 05: Clasificador
// Condicionales — if/else, ternario, switch, ??, ?.
// ============================================
//
// NOTA PARA EL APRENDIZ:
// Adapta este script a tu dominio asignado.
// Reemplaza los comentarios TODO con tu propia implementación.
// Usa los conceptos aprendidos esta semana.
//
// Ejecuta con: node starter/script.js
// ============================================

// ============================================
// SECCIÓN 1: Datos del elemento de tu dominio
// ============================================

// TODO: Define al menos 5 variables con datos de un elemento de tu dominio.
// Ejemplos orientativos:
// - Un libro, medicamento, miembro, estudiante, producto, etc.
// - Incluye: nombre, estado, valor numérico, tipo (string), y alguna propiedad opcional

//Nombre del recorrido
const elementName = "Recorrido Virtual Monserrate";           // TODO: nombre del elemento (string)

//Estado actual del recorrido (activo, inactivo, mantenimiento, etc.)
const elementStatus = "active";         // TODO: estado actual (string: "active", "inactive", etc.)

//Cantidad de usuarios
const elementValue = 40;          // TODO: valor numérico para clasificar (ocupación, stock, puntaje…)

//Tipo de turismos
const elementType = "Cultural y Religioso";           // TODO: tipo o categoría (string)
const elementInfo = {
    detail: "Recorrido virtual por el cerro de Monserrate con guia interactivo, información histórica y cultural.",
    location: "Bogotá",
    duration: "45 minutos"
};           // TODO: objeto con información adicional opcional (puede ser null)

// ============================================
// SECCIÓN 2: Clasificación con if / else if / else
// ============================================

// TODO: Clasifica el elemento en al menos 3 niveles según elementValue.
// Ejemplo de estructura:
// let classification;
// if (elementValue >= ...) {
//   classification = "...";
// } else if (elementValue >= ...) {
//   classification = "...";
// } else {
//   classification = "...";
// }

let classification;
if (elementValue >= 80) {
  classification = "Alta Demanda";
} else if (elementValue >= 40) {
  classification = "Demanda Media";
} else {
  classification = "Baja Demanda";
}

// ============================================
// SECCIÓN 3: Estado binario con operador ternario
// ============================================

// TODO: Usa el ternario para determinar un estado de dos opciones.
// Ejemplo: const statusLabel = elementStatus === "active" ? "Activo" : "Inactivo";

const statusLabel = elementStatus === "active" ? "Activo" : "Inactivo"; // TODO: implementar con ternario

// ============================================
// SECCIÓN 4: Tipo con switch
// ============================================

// TODO: Usa switch sobre elementType para asignar una etiqueta.
// Ejemplo:
// switch (elementType) {
//   case "typeA": typeLabel = "..."; break;
//   case "typeB": typeLabel = "..."; break;
//   default: typeLabel = "Tipo desconocido";
// }

let typeLabel; // TODO: implementar con switch

switch (elementType) {
    case "Cultural y Religioso":
        typeLabel = "Recorrido Cultural y Religioso";
        break;
    case "Natural":
        typeLabel = "Recorrido Natural";
        break;
    case "Aventura":
        typeLabel = "Recorrido de Aventura";
        break;
    default:   
        typeLabel = "Tipo desconocido";
}
// ============================================
// SECCIÓN 5: Valor por defecto con ??
// ============================================

// TODO: Usa ?? para obtener un valor de fallback cuando sea null o undefined.
// Ejemplo: const displayName = elementName ?? "Sin nombre";

const displayName = elementName ?? "Sin nombre";      // TODO: elementName ?? "Sin nombre"
const infoDetail = elementInfo?.detail ?? "Sin información adicional";       // TODO: elementInfo?.detail ?? "Sin información adicional"

// ============================================
// SECCIÓN 6: Acceso seguro con ?.
// ============================================

// TODO: Accede de forma segura a una propiedad de elementInfo.
// Ejemplo: const location = elementInfo?.location ?? "Ubicación no especificada";

const safeProperty = elementInfo?.location ?? "Ubicacion no especificada"; // TODO: elementInfo?.tuPropiedad ?? "valor por defecto"

// ============================================
// SECCIÓN 7: Ficha de salida
// ============================================

// TODO: Muestra la ficha en consola con template literals (sin concatenación +)
// Incluye todos los resultados de las secciones anteriores

console.log("=".repeat(40));
console.log("FICHA DE CLASIFICACIÓN");
console.log("=".repeat(40));

console.log(`Nombre: ${displayName}`);
console.log(`Estado: ${statusLabel}`);
console.log(`Clasificación: ${classification}`);
console.log(`Tipo: ${typeLabel}`);
console.log(`Detalle: ${infoDetail}`);
console.log(`Propiedad adicional: ${safeProperty}`);

console.log("=".repeat(40));

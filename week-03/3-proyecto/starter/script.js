// ============================================
// PROYECTO SEMANA 03: Calculadora de Dominio
// ============================================
// Adapta este archivo a tu dominio asignado.
//
// Ejemplos con dominios no asignables:
// - Planetario    → calcular ingresos por función, capacidad disponible
// - Acuario       → calcular costo de alimentación, volumen total de tanques
// - Museo         → calcular valor de exhibición, costo de entrada
// - Zoológico     → calcular gasto diario por especie, total de visitantes
// - Observatorio  → calcular duración total de eventos, aforo restante
// ============================================

// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================

// TODO: Define las constantes base de tu dominio
// Ejemplos con dominios no asignables:
//   Planetario:   TICKET_PRICE = 12_000, MAX_CAPACITY = 45
//   Acuario:      DAILY_FEEDING_KG = 150, ENTRY_PRICE = 35_000
//   Museo:        ADULT_TICKET = 20_000, GUIDED_TOUR = 15_000
//   Zoológico:    FOOD_COST_PER_DAY = 500_000, MAX_VISITORS = 800
//   Observatorio: SESSION_DURATION = 90, TICKET_PRICE = 18_000

// const EXAMPLE_CONSTANT = 0; // TODO: Reemplazar con tus constantes

//Precio del recorrido virtual
const tourPrice = 15000

//maximo de usuarios por recorrido virtual
const users = 10

//Duracion maximo del recorrido virtual en minutos

const tourDuration = 60

// ============================================
// SECCIÓN 2: Operaciones aritméticas
// ============================================
console.log("=== Operaciones básicas ===");

// TODO: Calcula totales, subtotales o valores clave de tu dominio
// Usa: +, -, *, /, %, **
// Etiqueta cada resultado con console.log()

// Ejemplo con dominio Planetario (NO copiar):
// const ticketPrice = 12_000;
// const attendees = 38;
// const totalRevenue = ticketPrice * attendees;
// console.log("Ingresos función:", totalRevenue);
// const remainingSeats = 45 - attendees;
// console.log("Asientos disponibles:", remainingSeats);


//Total de los ingresos

const totalRevenue = tourPrice * users
console.log("Ingresos totales:", totalRevenue);

//Minutos totales de recorrido virtual consumidos por todos los usuarios

const totalMinutes = tourDuration * users
console.log("Minutos totales del tour:", totalMinutes);

//Promedio de minutos por usuario

const averageMinutes = totalMinutes / users
console.log("Promedio de minutos por usuario:", averageMinutes);







console.log("");

// ============================================
// SECCIÓN 3: Asignación compuesta
// ============================================
console.log("=== Asignación compuesta ===");

// TODO: Usa +=, -=, *=, /= para actualizar valores acumulados
// Muestra el valor antes y después de cada operación

// Ejemplo (NO copiar):
// let runningTotal = 0;
// runningTotal += 25_000;
// console.log("Tras primer item:", runningTotal);
// runningTotal += 18_000;
// console.log("Tras segundo item:", runningTotal);
// runningTotal *= 0.90; // descuento del 10%
// console.log("Con descuento:", runningTotal);

//Crea una variable para acumular las ventas
let totalSales = 0;

//Suma el valor de una venta al total
totalSales +=10000;
//muestra el total después de la venta
console.log("Ventas después del primer tour:", totalSales);

totalSales +=10000;
console.log("Ventas después del segundo tour:", totalSales);

totalSales +=10000;
console.log("Ventas después del tercer tour:", totalSales);

//Descuento del 10%
totalSales *= 0.90;
//Muestra el total despues del descuento
console.log("Total con descuento:", totalSales);


console.log("");

// ============================================
// SECCIÓN 4: Comparación estricta
// ============================================
console.log("=== Validaciones con === ===");

// TODO: Valida condiciones usando === y operadores de orden
// NUNCA uses == (penalización en la rúbrica)

// Ejemplo (NO copiar):
// const daysLate = 5;
// const isOnTime = daysLate === 0;
// console.log("¿Entregado a tiempo?", isOnTime);
// const hasFine = daysLate > 0;
// console.log("¿Tiene multa?", hasFine);

//Define el numero maximo de personas que pueden haber en el tour
const maxUsers = 20;

//Verifica si el tour esta lleno comparando el numero de usuarios con el maximo permitido
const isFull = users === maxUsers;

//Muestra si el tour esta lleno o no
console.log("¿El tour esta lleno?", isFull);

//Verifica si hay cupos disponibles comparando el numero de usuarios son menores con el maximo permitido
const hasAvaliableSpots = users < maxUsers;

//Muestra si hay cupos disponibles
console.log("¿Hay cupos disponibles?", hasAvaliableSpots);

console.log("");

// ============================================
// SECCIÓN 5: Operadores lógicos
// ============================================
console.log("=== Condiciones lógicas ===");

// TODO: Combina condiciones con &&, ||, !
// Al menos una condición con && y una con ||

// Ejemplo (NO copiar):
// const isMember = true;
// const purchaseAmount = 150_000;
// const qualifiesForDiscount = isMember && purchaseAmount >= 100_000;
// console.log("¿Descuento aplicable?", qualifiesForDiscount);

//Indica si el usuario esta registrado en la app
const isUserRegistered = true;
//Cantidad que pago el usuario
const purchaseAmount = 10000;
//Verifica si el usuario puede acceder al tour 
//Debe estar registrado y haber pagado el monto del tour 
const canAccessTour = isUserRegistered && purchaseAmount >= tourPrice;
console.log("¿Puede acceder al tour?", canAccessTour);
//Verifica si el usuario aplica para una promoción especial
const specialPromotion = isUserRegistered || purchaseAmount >= 10000;
//Muestra si el usuario aplica para la promoción especial
console.log("¿Aplica para promoción especial?", specialPromotion);
//Operador Not_ verifica si el usuario no esta registrado
const isNotRegistered = !isUserRegistered;
//Muestra si el usuario no esta registrado
console.log("¿No está registrado?", isNotRegistered);

console.log("");

// ============================================
// SECCIÓN 6: Resumen final
// ============================================
console.log("=== Resumen ===");

// TODO: Muestra un resumen con los valores más importantes
// calculados en las secciones anteriores

//Muestra el precio del recorrido
console.log("Precio del tour:", tourPrice);
//Muestra el numero de usuarios
console.log("Usuarios en el tour:", users);
//Muestra la duración del tour
console.log("Duración del tour:", tourDuration, "minutos");
//Muestra los ingresos totales del tour
console.log("Ingresos totales:", totalRevenue);

console.log("");

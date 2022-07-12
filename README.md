# Generales

El Proyecto Inicial de la asignatura, consistirá en una Aplicación para el Cálculo de Indice Académico de Estudiantes.

Puede asignarle un nombre a la Aplicación Desarrollada.

La aplicación deberá permitir:

-   Registrar Estudiantes
-   Registrar Asignaturas
-   Registrar Profesores
-   Registrar Calificaciones

## Detalles Funcionales

La aplicación deberá manejar correctamente todos los escenarios de:

### Insertar, Modificar, Consultar y Eliminar entidades:

-   Estudiantes
-   Asignaturas
-   Profesores
-   Calificaciones

### Cada entidad debe tener la información siguiente:

1. Estudiante:

-   ID
-   Nombre
-   Carrera

2. Asignatura:

-   Clave
-   Nombre
-   Crédito

3. Profesores

-   ID
-   Nombre

4. Calificación

-   Valor numérico

### Las calificaciones deben ser capturadas numéricas y el sistema debe indicar el valor en letras de cada una, de acuerdo al siguiente rango:

| Nota | Rango    |
| ---- | -------- |
| A    | 90 - 100 |
| B    | 80 - 89  |
| C    | 70 - 79  |
| D    | 60 - 69  |
| F    | <= 59    |

### El Sistema debe generar un Reporte o lista con todos los estudiantes registrados con sus índices académicos calculados y presentar en orden de Rankin: Esto es de mayor a menor puntuación.

El Índice Académico se calcula de la forma siguiente:

    Créditos de la Asignatura * Valor de Nota

El Valor de las notas es como sigue:

| Calificación | Valor |
| ------------ | ----- |
| A            | 4.0   |
| B            | 3.0   |
| C            | 2.0   |
| D            | 1.0   |
| F            | 0     |

    Dependiendo del valor del Índice Académico el sistema debe indicar si el estudiante tiene honor y cual:

    Summa Cum Laude: 4.00 >= indice >= 3.80

    Magna Cum Laude: 3.80 > indice >= 3.60

    Cum Laude: 3.60 > indice >= 3.40

    Sin honor: 3.40 > indice >= 0

Ejemplo: Estudiante matriculado con 15 créditos

| Asignatura | Créditos | Nota | Valor de la Nota | Créditos \* Valor de Nota | Puntos de Honor |
| ---------- | -------- | ---- | ---------------- | ------------------------- | --------------- |
| MAT371     | 4        | R    | -                | -                         | -               |
| IDS323     | 4        | A    | 4                | 4\*4=                     | 16              |
| ESP301     | 4        | A    | 4                | 4\*4=                     | 16              |
| ING301     | 4        | B    | 3                | 4\*3=                     | 12              |
| ING302     | 2        | A    | 1                | 2\*4=                     | 8               |
| IDS323L    | 1        | B    | 3                | 1\*3=                     | 3               |
|            | 19-4=15  | -    | -                | -                         | 55              |

    Índice Académico General = Total de Puntos de Honor ÷ Total de Créditos

    Total de Puntos de Honor: 55

    Total de Créditos = 15

    Índice Académico General = 55 / 15 = 3.67

    3.67: “Magna Cum Laude"

# Especificaciones Técnicas

Los equipos podrán hacer uso del lenguaje de programación y plataforma preferidos para el desarrollo de la aplicación
Los equipos podrán agregar cualquier entregable que consideren pertinente a los tres entregables formales identificados para el proyecto.

Deben realizar pruebas para comparar el correcto funcionamiento de la Aplicación (guardar con evidencias estas pruebas).
Este Proyecto debe ser presentado en la última clase de la semana 11 y pueden entregarlo en Moodle hasta el viernes de esa semana.

---
title: Rust, una mini introducción
date: 2023-04-02T05:31:24-05:00
draft: false
---

# Rust, en pocas palabras 😶

Rust en un lenguaje tipado, que se compila a código máquina.

## Lo que encontraras en este post

Encontraras una explicación detrás de el por que de rust, un análisis con
tecnologías similares, y tips para saber cuando usarlo y cuando no, para un
análisis en profundidad sobre el lenguaje puedes visitar [el siguiente
link](<(https://doc.rust-lang.org/stable/book/)>)

# ¿Por qué rust?

Si revisas los lenguajes más usados en 2022, (puedes ver el enlace
[aquí](https://spectrum.ieee.org/top-programming-languages-2022)) te darás
cuenta que c y c++ ocupan el primer y segundo lugar con una cuota importante de
el mercado.

Las principales razones son simples

- El sistema operativo preferido para el backend de aplicaciones (GNU/Linux)
  esta escrito en c y c++ principalmente, así que sus apis mas soportadas están
  para estos lenguajes
- Performance

Sin embargo c se lanzo en 1978, han pasado a la fecha 45 años desde su
lanzamiento, y en todo este tiempo muchas cosas han cambiado y mejorado, y
algunas características de lenguajes mas modernos comienzan a ser cada vez mas
deseables en tu code base.

- Fácil debugging
- Tiempos de compilación
- Manejo de memoria abstraída de el programador.

Rust por ser un lenguaje que compila a código máquina y con soporte para
bindings eficientes a c y c++, puede aprovechar toda la base de código echa en c
y además la interfaz de comunicación con Linux se tuvo en cuenta desde el
principio, en performance es muy comparable con c llegando incluso a superarlo
en algunos casos particulares, y tiene manejo de memoria automático usando un
concepto llamado ownership.

# Cuando usar Rust

Si el tiempo de respuesta es un requerimiento que no es negociable, y el uso de
recursos como ram y procesador son tus prioridades absolutas pero no quieres
lidiar con los contras de un lenguaje como c o c++, rust puede ser una buena
opción.

El concepto de _ownership_ de rust permite un excelente soporte para la
concurrencia segura, asi que si quieres aprovechar todos los procesadores de tu
computador rust es un muy buen aliado.

Al ser un lenguaje fuertemente tipado, la aplicación sera bastante mantenible en
el tiempo.

# Cuando no usar Rust

Es un echo que encontrar talento que sepa manejar bien este lenguaje puede ser
difícil, si no estas en posición de tu mismo generar ese talento en otros que
quizá no sean expertos pero estén abiertos a aprender lo mejor sera elegir otra
tecnología.

La curva de aprendizaje de el sistema de _ownership_ de rust no es precisamente
baja, asi que si no estas en condiciones de superar esta curva será mejor usar
otra tecnología.

Rust brilla realmente en el software que es hardware intensivo, o tareas que
necesitan tiempos de ejecución lo mas cortos posibles y el menor uso de memoria
posible, por ende la mayoría de librerías que han sido construidas nativamente
en rust están enfocadas en este tipo de escenarios.

En el caso de las aplicaciones cliente servidor que exponen api rest, si bien el
performance importa, no es el problema principal de la mayoría de aplicaciones,
así que no ha sido el foco de desarrollo de librerías nativas para rust, en este
campo lenguajes más clásicos (si bien menos eficientes) tienen un ecosistema
mucho más elaborado (como es el caso de javascript y python)

# Alternativas

## Golang

Es un lenguaje compilado al igual que rust, y es fuertemente tipado, sin embargo
esta construido para tener una sintaxis mucho más parecida a los lenguajes
tradicionales que rust, y su manejo de memoria con _garbage collector_ restringe
mucho menos la forma de escribir software que el sistema de _ownership_ de rust.

## C y C++

Si bien parece que rust llega para reemplazar a c y c++, y que todo son
beneficios, lo cierto es que rust es un contendiente relativamente nuevo en
esto, y aún esta lejos para tener la aceptación y tener la cantidad de librerías
que están escritas en c y c++.

Su soporte desde el kernel Linux si bien ha ido incrementando, aun esta en
desarrollo, y esta lejos de ser el lenguaje de facto para añadir nuevas features
al kernel.

## Javascript (Typescript) y python

En lo que aplicaciones rest de tamaño pequeño o mediano se refiere, el
ecosistema javascript y python le llevan la delantera en librerías con este
target, así que si bien rust puede competir en este aspecto con librerías como
(Rocket)[https://lib.rs/crates/rocket], lo cierto es que aun le falta
maduración.

En performance le lleva absoluta ventaja a ambos.

# Recursos

- [The rust book](https://doc.rust-lang.org/stable/book/) tiene toda la
  información importante sobre las primitivas de lenguaje y principales
  estrategias para el control de errores y buenas practicas, además de explicar
  varias librerías standard que son clave para el manejo de aplicaciones.

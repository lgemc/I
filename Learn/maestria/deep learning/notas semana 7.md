## Notas semana 7: redes generativas

Esta marcada la diferencia entre las redes discrimitativos vs los generativos

Los discriminativos separan los datos de alguna forma, o calculan un valor basado en x e y,
sin embargo las generativas intentan simular el espacio de entrada en vez de intentar separar o aproximar algo



### Gans

Generacion de texto, video, musica etc.

Se ingresa ruido a la imagen y se quiere predecir la imagen.

Este tiene un generador que toma un ruido/vecor latente.

Dsicriminador, este se encarga de dicernir entre datos reales y datos generados

El entrenamiento implica una compentencia entre ambos.

## Difusion

Se ispiran en la termodinamica no equilibrada.

Se comienza con los datos normis y luego se le mete ruido incrementalmente, por lo que cada vez
la tarea de distinguir los originales de el ruido se hace mas hard
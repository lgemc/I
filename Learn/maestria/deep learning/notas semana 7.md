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

Asi la tarea es reducir el ruido para recuperar la imagen original

## Proceso de difusion de informacion

Se destruye la informacion de la senial 

La difusion es facil, remover el ruido es hardcore.

Se usa ruido gausiano (que pendiente revisar por que).


Se hace de forma iterativa el aniadir ruido.

Se usa un kernel de difusion forward, al ser una distribucion de probabilida

Proceso de reconstruccion de informacion

difusion: q(xt | xt-1)
reversa: p_teta(xt-1 | xt)

La funcion de perdida cuantifica con la divergencia kullbakc liebler

D_kl(q(x0) || p_teta(x_0))

*En teoria los modelos de difusion pueden modelar cualquier tipo de informacion estructurada.

## Metodologia de entrenamiento


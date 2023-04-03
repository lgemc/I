---
title: PlantUML, ¿Qué es y para qué?
date: 2023:04:02T20:59:00-05:00
draft: false
---

# PlantUML en pocas palabras 😶

Es una herramienta para escribir y visualizar artefactos UML.

# Como usarlo

La referencia completa de el lenguaje podrás encontrarla en el [siguiente enlace](https://plantuml.com).

Puedes comenzar a editar en linea en [el siguiente enlace](https://www.plantuml.com/plantuml/uml/SyfFKj2rKt3CoKnELR1Io4ZDoSa70000)

Si tienes `visual code` puedes usar [la extension](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)

Vía CLI también puedes usarlo, para instalarlo, esta como paquete en la mayoria de repositorios

Ubuntu:

```bash
sudo apt install plantuml
```

Mac

```bash
brew install plantuml
```

Si tienes un archivo de PlantUML como el siguiente

```uml
@startuml
package internet {
    actor person

    cloud aws {
        node cloudfront {

        }

        node certificates {

        }

        node loadBalancer as "load-blancer"
        node s3Bucket as "s3-bucket"

        cloudfront --> loadBalancer: can-target
        cloudfront --> s3Bucket: can-target
        certificates <-- cloudfront: uses
    }

    person -- cloudfront
}
@enduml
```

Puedes exportarlo a imagen con el siguiente comando (suponiendo que el contenido anterior lo tienes en un archivo llamado `cloudfront.puml`)

```bash
plantuml cloudfront.puml
```

Luego de esto se te habrá generado un archivo `cloudfront.png` que debería lucir similar a este
![PlantUML example](/images/diagrams/plantuml.sample.png "Ejemplo de diagrama generado con PlantUML")

# Errores comunes

# ---

```
Warning: no image in blog/tech/content/posts/plantuml.sample.puml
No diagram found
```

Fíjate que no hallas olvidado el @startuml y el @enduml, si bien herramientas como el plugin de `visualcode` van a soportar
un archivo PlantUML sin estas directivas, el cliente dará este error en caso de no estar.

Ejemplo de como debería verse:

```uml
@startuml
actor persona
@enduml
```

# ---

```txt
La opción -o no se comporta como esperas
```

Al ejecutar por ejemplo

```bash
plantuml path/to/my-file.puml -o static
```

Esperarías que el archivo generado quede en el folder `static`, pero lo que realmente sucede es que el folder queda vacío y ningún error o warning se muestran 🤔

La solución a esto es usar la ruta absoluta de el folder output, por ejemplo

```bash
plantuml path/to/my-file.puml -o "$(pwd)/static"
```

y listo, problema solucionado 🌞

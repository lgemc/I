---
title: Botón de copiar código en hugo
date: 2023:04:03T05:32:00-05:00
draft: false
---

# Bueno, tengo mi sitio hugo por defecto y quiero algunas features, ¿Ahora qué 🧐?

Hugo es extensible y personalizable por defecto, así que si te aseguro que tendrás la flexibilidad que necesites, pero tanta flexibilidad viene con una gran responsabilidad:
_Elegir la mejor manera de hacer cambios incrementales que se sostengan en el tiempo_

Vamos al hands on 🤗

# Caso practico: botón de copiar código en el portapapeles

Tenemos nuestro blog, y en cada post hay muuchos bloques de código que hasta el momento la
única forma en que nosotros y nuestros lectores puedan copiarlo es seleccionándolo con el ratón y dándole `Cntrl-C`, y quieres que halla una forma más fácil de hacerlo

La siguiente es una captura de pantalla de un bloque de código por defecto:

![Hugo code block screenshot](/images/screenshots/hugo-code-template-capture.png)

Y este es el resultado esperado:

![Hugo code block with copy button screenshot](/images/screenshots/hugo-code-template-capture-with-copy.png)

Bueno, vamos a eso 👨‍💻

# Para esto, usaremos dos tecnologías, javascript y css

## El folder static

Si necesitas almacenar contenido estático, puedes elegir el folder `static` para almacenarlo, en este caso añadiremos dos archivos:

```txt
static
    js
        copy-code.js
static
    css
        copy-code.css
```

> _Aja, nice, y ¿Qué contenido va a tener cada archivo_

### copy-code.js

```js
/**
 * Enable copy button on each code block
 *
 * It inserts a button over each `pre` tag with a given text,
 * and adds logic to copy block code content to clipboard on click
 *
 * Based and adapted from https://www.dannyguo.com/blog/how-to-add-copy-to-clipboard-buttons-to-code-blocks-in-hugo/
 */

copyButtonText = "Copiar";

function addCopyButtons(clipboard) {
  document.querySelectorAll("pre > code").forEach(function (codeBlock) {
    var button = document.createElement("button");
    button.className = "copy-code-button";
    button.type = "button";
    button.innerText = copyButtonText;

    button.addEventListener("click", function () {
      clipboard.writeText(codeBlock.textContent).then(
        function () {
          /* Chrome doesn't seem to blur automatically, leaving the button
                       in a focused state */
          button.blur();

          button.innerText = "Copiado!";
          setTimeout(function () {
            button.innerText = copyButtonText;
          }, 2000);
        },
        function (error) {
          button.innerText = "Error";
          console.error(error);
        }
      );
    });

    var pre = codeBlock.parentNode;
    if (pre.parentNode.classList.contains("highlight")) {
      var highlight = pre.parentNode;
      highlight.parentNode.insertBefore(button, highlight);
    } else {
      pre.parentNode.insertBefore(button, pre);
    }
  });
}

if (navigator && navigator.clipboard) {
  window.addEventListener("load", function () {
    addCopyButtons(navigator.clipboard);
  });
} else {
  var script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard-polyfill/2.7.0/clipboard-polyfill.promise.js";
  script.integrity = "sha256-waClS2re9NUbXRsryKoof+F9qc1gjjIhc2eT7ZbIv94=";
  script.crossOrigin = "anonymous";

  script.onload = function () {
    addCopyButtons(clipboard);
  };

  document.body.appendChild(script);
}
```

> _Nice, ¿y ya está?, ¿puedo copiar ahora código desde mi blog?_

Nope, no aún, si bien tenemos la lógica correcta lo cierto es que aún no la hemos incluido en tu blog, **de echo nada ha cambiado en el aún**, asi que, vamos a eso 🌞

> _Ok, esto esta más difícil de lo que pense..._

Quizá 🥹, pero no te preocupes, al final saldrás aprendiendo un montón sobre como configurar tu sitio de forma limpia y sostenible 💪.

## Adicionando el nuevo javascript en tu sitio

De aquí en adelante voy a asumir que tienes el tema `Ananke` ([más información aquí](https://github.com/theNewDynamic/gohugo-theme-ananke)) pero los conceptos se aplican a todos los temas, cambia quizá la ruta de los archivos así que lee la documentación especifica de tu tema.

### Extendiendo el tema, sin modificar el código de este

Para insertar el nuevo javascript, tenemos varias opciones, una es modificar directamente el tema `Anake` añadiendo código en este directamente, sin embargo esto tiene un problema: `si cambiamos de tema los cambios se perderán`

Así que buscaremos una forma de hacer que las modificaciones a tu tema persistan en tu folder inicial

### Reemplazo de archivos

Por defecto, cada que hugo esta buscando un archivo para incluir en el sitio, buscara de forma jerárquica comenzando por tu folder principal, me explico:

Como podrás observar en el folder `themes/ananke/layouts/partials` existe un archivo llamado `head-additions.html`, este archivo es usado en la estructura base de el tema `themes/ananke/layouts/_default/baseof.html`

```txt
{{ block "head" . }}{{ partial "head-additions.html" . }}{{ end }}
```

Lo anterior nos indica que `Ananke` busca el archivo `head-additions` y lo adiciona en el `bloque` head, es decir, lo registra adentro de el tag `<head></head>` de cada página.

> _Bueno, entonces debo añadir mi script en `themes/ananke/layouts/_default/baseof.html`_

Jum, eso funcionaria, sin embargo, todo lo que editemos bajo el subfolder `themes/ananke` no va a sobrevivir a un cambio de tema en el blog, así que no es lo mejor... 🤔 por ende el archivo `themes/ananke/layouts/partials/head-additions.html` no es tampoco un buen lugar 😐

> _Entonces, ¿donde 🥹? yo solo quiero mi botón de copiar, no una clase avanzada de hugo templates 😡_

Calma, ya llegaremos a eso 😁

_Dale..._

### El reemplazo de archivos en acción

Como dijimos antes, si haces un archivo `layouts/partials/head-additions.html` hugo tomara tu archivo en vez de el de el tema `Ananke`, y con esto podremos personalizar el contenido de el bloque `head`, y allí podremos incluir nuestro nuevo css.

`layouts/partials/head-additions.html`:

```html
<script src="/js/copy-code.js"></script>
```

Con esto ya tendremos el botón copiar 😊

![Hugo code block with copy button screenshot and no css yet](/images/screenshots/hugo-code-template-capture-with-copy-without-css.png)

> _Oye pero antes en el blog se veía mejor... fue un click bite 😡_

uuu, es cierto, vamos a eso

### Agregando estilos a el nuevo código 🎨 ⚙️

En el archivo `static/css/copy-code.css` añade el siguiente código:

```css
/**
 * Styles for copy code button
 * Based and adapted from https://www.dannyguo.com/blog/how-to-add-copy-to-clipboard-buttons-to-code-blocks-in-hugo/
 */

.copy-code-button {
  color: #272822;
  background-color: #fff;
  border-color: #272822;
  border: 2px solid;
  border-radius: 3px 3px 0px 0px;

  /* right-align */
  display: block;
  margin-left: auto;
  margin-right: 0;

  margin-bottom: -2px;
  padding: 3px 8px;
  font-size: 0.8em;
}

.copy-code-button:hover {
  cursor: pointer;
  background-color: #f2f2f2;
}

.copy-code-button:focus {
  /* Avoid an ugly focus outline on click in Chrome,
       but darken the button for accessibility.
       See https://stackoverflow.com/a/25298082/1481479 */
  background-color: #e6e6e6;
  outline: 0;
}

.copy-code-button:active {
  background-color: #d9d9d9;
}

.highlight pre {
  /* Avoid pushing up the copy buttons. */
  margin: 0;
}
```

> _Oye ya lo tengo, pero el botón sigue sin estar bien posicionado_

Bueno, falta un último paso (prometo que será el ultimo 😉)

Recuerdas el archivo de `head-additions`? bueno, vamos a agregar el nuevo css a tu blog 😊

{{< highlight go "linenos=table,hl_lines=1" >}}

<link rel="stylesheet" href="/css/copy-code.css" />
<script src="/js/copy-code.js"></script>
{{< / highlight >}}

Y listo, con eso tendrás tu hermoso botón de copiar código, y lo más importante, la mayoría de código esta en tu proyecto y va a sobrevivir a cambios de tema 😉

> _Wiiiii, gracias (pero para la proxima hazlo mas corto 😐)_

Intentaré, pero no prometo nada 😆

# Referencias

El código usado fue tomado y modificado de [este post](https://www.dannyguo.com/blog/how-to-add-copy-to-clipboard-buttons-to-code-blocks-in-hugo/) de `Danny Guo` (gracias a el existe esta entrada, asi que Danny, graciaaaaaas 😊)

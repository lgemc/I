# About API Blueprint

It is a combination of markdown and swagger
that allow write api docs in a readable format and 
then build it to swagger or html
 
## Building with aglio to html

### Install aglio

```bash
npm i -g aglio
```

### Compiling into html

aglio -i main.apib -o output.html

## Building into swagger

### Install compiler
```bash
npm install -g apib2swagger
```

### Transform to swagger
```bash
apib2swagger < main.apib > output.json
```

By default it reads and writes from stdin and stdout respectively

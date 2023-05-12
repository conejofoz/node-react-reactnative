# API com NodeJS
### Criar o arquivo package.json
npm init -y

### Express, gerencia as requisições, rotas e URLs, entre outras funcionalidades.
npm install express

### Instalar o módulo para reiniciar o servidor sempre que houver alterações no código fonte
npm install -D nodemon

### Produz código JS válido - para import do ES6
npm install -D sucrase

Sucrase é um alternativa ao Babel, apesar do Babel ser mais robusto o Sucrase é mais rápido

* Configurar o sucrase

   **package.json**
```javascript
"scripts": {
    "dev": "nodemon src/server.js",
    "build": "sucrase ./src -d ./outDir --transforms imports",
},
```
 
   **Criar na raíz do projeto o arquivo nodemon.json** 
```javascript
{
    "watch": ["src"],
    "ext": "js",
    "execMap": {
        "js": "sucrase-node src/server.js"
    }
}
```

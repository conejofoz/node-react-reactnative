# API com NodeJS
### Criar o arquivo package.json
npm init -y

### Express, gerencia as requisições, rotas e URLs, entre outras funcionalidades.
npm install express

### Instalar o módulo para reiniciar o servidor sempre que houver alterações no código fonte
npm install -D nodemon

### Sucrase, Produz código JS válido - para import do ES6
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

### Rodar o projeto
npm run dev


### Receber retorno de dados em formato json
app.use(express.json())


## Instalar o MongoDB

Download usado no projeto local
https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-6.0.6-signed.msi

### Instalar o MongoDB no projeto
npm install --save mongodb

### Instalar o Mongoose
npm install --save mongoose

Mongoose traduz os dados do banco de dados para objetos javascript, para que possam ser utilizados pela aplicação.

**Obs:**
A partir da versão 6 do MongoDB não se utiliza mais callback no create para verificar se houve erro, agora é usado
.then() e .catch()
Ex:
```javascript
await User.create({
        nome: 'José Coelho',
        email: 'jose-coelho@gmail.com',
        senha: '123456'
    }//, function (err, user){
     //   if (err) return res.status(400).json({ error: "Erro: não cadastrado"})
     //   return res.status(200).json({ error: "Usuário Cadastrado"})
    //}
    ).then(()=>{
        return res.status(200).json({ error: "Usuário Cadastrado"})
    }).catch(err=>{
        return res.status(400).json({ error: "Erro: não cadastrado"})
    })
```



### Controllers
Basicamente retirar a função que está em cada rota e passar para um arquivo de controlador.
No arquivo controller criar uma função para cada ação, exportar e depois importar no arquivo
de rotas e chamar dentro da rota onde estava a função antes.


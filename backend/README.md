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


### Json - Receber retorno de dados em formato json
app.use(express.json())

**importante:** Tem que ser antes das rotas senão o req.body chega undefined no controller





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





### Validação de campos usando a dependência Yup
npm install --save yup

```javascript
const shema = Yup.object().shape({
    nome: Yup.string().required(),
    email: Yup.string().required(),
    senha: Yup.string().required().min(6)
})
if(! (await shema.isValid(req.body))){
    return res.status(400).json({ 
        error: true,
        code: 105,
        message: 'Error: Dados inválidos!'
    })
}
```        





### Criptografar a senha
npm install --save bcryptjs

```javascript
let dados = req.body
dados.senha = await bcrypt.hash(dados.senha, 7)
```



### Login de usuário
* Login básico
    * Verificar se o usuário existe
    * Comparar se a senha informada pelo front-end é igual a senha do usuário encontrado no banco de dados
        * Usar bcrypt.compare(senhainformada, user.senhacriptrografada)
    * Se a senha não confere usar mensagem genérica para dificultar a vida de possíveis invasores.



### Apagar um registro no MongoDB
Existe a possibilidade de travar o servidor caso o id enviado não seja um objeto válido do MongoDB,
Diante disso é interessante fazer uma validação.
Só que para isso vai ter que importar o mongoose no controller, uma outra alternativa é colocar em um
bloco try catch e deixar que o catch capture o erro.

```javascript
if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ 
        error: true, 
        code: '115',
        message: 'Usuário não encontrado'})
} 
```




### JWT
npm install --save jsonwebtoken

Caso o usuário seja válido gerar e retornar o token jwt junto com os demais dados do usuário

```javascript
res.status(200).json({
    user:{
        id: userExiste._id,
        nome: userExiste.nome,
        email: userExiste.email
    },
    token: jwt.sign({id: userExiste._id}, configAuth.secret, {expiresIn:configAuth.expiresIn} )
})
```

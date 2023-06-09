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


Ex: Básicos com node

Trazer todos os registros não especifique nenhum campo
Trazer alguns, coloque o nome dos campos entre aspas e separados por espaço logo após o argumento de busca
Não trazer um campo, coloque o nome do campo com o sinal de menos.
Observe na sequência:

```javascript
User.findOne({_id: req.params.id})
User.findOne({_id: req.params.id}, '_id name email createdAt updatedAt')
User.findOne({_id: req.params.id}, '-password')
```



### Apagar um registro no MongoDB
Existe a possibilidade de travar o servidor caso o id enviado não seja um objeto válido do MongoDB,
Diante disso é interessante fazer uma validação.
Só que para isso vai ter que importar o mongoose no controller. 
Uma outra alternativa é colocar em um bloco try catch e deixar que o catch capture o erro.
Obs: Essa abordagem não vale somente para apagar, mas sempre que precisar usar o id, como o visualizar.

**remove()** Está obsoleto. Usar agora **deleteOne()**

```javascript
if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ 
        error: true, 
        code: '115',
        message: 'Usuário não encontrado'})
} 
```


### Atualizar um registro no MongoDB

Dicas básicas
* De preferência mandar o id no corpo da requisição/body
* Extrair os campos do body através de destruturação
* Validar os campos usando uma biblioteca. Ex: Yup
* persquisar se o id existe no banco
* validar se encontrou
* verificar se o email foi alterado, se é diferente do antigo
    * se for diferente pesquisar se ja existe no banco, porque não pode pegar o email de outra pessoa.
* Verificar se a senha foi enviada pelo front-end.
    * se sim, criptografar a senha
* Aplicar o update.

Para ver um exemplo completo veja o UserController no método update.







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








## JWT
npm install --save jsonwebtoken

### Gerar o token

Criar o token no controller de login
Caso o usuário seja válido gerar e montar e retornar o token jwt junto com os demais dados do usuário

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

**Também é possível montar o token com outros dados do usuário se quiser.**
```javascript
const jwt = require('jsonwebtoken');

// Chave secreta do servidor
const secretKey = 'minha_chave_secreta';

// Dados do usuário
const user = {
  id: 123,
  name: 'Fulano',
  email: 'fulano@example.com',
};

// Configurações do token
const tokenConfig = {
  expiresIn: '1h',
};

// Cria o payload
const payload = {
  sub: user.id,
  name: user.name,
  email: user.email,
};

// Cria o token
const token = jwt.sign(payload, secretKey, tokenConfig);

console.log(token); // exibe o token gerado
```



### validar o token

* Receber o token enviando pelo front-end através do cabeçalho da requisição na chave **authorization**
```javascript    
const authHeader = req.headers.authorization
```

* Separar o token da palavra Bearer
```javascript
//const [bearer, token] = authHeader.split(' ')
const [, token] = authHeader.split(' ')
```

* Decodificar usando promisify do pacote util, em um bloco try catch
    * se conseguir decodificar retorne o next()
    * se não conseguir retorne 401 não autorizado

```javascript
import { promisify } from 'util'

const decoded = await promisify(jwt.verify)(token, configAuth.secret)
```


**Exemplo completo**

```javascript
import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import configAuth from '../../config/auth'

export default async(req, res, next) =>{

    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({
            error: true,
            code: 130,
            message: 'Não autorizado!'
        })
    }

    //const [bearer, token] = authHeader.split(' ')
    const [, token] = authHeader.split(' ')

    try {
        const decoded = await promisify(jwt.verify)(token, configAuth.secret)
        //criar uma nova chave na requisição
        req.userId = decoded.id
        return next()
    } catch (error) {
        return res.status(401).json({
            error: true,
            code: 131,
            message: 'Token inválido!'
        })
    }
}
```


## Perfil de Usuário

Algumas dicas para editar o perfil de usuário

 
* Para editar o perfil o usuário precisa do id que está no token
* Para ter o id usuário precisa do token
* Para ter o token o usuário precisa estar logado, pois é no processo de login que o token é criado e nele tem o id
* Não adianta o usuário mandar o id pelo body ou pela url, vai ser usado esse que está na requisição
* Esse id é extraído do token no processo de autorização, ou seja no middleware auth.
* Por isso chamar o middleware auth na rota antes de manipular o perfil

Obs: Essas recomenações são para este projeto, pois existem muitas outras maneiras de fazer. No Django Rest Framework por exemplo por padrão não é permitido modificar uma requisição.




## Paginação de resultados

* Instalar o módulo de paginação com mongoose
```javascript
npm install --save mongoose-paginate-v2
```

* importar no model
```javascript
import mongoosePaginate from "mongoose-paginate-v2"
```

* Usar o plugin no objeto Shema criado, nesse caso o User
```javascript
User.plugin(mongoosePaginate)
```

* No controller modificar a consulta
```javascript
const { page = 1} = req.query
const { limit = 40} = req.query
await User.paginate({}, {select: '_id nome email', page, limit})
```
Agora o front-end tem que mandar page e limit na url
```html
https://meusistema.com/users?page=6&limit=4
```




## Upload da foto de perfil

Instalar a dependência Multer.
npm install --save multer

Multer é um middleware node.js para manipulação multipart/form-data, usado para o upload de arquivos.
**Sempre olhar a documentação para ver como funciona uma biblioteca**

* Criar um novo arquivo na pasta middlewares, assim se precisar é só importar o arquivo.
* Importar o multer
* Importar o crypto para gerar o nome do arquivo sempre diferente
* Importar extname do path para extrair a extensão do arquivo original
* Exportar o arquivo como default para importar onde precisar depois.
* A implementação melhor pegar da documentação porque pode ser que mude.
* Criar as pastas manualmente, o multer não cria. Ou crie uma rotina para criar a pasta caso não exista.
* Importar o multer no arquivo de rotas
* Importar o arquivo implementado no arquivo de rotas também, pode importar com o nome que quiser pois foi exportado como default.
* No arquivo de rotas chamar a função multer logo abaixo de instanciar as rotas.
    * O normal seria implementar o storage e chamar assim: var upload = multer({ storage: storage})
    * Como foi implementado em arquivo separado fica assim: const uploadImgUser = multer(multerUpImgUser)
        * Passando para a função multer o arquivo importado pois nele tem o storage.
* Criar a controller que vai ser chamada na rota
* Criar a rota que vai chamar o controller de upload
    * Chamar a constante que foi atribuida ao multer, antes do controller na rota
        * uploadImgUser.single('file') - para um arquivo - file é o nome do input no formulário.
        * uploadImgUser.array - para multiplos arquivos.


Resumo no routes.js

```javascript
import multer from 'multer'
import multerUpImgUsers from './app/middlewares/uploadImgUser'
const uploadImgUser = multer(multerUpImgUsers)
routes.put('/perfil-img', authMiddleware, uploadImgUser.single('file'), PerfilImagemController.update)
```

No controller só tem o método update

```javascript
class PerfilImagemController{
    async update(req, res){
        return res.json({
            error: false,
            message: "Upload img user"
        })
    }
}

export default new PerfilImagemController()
```

### Salvar o nome da imagem no banco de dados

Criar duas novas posições na model, originalName e fileName.
Receber elas na requisição no controller
Atualizar o usuário logado, ou seja com aquele id que foi inserido na req.

```javascript	
const dadosImagem = {
    originalName: req.file.originalname,
    fileName: req.file.filename
}

await User.updateOne({_id: req.userId}, dadosImagem)
```
**Exemplo completo no controller PerfilImagemController**

### Apagar a imagem antiga

* No momento da consulta no banco pegar o nome da imagem que está na coluna fileName.
* Inserir uma nova chave na requisição.
* Pegar o caminho onde estão as imagens.
    * req.file.destination
* Concatenar o caminho com o nome do arquivo pego no banco
* Testar se existe
    * fs.access(imgAntiga, err => {)
* apagar o arquivo
    * unlink(imgAntiga, err => {)



### Validando o upload da imagem

No middleware de upload acrescentar uma nova propriedade no multer logo abaixo do storage.
Vai ser uma função que vai retornar true ou false.
No controller testar se req.file é true ou false

```javascript
//no middleware
fileFilter: (req, file, cb) => {
    if(file.mimetype == "image/jpeg" 
        || file.mimetype == "image/jpg" 
        || file.mimetype == "image/png"){
            return cb(null, true)
        } else {
            return cb(null, false)
    }
}

//no controller
if(!req.file){
    return res.status(404).json({
        error: true,
        message: 'Selecione uma imagem válida JPEG ou PNG'
    })
}
```


### Permitir acesso publico a imagem e escondendo o real caminho dela
Note que foi criado uma rota /files
Mais o caminho real das imagens é tmp/uploads
```javascript
this.app.use(
    '/files',
    express.static(path.resolve(__dirname, '..','tmp', 'uploads'))
)
```
E no controller quando consultar um usuário já montar uma chave concatenando a url do servidor da api com o nome do arquivo e retornar essa chave para o front poder usar.
```javascript
await User.findOne({_id:req.userId}, '_id nome email createdAt updatedAt fileName')
    .then((user)=>{
        let url = config.url + '/files/users/' + user.fileName
```
**Pronto agora a imagem pode ser acessada pela url.**


## Liberar permissões da API com cors no NodeJS
npm install --save cors

```javascript
this.app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER", "Content-Type")
    this.app.use(cors())
    next()
})
```        
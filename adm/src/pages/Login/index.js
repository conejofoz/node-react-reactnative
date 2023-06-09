import React from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useNavigate} from 'react-router-dom'
import '../../styles/login/index.css' //passou para o componente BaseLogin

import { connect } from 'react-redux'
import * as actions from '../../store/actions/index.js' //tem a action handleLogin que faz requisição

import AlertDanger from '../../components/AlertDanger'

//export default function Login(){
class Login extends React.Component{    
    //const navigate = useNavigate();

    //const handleRecuperarSenha = ()=>{
        //navigate('/recuperar-senha')
    //}


    state = {
        email: '',
        senha: '',
        erro: ''
    }

    onChangeInput = (field, ev)=>{
        this.setState({[field]: ev.target.value})
    }

    handleLogin(){
        const {email, senha} = this.state

        if(!this.validate()) return
        this.props.handleLogin({email, senha}, (err)=>{
            console.log(err)
            this.setState({erro: {message: err.erro.message}})
        })
    }

    validate(){
        const {email, senha} = this.state
        if(!email) return this.setState( {erro: {message: "Preencha o email"}} )
        if(!senha) return this.setState( {erro: {message: "Preencha a senha"}} )

        this.setState({erro: ''})
        return true
    }

    render() {
        const { email, senha, erro } = this.state
    return (
        <>
        <div className='container-login'>
            <div className='login card shadow'>
                <Form className='form-signin text-center'>
                    <img className='mb-4' src="images/logo_celke.png" alt='' width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal">Área Restrita</h1>

                    <AlertDanger erros={erro} />
                    
                    <FormGroup>
                        <Label for='email'>Usuário</Label>
                        <Input type='email' value={email} onChange={(ev)=> this.onChangeInput("email", ev)} name='email' id='email' placeholder='Email do usuário'/>
                    </FormGroup>

                    <FormGroup>
                        <Label for='senha'>Senha</Label>
                        <Input type='password' value={senha} onChange={(ev)=> this.onChangeInput("senha", ev)} name='senha' id='senha' placeholder='Senha do usuário'/>
                    </FormGroup>

                    <Button color='primary w-100' onClick={()=> this.handleLogin()} >Acessar</Button>
                    <p className='text-center mt-2' >Esqueceu a senha?</p>

                </Form>

            </div>
            
        </div>
        </>
    )
    }
}

export default connect(null, actions) (Login)
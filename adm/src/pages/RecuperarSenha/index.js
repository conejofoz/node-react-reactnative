import React from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
//import '../../styles/login/index.css' //passou para o componente BaseLogin
import { useNavigate } from 'react-router-dom'

export default function RecuperarSenha(){
    const navigate = useNavigate()

    const handleLogin = ()=>{
        navigate('/')
    }
    return (
        <div>
            <div className='login card shadow'>
                <Form className='form-signin text-center'>
                    <img className='mb-4' src="images/logo_celke.png" alt='' width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal">Recuperar Senha</h1>

                    <FormGroup>
                        <Label for='email'>Usuário</Label>
                        <Input type='email' name='email' id='email' placeholder='Email do usuário'/>
                    </FormGroup>

                    <Button color='primary w-100' >Recuperar</Button>
                    <p className='text-center mt-2' onClick={handleLogin}>Fazer Login</p>

                </Form>

            </div>
            
        </div>
    )
}
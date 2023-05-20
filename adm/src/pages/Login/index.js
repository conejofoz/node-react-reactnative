import React from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useNavigate} from 'react-router-dom'
//import '../../styles/login/index.css' //passou para o componente BaseLogin

export default function Login(){
    const navigate = useNavigate();

    const handleRecuperarSenha = ()=>{
        navigate('/recuperar-senha')
    }

    return (
        <div>
            <div className='login card shadow'>
                <Form className='form-signin text-center'>
                    <img className='mb-4' src="images/logo_celke.png" alt='' width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal">Área Restrita</h1>

                    <FormGroup>
                        <Label for='email'>Usuário</Label>
                        <Input type='email' name='email' id='email' placeholder='Email do usuário'/>
                    </FormGroup>

                    <FormGroup>
                        <Label for='senha'>Senha</Label>
                        <Input type='password' name='senha' id='senha' placeholder='Senha do usuário'/>
                    </FormGroup>

                    <Button color='primary w-100' >Acessar</Button>
                    <p className='text-center mt-2' onClick={handleRecuperarSenha}>Esqueceu a senha?</p>

                </Form>

            </div>
            
        </div>
    )
}
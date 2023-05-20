import React from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import '../../styles/login/index.css'

export default function Login(){
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
                        <Input type='senha' name='senha' id='senha' placeholder='Senha do usuário'/>
                    </FormGroup>

                    <Button color='primary w-100' >Acessar</Button>
                    <p className='text-center mt-2'>Esqueceu a senha?</p>

                </Form>

            </div>
            
        </div>
    )
}
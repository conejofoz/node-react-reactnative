import React from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import iconeUsuario from '../../assets/icone_usuario.png'

const Header = ()=>(
    <Navbar color='primary navbar-dark' light expand="md">
        <Link className="navbar-brand" to="/dashboard">Dashboard</Link>
        <Nav navbar >
            <NavItem>
                <img className='rounded-circle mt-2' src={iconeUsuario} width={20} height={20} />
            </NavItem>

            <UncontrolledDropdown setActiveFromChild>
                <DropdownToggle tag='a' className='nav-link menu-header' caret>
                    Usuário
                </DropdownToggle>
                <DropdownMenu>
                    <Link to='/perfil' className='dropdown-item'>Perfil</Link>
                    <DropdownItem>Sair</DropdownItem>
                </DropdownMenu>

            </UncontrolledDropdown>
            
        </Nav>
    </Navbar>
)



export default Header
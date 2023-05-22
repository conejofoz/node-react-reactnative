//importar o css do dashboard aqui
import '../../styles/dashboard/index.css'

import Header from  '../../components/Header'
import Sidebar from '../../components/Sidebar'

const BaseDashboard = ({children}) =>{

    return (
        <>
            <Header />
            <div className="d-flex">
                <Sidebar />
                <div className="content p-1">
                    <div className='list-group-item'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )

}

export default BaseDashboard
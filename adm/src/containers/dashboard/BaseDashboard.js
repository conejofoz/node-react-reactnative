//importar o css do dashboard aqui
import '../../styles/dashboard/index.css'

import Header from  '../../components/Header'

const BaseDashboard = ({children}) =>{

    return (
        <>
            <Header />
            {children}
        </>
    )

}

export default BaseDashboard
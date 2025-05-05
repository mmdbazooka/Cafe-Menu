import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Category from '../components/Category'

const Home = () => {

    return (
        <>
        
            <Header />
            <Category />
            <Outlet />     

        </>
    )

}

export default Home
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import YesOrNo from '../common/YesOrNo'
import HamberMenu from './HamberMenu'
import { useEffect } from 'react'

const AdminPanel = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const closeMenu = () => menu.parentNode.classList.replace("right-0","right-[-100%]")
    const openMenu = () => menu.parentNode.classList.replace("right-[-100%]","right-0")
    
    useEffect(() => {
      if(location.pathname == "/adminPanel") navigate("/adminPanel/orders")
    }, [])
    

    return (

        <>
            
            <div className="max-w-[1920px] grid grid-cols-12 gap-4 mx-auto">
                
                <div className={`col-span-9 bg-[#f3f3f3] rounded-md py-5 max-lg:col-span-12`}>
                    <div className='col-span-12 rtl h-[50px] hidden max-lg:block max-lg:my-2'>
                        <img src="https://backend-digital-menu.liara.run/uploads/hamber-icon.png" alt="" className='w-[50px] max-sl:w-[40px] cursor-pointer' onClick={openMenu} />
                    </div>
                    <Outlet />
                </div>
                <div className="col-span-3 p-2 rounded-md max-lg:hidden">
                    <div className='sticky top-7'>
                        <HamberMenu />
                    </div>
                </div>
                <ToastContainer autoClose={2000} position="top-center" draggable={true} />
                <YesOrNo />
            </div>
            <div className='w-full h-[100vh] bg-[#00000092] fixed right-[-100%] top-0 rtl'>

                <div id="menu" dir='ltr' className='bg-white w-[30%] max-lm:w-[35%] max-md:w-[40%] max-sf:w-[45%] max-sx:w-[50%] max-sl:w-full max-sl:rounded-none h-[100vh] shadow-2xl rounded-l-md rounded-b-md overflow-y-scroll'>
                    <div className='h-[50px] center-row w-[60px] pt-2'>
                        <img src="https://backend-digital-menu.liara.run/uploads/close.png" alt="" className='h-[55px] cursor-pointer' onClick={closeMenu}/>
                    </div>
                    <HamberMenu />
                </div>

            </div>
        </>

    )

}

export default AdminPanel
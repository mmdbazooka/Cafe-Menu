import React, { useContext, useEffect } from 'react'
import { Link , useLocation, useParams } from 'react-router-dom'
import customAxios from '../interceptor/customAxios'
import ItemsMap from './maps/ItemsMap'
import { ToastContainer } from 'react-toastify'
import { context } from '../context/AppContext'


const Details = () => {

    const params = useParams()
    let location = useLocation()

    const { items , setItems , isFood } = useContext(context)


    const getItems = async () => {
        let { data } = await customAxios.get("/items")
        data = data.filter((element) => {
            return element.name.indexOf(inputSearch.value) !== -1
        })
        params.address == undefined ? setItems(data) : setItems(data.filter((element) => element.category == params.address))
    }

    useEffect(() => {
        getItems()
    }, [location.pathname])

    


    return (
        <>
            <div id='parentOfItems' className='max-w-[1920px] mx-auto grid grid-cols-12 gap-4 rtl mt-4 mb-4 px-4 max-lx:grid-cols-10 max-lg:grid-cols-8 max-sm:grid-cols-6 max-sx:grid-cols-4 max-sl:gap-2 max-mini:gap-y-0'>

                {
                    !isFood &&
                    <ItemsMap array={items} />
                }

                {
                    isFood && 

                    <div className="col-span-12 center-col " id="NoFood">
                        <img src="../src/assets/NoFood.png" alt="" className="w-48 grayscale-[100%]" />
                        <div className="text-[#6b6b6b]">آیتمی یافت نشد</div>

                    </div>
                }
                
                <ToastContainer autoClose={5000} position="top-center" draggable={true} limit={3} />

            </div>
            <div className='w-[70px] h-[70px] max-md:h-[60px] max-sm:h-[50px] hover:w-[440px] hover:max-sl:w-full hover:max-sl:right-0 hover:max-sl:rounded-none transition bg-gradient-to-r from-[#30a8e4] to-[#087eb9] rounded-l-xl fixed right-0 max-sm:-right-4 top-[38%] center-row !justify-end px-4 [&:hover>div]:!opacity-100'>
                <div className="text-white opacity-0 whitespace-nowrap truncate max-sl:text-[13px] max-mini:text-[12px]"> 
                    <Link to="https://t.me/mmdbazoooka" className="underline"> @mmdbazoooka </Link>
                    ،
                    <Link to="https://t.me/stormy_85" className="underline"> @stormy_85 </Link>
                    : طراحی شده توسط 
                </div>
                <img src="../src/assets/telegram.png" alt="" className="w-10 absolute left-3 top-5 max-md:left-5 max-md:top-4 max-md:w-8 max-sm:w-6 max-sm:left-4" />
            </div>
        </>
    )

}

export default Details
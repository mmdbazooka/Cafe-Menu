import React, { useEffect, useState } from 'react'
import customAxios from '../../interceptor/customAxios'
import { Link } from 'react-router-dom'
import getAnything from '../../core/utils/getAnything.utils'

const EditItem = () => {

    const [items, setItems] = useState([])

    const getItems = async () => {
        const { data } = await customAxios.get("/items")
        setItems(data)
    }

    useEffect(() => {
        getItems()
    }, [])
    

    return (
        <div className='grid grid-cols-10 max-2xl:grid-cols-12 gap-4 max-xl:grid-cols-9 max-lg:grid-cols-12 max-sm:px-6 max-sx:px-0 max-sl:grid-cols-6 max-sl:px-20 max-mini:px-10'>
            {
                items.map((el,index)=> {
              
                    return (
            
                        <div key={index} className="p-4 shadow rounded-lg col-span-2 max-2xl:col-span-3 bg-[#fff] max-lm:col-span-4 max-sm:col-span-6 ">
        
                              <div className="">
                                <img src={`https://backend-digital-menu.liara.run${ el.img }`} alt="" className="w-full h-[170px] border rounded-[15px] brightness-[85%]"/>
                              </div>
        
                              <div dir="rtl" className="h-[50px] center-row px-1 !justify-between text-[#777] [&>span]:text-[14px]">
                                  <span>{el.name}</span>
                                  <span>{new Intl.NumberFormat('fa-IR').format(el.price)} تومان</span>
                              </div>
                              <Link to={`/adminPanel/edit/${el._id}`} className="mx-auto w-full cursor-pointer rounded-md bg-[#f9a14f] transition center-row text-white text-[15px] p-2 border-2 border-transparent hover:border-[#f9a14f] hover:bg-white hover:text-[#f9a14f]">ویرایش</Link>
                          </div>
                    
                    )
                    
                })
            }
        </div>
    )
}

export default EditItem
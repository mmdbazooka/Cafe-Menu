import React, { useContext, useEffect, useState } from 'react'
import { context } from '../../context/AppContext'
import getAnything from '../../core/utils/getAnything.utils'

const DeleteCategory = () => {

    const [categories, setCategories] = useState([])
    const { setIsModal , isModal }  = useContext(context)

    const deleter = async (el) => {
        setIsModal(true)
        yes.setAttribute("data-url", `/category/${el}`)
    }
    useEffect(() => {getAnything("/category" , setCategories)}, [])
    useEffect(() => {getAnything("/category" , setCategories)}, [isModal])
    

    return (
       <div className='grid grid-cols-12 gap-y-2 max-xl:grid-cols-10 max-md:grid-cols-8 max-sl:grid-cols-6'>
            {
                categories.map((element , index) => {
                    
                    return (
        
                        <div key={index}  className='col-span-2 px-8 py-2 max-sx:px-5 bg-white border-t rounded shadow mx-2 max-sx:mx-1 cursor-pointer center-col [&>div]:text-[14px] hover:-translate-y-1 transition hover:scale-[101%] [&>div]:whitespace-nowrap  max-md:[&>div]:text-[12px] max-sm:[&>div]:text-[10px] gap-y-1'>
                            <img src={`https://backend-digital-menu.liara.run/uploads/Category${ element.img }`} alt="" className='h-[40%] max-sl:h-[30%]' />
                            <div> { element.name[0] } </div>
                            <div> { element.name[1] } </div>
                            
                            <div onClick={() => deleter(element._id)}  className="w-[60px] py-1 mt-2 rounded-xl cursor-pointer text-[13px] center-row bg-[#fdeaea] text-[#ea5455]">حذف</div> 
                             
                        </div>

                    )
                })
            }
       </div> 
         
    )
}

export default DeleteCategory
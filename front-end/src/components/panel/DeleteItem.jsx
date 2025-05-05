import { useContext, useEffect, useState } from "react"
import { context } from "../../context/AppContext"
import getAnything from "../../core/utils/getAnything.utils"

const DeleteItem = () => {

    const [items, setItems] = useState([])
    const { setIsModal , isModal }  = useContext(context)

    const deleteItem = async (e) => {
        setIsModal(true)
        yes.setAttribute("data-url", `/items/${e.target.getAttribute("data-id")}`)
    }

    useEffect(() => {getAnything("/items" , setItems)}, [])
    useEffect(() => {getAnything("/items" , setItems)}, [isModal])
    

  return (

      <div className="grid grid-cols-10 max-2xl:grid-cols-12 gap-4 max-xl:grid-cols-9 max-lg:grid-cols-12 max-sm:px-6 max-sx:px-0 max-sl:grid-cols-6 max-sl:px-20 max-mini:px-10">

        {

          items.map((el,index)=> {
              
              return (
      
                  <div key={index} className="p-4 shadow rounded-lg col-span-2 max-2xl:col-span-3 bg-[#fff] max-lm:col-span-4 max-sm:col-span-6 ">

                        <div>
                          <img src={`https://backend-digital-menu.liara.run${ el.img }`} alt="" className="w-full h-[170px] rounded-[15px] brightness-[85%] border"/>
                        </div>

                        <div dir="rtl" className="h-[50px] center-row px-1 !justify-between text-[#777] [&>span]:text-[14px] max-xl:[&>span]:text-[13px]">
                            <span>{el.name}</span>
                            <span>{new Intl.NumberFormat('fa-IR').format(el.price)} تومان</span>
                        </div>
                        <button type="submit" data-id={el._id} onClick={deleteItem} className="mx-auto w-full cursor-pointer rounded-md bg-[#ed5e68] transition center-row text-white text-[15px] p-2 border-2 border-transparent hover:border-[#ed5e68] hover:bg-white hover:text-[#ed5e68]">حذف</button>
                    </div>
              
              )
              
          })

        }

      </div>

  )

}

export default DeleteItem
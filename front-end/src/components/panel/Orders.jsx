import { useContext, useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import customAxios from "../../interceptor/customAxios"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { context } from "../../context/AppContext";
import getAnything from "../../core/utils/getAnything.utils";

const Orders = () => {

    const [order, setOrder] = useState([])
    const navigate = useNavigate()
    const { setIsModal , isModal }  = useContext(context)

    const deleteOrder = async (_id) => {
        setIsModal(true)
        yes.setAttribute("data-url", `/orders/${_id}`)
    } 

    useEffect(() => {
        let orderListLength = getAnything("/orders" , setOrder).then(res => orderListLength = res)
        const interval = setInterval(() => {
            getAnything("/orders" , setOrder).then(res => {
                if(res !== orderListLength) {
                    toast.success("سفارش جدید دارید")
                    orderListLength = res
                }
            })
        }, 60000);
        return () => {
            clearInterval(interval)
        }
    }, [])
    useEffect(() => {getAnything("/orders" , setOrder)}, [isModal])

    const changeStatus = async (element) => {
        
        const { data } = await customAxios.get(`/orders/${element._id}`)

        await customAxios.put(`/orders/${element._id}`,{
            status : !data.status
        })
        getAnything("/orders" , setOrder)
        toast.success("عملیات با موفقیت انجام شد") 
    }
    const refresh = () => {
        getAnything("/orders" , setOrder)
        toast.success("بروزرسانی با موفقیت انجام شد") 
    }
    

    return (
        <>
            <div className="float-right mb-1 w-[120px] cursor-pointer" onClick={refresh}>
                <div className="mx-auto bg-white py-2 px-10 rounded-md center-row gap-2 [&:hover>img]:-rotate-90">
                    <span>بروزرسانی</span>
                    <img src="../src/assets/panel/refresh.png" alt="" className="h-[25px] transition" />
                </div>
            </div>

        
            <div className="overflow-x-scroll rtl w-full shadow rounded-lg border-t bg-white p-3">
                <div className="w-full rtl overflow-x-scroll" id="list">

                    <div className="grid grid-cols-10 max-md:w-[800px] max-sf:w-[700px]">
                        <span className="col-span-3">مشتری</span>
                        <span className="col-span-2">شماره همراه </span>
                        <span className="text-center col-span-1"> شماره میز </span>
                        <span className="text-center col-span-2">ساعت</span>
                        <span className="col-span-2 pr-4">وضعیت</span>
                    </div>

                    {

                        order?.map((el,index)=> {

                            
                            return (
                                <div key={index} className="bg-white text-[#6e6b7b] mt-2 py-1 border-b rtl grid grid-cols-10 max-md:w-[800px] max-sf:w-[700px]">
                                    
                                    <div className="flex items-center cursor-pointer transition col-span-3" onClick={() => navigate(`${el._id}`)}>
                                        <div className="w-7 h-7 rounded-full ml-2">
                                            <img src={`../src/assets/Profile1.png`} alt="" />
                                        </div>
                                        <div className="text-[14px] truncate"> {el.name}</div>
                                    </div>

                                    <div className="flex items-center text-[14px] col-span-2">0{el.phone}</div>
                                    <div className="center-row text-[14px] col-span-1">{el.table}</div>
                                    <div className="center-row text-[14px] col-span-2">{el.date.slice(10)}</div>

                                    <div className="flex gap-2 col-span-2">
                                        <div className="w-[90px] whitespace-nowrap pt-2">
                                            <div className={`w-[82px] px-2 py-1 rounded-xl cursor-pointer text-[13px] center-row ${el.status ? "bg-[#e5f8ed] text-[#28c76f]" : "bg-[#fdeaea] text-[#ea5455]"}`} onClick={() => changeStatus(el)}>{el.status ? "پرداخت شده" : "پرداخت نشده"}</div> 
                                        </div>
                                        
                                        <div className="w-[90px] whitespace-nowrap pt-2">
                                            <div className="w-[60px] py-1 rounded-xl cursor-pointer text-[13px] center-row bg-[#fdeaea] text-[#ea5455]" onClick={() => deleteOrder(el._id)}>حذف</div> 
                                        </div>
                                    </div>                                        
                                </div>
                            )

                        })
                    }



                        
                </div>
            
            </div>
        </>
         

    )

}

export default Orders
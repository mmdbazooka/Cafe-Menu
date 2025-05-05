import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import customAxios from '../interceptor/customAxios'
import { context } from '../context/AppContext'

const Category = () => {
    
    const navigate = useNavigate()
    const [arr, setArr] = useState([])
    const location = useLocation()
    const time = useRef()
    
    const { setItems , setIsFood } = useContext(context)

    const getItems = async () => {
        const { data } = await customAxios.get("/category")
        setArr(data)
    }

    useEffect(() => {

      getItems()

    }, [])
    

    const navigator = (element) => {
        navigate("/" + element.name[0])
    }

    const search = async (e) => {

        clearTimeout(time.current)

        let set = setTimeout(async() => {
            let { data } = await customAxios.get("/items")
            data = data.filter((element) => {
                return location.pathname == "/" ? data : `/${element.category}` == location.pathname
            })
            const filtered = data.filter((element) => {
                return element.name.indexOf(e.target.value) !== -1
            })
            console.log("🚀 ~ filtered ~ filtered:", filtered)
            if(filtered.length == 0) setIsFood(true)
            else {
                setIsFood(false)
                setItems(filtered)
            }
            

        }, 500);

        time.current = set

        
         
    }

    return (
        <>

            <div className='max-w-[1920px] mx-auto rtl px-4'>

                <div id='gallery' className='border-2 mt-1 flex shadow rounded-md py-4 px-2 overflow-x-scroll rtl max-sx:py-2'>
                    {
                        arr.map((element , index) => {
                            
                            return (

                                <div key={index} onClick={ () => navigator(element) } className='h-[100px] px-8 max-sx:px-5 bg-white border-t rounded shadow-lg mx-2 cursor-pointer center-col [&>div]:text-[14px] hover:-translate-y-1 transition hover:shadow-2xl hover:scale-[101%] [&>div]:whitespace-nowrap max-md:[&>div]:text-[12px] max-sm:[&>div]:text-[10px] max-sx:[&>div]:text-[9px] max-md:h-[90px] max-sm:h-[80px] max-sx:h-[70px]'>
                                    <img src={`../src/assets/Category/${ element.img }`} alt="" className="h-1/2 " />
                                    <div className={element.name[0].length <= 5 ? "px-2" : ""}> { element.name[0] } </div>
                                    <div> { element.name[1] } </div> 
                                </div>
                            )
                        })
                    } 
                </div>
                <div>
                    
                    <input type="text" id='inputSearch' onInput={search} className='w-[40%] max-sm:w-full border rounded-md outline-none rtl p-2 mt-2 transition shadow search placeholder:text-[13px] max-sx:placeholder:text-[11px] placeholder:text-[#888] pr-4' placeholder='جستجو کنید...' />
                </div>

            </div>
        
        </>
    )

}

export default Category
import { Field, Form, Formik } from "formik"
import customAxios from "../../interceptor/customAxios";
import { useRef } from "react";
import { toast } from "react-toastify";

const AddCategory = () => {

    const parentImg = useRef(null)
    const images = ["1","2","3","4","5","6","7","8","9","10","11","12","14","15","16","17","18"]
    let selectedImg = ""

    const selector = (e) => {

        for(let i = 0 ; i < parentImg?.current?.children.length ; i++) {
            parentImg?.current?.children[i].classList.remove("!border-4")
            parentImg?.current?.children[i].classList.remove("border-[#28c76f]")
        }
        if(e.target.nodeName == "IMG") { 
            selectedImg = e.target.getAttribute("src")
            e.target.parentNode.classList.add("!border-4")
            e.target.parentNode.classList.add("border-[#28c76f]")
        }
        else {
            selectedImg = e.target.firstChild.getAttribute("src")
            e.target.classList.add("!border-4")
            e.target.classList.add("border-[#28c76f]")
        }

        selectedImg = selectedImg.slice(selectedImg.lastIndexOf("/"))
    }

    const onSubmit = async (value) => { 
        if(selectedImg) {
            
            await customAxios.post("/category", {
                name: [value.englishname.replace(/\s+/g,"-"),value.persianname],
                img : `${selectedImg}`
            })
            toast.success("عملیات با موفقیت انجام شد") 
        }
    }

    return (
      <Formik initialValues={{persianname : "" , englishname : "" }} onSubmit={value => onSubmit(value)}>
                      
        <Form className="w-full border rounded-md p-3 [&>div]:my-4 rtl">
            
                <span className="fieldTitle">اسم دسته بندی به فارسی</span>
                <Field name="persianname" className="field" placeholder="اسم آیتم..." />
                
                <span className="fieldTitle">اسم دسته بندی به انگلیسی</span>
                <Field name="englishname" className="field" placeholder="اسم آیتم..." />

                <span className="fieldTitle">عکس دسته بندی</span>
                <div ref={parentImg} className="grid grid-cols-12 gap-4 max-sm:grid-cols-10 max-sf:grid-cols-8 max-sl:grid-cols-6">
                    {

                        images.map((element , index) => {
                            return (
                                <div key={index} className="border-t shadow h-[100px] p-2 col-span-2 center-row cursor-pointer rounded-md" onClick={selector}>
                                    <img src={"../src/assets/Category/" + element + ".png"} alt="" className='h-full max-md:h-[80%] max-sx:h-[70%]' />
                                </div>
                            )
                        })
                    
                    }
                </div>
                
        
            
            <button type="submit" className="mx-auto w-full cursor-pointer rounded-md bg-gradient-to-r from-[#70d276] to-[#47bf80] hover:bg-gradient-to-l transition center-row text-white text-[15px] p-2">اضافه کردن دسته بندی</button>

        </Form>

      </Formik>

    )
    
}

export default AddCategory
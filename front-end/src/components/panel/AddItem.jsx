import { Field, Formik , Form } from "formik"
import Select from "react-select";
import { useEffect, useState } from "react";
import customAxios from "../../interceptor/customAxios";
import { ToastContainer, toast } from "react-toastify";

let selectedImg = ""
let selectedCat = ""

const AddItem = () => {

    const [options, setOptions] = useState()
    const [isPic, setIsPic] = useState(false)

    


    const getCat = async () => {

        let { data } = await customAxios.get("/category")
        data = data.map((el) => {
            return { label : el.name[0] , value : el.name[0] }
        })
        setOptions(data)

    }

    useEffect(() => {
        getCat()
    }, [])
    
    const handleImg = async (e) => {
        selectedImg = e.target.files[0]; 

        const formData = new FormData();
        formData.append("img", selectedImg); 
        await customAxios.post("/uploads", formData);
        
        const { data } = await customAxios.get(`/uploads/${selectedImg.name}`, { 
            responseType: 'blob' 
        }); 
        const reader = new FileReader(); 
        reader.readAsDataURL(data);  

        reader.onloadend = () => { 
            setIsPic(true)
            selectedImage.src = reader.result; 
        }; 
         

    }

    const handleChange = (e) => {
        selectedCat = e.value
    }
    
    const onSubmit = async (e) => {
        if (selectedImg !== "" && selectedCat !== "") {
    
            const { data } = await customAxios.get(`/uploads`)
            const found = data.files.findIndex((element) => {
                return element.indexOf(selectedImg.name) !== -1
            })
    
            await customAxios.post("/items", {
                name: e.name, 
                img: `/uploads/${data.files[found]}`,
                category: selectedCat, 
                price: e.price, 
                recipe: e.recipe
            })
            toast.success("عملیات با موفقیت انجام شد") 
            e.name = ""
            e.price = ""
            e.recipe = ""
            setIsPic(false)


        } 
    };
    
    
    return (

        <div className="h-full rtl">

            <Formik initialValues={{name : "" , price : "" , category : "" , recipe : ""}} onSubmit={value => onSubmit(value)}>
                
                <Form className="border rounded-md p-3 [&>div]:my-2">
                    
                        <span className="fieldTitle">اسم آیتم</span>
                        <Field name="name" className="field" placeholder="اسم آیتم..." />
                        
                        <span className="fieldTitle">عکس آیتم</span>
                        <input type="file" id="imgInput" onChange={handleImg} className="hidden" placeholder="عکس آیتم..." />
                        <label htmlFor="imgInput" className="inline-block field !h-[300px] bg-white !border-2 !border-dashed cursor-pointer center-row gap-4" id="imgHolder">
                            
                            
                            <img src="" alt="" className={`w-[150px] h-[150px] rounded-lg ${isPic ? "block" : "hidden"}`} id="selectedImage" />

                            { 
                                !isPic && 
                                <>
                                  <span className="text-[14px] text-[#666]">انتخاب فایل</span>
                                  <img src="https://backend-digital-menu.liara.run/uploads/panel/uploadPic.png" alt="" className="w-8" id="uploadPic" />

                                </>

                            }
                        </label>
                        
                        <span className="fieldTitle">قیمت آیتم</span>
                        <Field name="price" type="number" className="field" placeholder="قیمت آیتم..." />
                        
                        <span className="fieldTitle">دسته بندی آیتم</span>
                        <Select onChange={handleChange} options={options} placeholder="دسته بندی آیتم..." className="[&>div>div>div]:text-[12px] [&>div>div>div>input]:outline-none"/>
                        
                        <span className="fieldTitle">دستورالعمل آیتم</span>
                        <Field name="recipe" className="field" placeholder="دستورالعمل آیتم..." />

                
                    
                    <button type="submit" className="mx-auto w-full cursor-pointer rounded-md bg-gradient-to-r from-[#70d276] to-[#47bf80] hover:bg-gradient-to-l transition center-row text-white text-[15px] p-2">اضافه کردن آیتم</button>

                </Form>

            </Formik>

            <ToastContainer autoClose={5000} position="top-center" draggable={true} />
        </div>

    )

}

export default AddItem
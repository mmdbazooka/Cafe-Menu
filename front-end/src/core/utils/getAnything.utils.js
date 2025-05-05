import customAxios from "../../interceptor/customAxios"

const getAnything = async (url,setState) => {

    let { data } = await customAxios.get(url)
    setState(data)
    return data.length

}

export default getAnything
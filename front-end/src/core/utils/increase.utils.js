import counter from "./counter.utils"

const increase = (e,element,address) => {
        
    let num = (+e.target.nextElementSibling.innerText)
    e.target.nextElementSibling.innerText = ++num
    let basket = JSON.parse(localStorage.getItem("basket"))
    let found = basket.find((el) => {
        return el._id == element._id
    })
    found.qty = ++found.qty 
    localStorage.setItem("basket",JSON.stringify(basket))

    if(address == "basket") counter()
}

export default increase
import counter from "./counter.utils"


const decrease = (e,element,set,bool) => {
    let basket = JSON.parse(localStorage.getItem("basket"))
    let num = (+e.target.previousElementSibling.innerText)

    if(num == 1) {
        let filtered = basket.filter((el) => {
            return el._id !== element._id
        })
        localStorage.setItem("basket",JSON.stringify(filtered))
        
        if(bool) {
            set(JSON.parse(localStorage.getItem("basket")))
        }
        else {
            set(false)
        }
    }
    else {
        e.target.previousElementSibling.innerText = --num
        let found = basket.find((el) => {
            return el._id == element._id
        })
        found.qty = --found.qty 
        localStorage.setItem("basket",JSON.stringify(basket))
    }

    counter()
}   

export default decrease

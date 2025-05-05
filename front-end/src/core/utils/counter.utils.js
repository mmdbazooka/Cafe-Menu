
const counter = () => {
    let price = 0
    JSON.parse(localStorage.getItem("basket")).map((el) => {
        price = price + el.price*el.qty
    })
    par.innerHTML = ""
    par.innerHTML =`${new Intl.NumberFormat('fa-IR').format(price)} تومان`

}

export default counter
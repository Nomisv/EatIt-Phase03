export default  {
    cart: null,
    addItem(id) {
        if (!this.cart) {
            this.cart = this.getLocalCart()
        }
        if (!this.cart[id]) {
            this.cart[id] = {
                id,
                num: 1
            }
            this.updateLocal()
            return this
        }
        this.cart[id].num++
        this.updateLocal()
        return this
    },
    clearCart() {
        this.cart = {}
        this.updateLocal()
        return this
    },
    getLocalCart() {
        let cart = null
        try {
            cart = JSON.parse(window.localStorage.getItem('cart')) || {}
        } catch (error) {
            cart = {}
        }
        return cart
    },
    updateLocal() {
        window.localStorage.setItem('cart', JSON.stringify(this.cart))
    }
}
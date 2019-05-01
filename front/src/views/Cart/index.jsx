import React, { Component } from "react";
import "./index.css"
import Cart from '../cart'
const axios = window.axios
export default class CartCom extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }
    componentWillMount() {
        this.getCartInfo()
    }
    async getCartInfo() {
        const { data } = await axios({
            url: `http://127.0.0.1:8088/api/cart`,
            method: "post",
            data: Cart.getLocalCart()
        })
        this.setState({ data })
    }
    onEmptyCart = () => {
        Cart.clearCart()
        this.setState({
            data: []
        })
    }
    getUser() {
        const user = JSON.parse(window.sessionStorage.getItem('user'))
        if (!user) {
            this.props.history.push(`/login`)
            return {}
        }
        return user
    }
    PlaceOrder = async () => {
        const { data } = await axios({
            url: `http://127.0.0.1:8088/api/order`,
            method: "post",
            data: {
                userId: this.getUser()._id,
                data: this.state.data
            }
        })
        if (data.code == -1) {
            this.props.history.push(`/login`)
            return
        }
        Cart.clearCart()
        this.setState({
            data: []
        })
        alert("checkout success")
    }
    render() {
        let total = 0
        this.state.data.map(item => {
            total += item.goods.price * item.num
        })
        const isPlace = this.state.data.length !== 0
        return (
            <div className="cart">
                <h3 style={{textAlign:"center"}}>EATIT</h3>
                <div className="row">
                    <div className="col-lg-12">
                        <a onClick={() => this.props.history.push(`/home`)} style={{ marginRight: 20 }}>home</a>
                        <a onClick={() => this.props.history.push(`/order`)} style={{ marginRight: 20 }}>show my order</a>
                        {isPlace && <a onClick={this.PlaceOrder} className="btn" style={{ marginRight: 20 }}>Place an order</a>}
                        <a onClick={this.onEmptyCart} style={{ marginRight: 20 }} className="btn">Empty cart</a>
                        <a onClick={() => this.props.history.push(`/login`)} style={{ marginRight: 20 }}>logout</a>
                    </div>
                </div>
                <br />
                <div >
                    <strong style={{ color: "red" }}>total price : ${total}</strong>
                </div>
                <div className="row" >
                    {this.state.data.map((item, key) => {
                        return (
                            <div className="col-sm-12" key={key}>
                                <div className="item">
                                    <div className="item-bg" style={{ backgroundImage: `url(http://127.0.0.1：8088/${item.goods.image})` }}>
                                    </div>
                                    <div className="item-right">
                                        <h3 className="line2">{item.goods.name}</h3>
                                        <h3 className="line2">{item.goods.title}</h3>
                                        <div className="item-ft">
                                            <span className="line1">x {item.num}</span>
                                            <span className="line1">${item.goods.price * item.num}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

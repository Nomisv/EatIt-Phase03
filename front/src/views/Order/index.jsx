import React, { Component } from "react";
import "./index.css"
const axios = window.axios
export default class Order extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            _id: "",
            isAdmin: window.location.href.indexOf('type=1') !== -1
        };
    }
    componentWillMount() {
        this.getOrder()
    }
    getUser() {
        const user = JSON.parse(window.sessionStorage.getItem('user'))
        if (!user) {
            this.props.history.push(`/login`)
            return {}
        }
        return user
    }
    async getOrder() {
        const { data } = await axios({
            url: `http://127.0.0.1:8088/api/order/list`,
            params: {
                userId: this.getUser()._id,
                all: this.state.isAdmin,
                _id:this.state._id
            }
        })
        this.setState({
            data
        })
    }
    deleteOrder = async (_id) => {
        const { data } = await axios({
            url: `http://127.0.0.1:8088/api/order/delete`,
            params: {
                id: _id,
            }
        })
        this.getOrder()
    }
    render() {

        return (
            <div>
                <h3 style={{textAlign:"center"}}>EATIT</h3>
                <div style={{ textAlign: "center" }}>
                    {!this.state.isAdmin && <a onClick={() => this.props.history.push(`/home`)} style={{ marginRight: 20 }}>home</a>}
                    {!this.state.isAdmin && <a onClick={() => this.props.history.push(`/cart`)} style={{ marginRight: 20 }}>show my cart</a>}
                    {this.state.isAdmin && <a onClick={() => this.props.history.push(`/addgoods`)} style={{ marginRight: 20 }}>show my addgoods</a>}
                    <a onClick={() => this.props.history.push(`/login`)} style={{ marginRight: 20 }}>logout</a>
                </div>
                <div style={{textAlign:"center"}}>
                    <input value={this.state._id} onChange={(e) => this.setState({ _id: e.target.value })} placeholder="" />
                    <button onClick={() => this.getOrder()}>search</button>
                </div>
                <table style={{ backgroundColor: "#fff" }}>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>status</td>
                            <td>user</td>
                            <td>createdAt</td>
                            <td>totalPrice</td>
                            <td>action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td style={{ color: "green", fontWeight: 700 }}>{item._id}</td>
                                    <td>{item.status === 0 ? 'Place an order' : ''}</td>
                                    <td>{item.user.userName}</td>
                                    <td>{item.createdAt}</td>
                                    <td>${item.totalPrice}</td>
                                    <td>
                                        <button onClick={() => this.deleteOrder(item._id)}>delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

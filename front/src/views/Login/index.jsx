import React, { Component } from "react";
import "./index.css"
const axios = window.axios
export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            password: ""
        };
    }
    componentWillMount() {

    }
    submit = async () => {
        const { userName, password } = this.state
        if (!userName) {
            return window.showToast("Please enter one user name");
        }
        if (!password) {
            return window.showToast("Please enter one password");
        }
        const { data } = await axios({
            url: 'http://127.0.0.1:8088/api/login',
            method: "post",
            data: {
                userName: userName,
                password: password
            }
        })
        if (data.code !== 0) {
            return alert(data.message);
        }
        window.sessionStorage.setItem('user', JSON.stringify(data.data))
        setTimeout(() => {
            if (data.data.role === 0) {
                this.props.history.push(`/addgoods`)
            } else {
                this.props.history.push(`/home`)
            }
        }, 500);
    }
    render() {
        return (
            <div className="form">
                <h3>EATIT</h3>
                <h3>Login</h3>
                <input value={this.state.userName} onChange={(e) => { this.setState({ userName: e.target.value }) }} id="userName" type="text" placeholder="User Name" />
                <input value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} id="password" type="password" placeholder="User Password" />
                <button onClick={this.submit} id="button" type="button" className="btn btn-danger btn-block">Login</button>
                <a onClick={() => this.props.history.push(`/register`)} type="button" className="btn btn-danger btn-block">register</a>
            </div>
        );
    }
}

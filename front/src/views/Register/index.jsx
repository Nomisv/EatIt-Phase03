import React, { Component } from "react";
import "../Login/index.css"
const axios = window.axios
export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            password1: "",
            password2: ""
        };
    }
    componentWillMount() {

    }
    submit = async () => {
        const { userName, password1, password2 } = this.state
        if (!userName) {
            return alert("Please enter one user name");
        }
        if (userName.length < 6) {
            return alert("User name not less than 6 digits");
        }
        if (!password1) {
            return alert("Please enter one password");
        }
        if (password1.length < 6) {
            return alert("Password not less than 6 digits");
        }
        if (!password2) {
            return alert("Please enter a confirmation password");
        }
        if (password1 !== password2) {
            return alert("Two password inconsistencies");
        }
        const { data } = await axios({
            url: 'http://127.0.0.1:8088/api/users/create',
            method: "post",
            data: {
                userName: userName,
                password: password1
            }
        })
        if (data.code !== 0) {
            return alert(data.message);
        }
        alert("signin success!");
        setTimeout(() => {
            this.props.history.push(`/login`)
        }, 500);

    }
    render() {
        return (
            <div className="form" >
                <h3>EATIT</h3>
                <h3>Register</h3>
                <input value={this.state.userName} onChange={(e) => { this.setState({ userName: e.target.value }) }} id="userName" type="text" placeholder="User Name" />
                <input value={this.state.password1} onChange={(e) => { this.setState({ password1: e.target.value }) }} id="password1" type="password" placeholder="User Password" />
                <input value={this.state.password2} onChange={(e) => { this.setState({ password2: e.target.value }) }} id="password2" type="password" placeholder="Confirm password" />
                <button onClick={this.submit} id="button" type="button" className="btn btn-danger btn-block">register</button>
                <a onClick={() => this.props.history.push(`/login`)} type="button" className="btn btn-danger btn-block">login</a>
            </div >
        );
    }
}

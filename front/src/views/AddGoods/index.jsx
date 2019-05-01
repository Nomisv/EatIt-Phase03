import React, { Component } from "react";
import "./index.css"
const axios = window.axios
export default class AddGoods extends Component {
    constructor() {
        super();
        this.state = {
            name: "", //
            title: "",//
            price: 0, //
            desc: "",//
            image: "",//
        };
    }
    componentWillMount() {

    }
    inputChange = (e) => {
        var img;
        img = e.target.files[0];
        var formData = new FormData();
        var vm = this
        formData.append("file", img);
        fetch('http://127.0.0.1:8088/upload', {
            method: "POST",
            body: formData,
        }).then(res => res.json()).then(data => {
            this.setState({
                image: data.url
            })
        })
    }
    submit = async () => {
        const keys = ['name', 'title', 'price', 'desc', 'image']
        for (let key of keys) {
            if (!this.state[key]) {
                alert(`${key} not be empty`)
                return
            }
        }
        const { data } = await axios({
            url: `http://127.0.0.1:8088/api/goods/create`,
            method: "post",
            data: this.state,
        })
        alert("add success")
        this.setState({
            title: "",
            name: "",
            image: "",
            price: 0,
            desc: ""
        })
    }
    render() {
        return (
            <div className="addgoods">
                <h3 style={{textAlign:"center"}}>EATIT</h3>
                <div className="row">
                    <div className="col-lg-12">
                        <a onClick={() => this.props.history.push(`/order?type=1`)} style={{ marginRight: 20 }}>show my order</a>
                        <a onClick={() => this.props.history.push(`/login`)} style={{ marginRight: 20 }}>logout</a>
                    </div>
                </div>
                <br />
                <div className="row" >
                    <label style={{ width: 80 }}>name</label>
                    <input type="text" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                </div>
                <div className="row" >
                    <label style={{ width: 80 }}>title</label>
                    <input type="text" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
                </div>
                <div className="row" >
                    <label style={{ width: 80 }}>price</label>
                    <input type="text" value={this.state.price} onChange={(e) => this.setState({ price: ~~e.target.value })} />
                </div>
                <div className="row" >
                    <label style={{ width: 80 }}>desc</label>
                    <input type="text" value={this.state.desc} onChange={(e) => this.setState({ desc: e.target.value })} />
                </div>
                <div className="row" >
                    <label style={{ width: 80 }}>image</label>
                    <input onChange={this.inputChange} type="file" id="exampleInputFile" accept="image/*" />
                    {this.state.image && <img style={{ width: 100 }} src={`http://127.0.0.1:8088/${this.state.image}`} alt="" />}
                </div>
                <div className="row" >
                    <button onClick={this.submit} type="button" className="btn btn-danger btn-block">Submit</button>
                </div>
            </div>
        )
    }
}

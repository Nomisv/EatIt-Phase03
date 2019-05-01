import React, { Component } from "react";
import "./index.css"
import Cart from '../cart'
const axios = window.axios
export default class Home extends Component {
  getUser() {
    const user = JSON.parse(window.sessionStorage.getItem('user'))
    if (!user) {
      this.props.history.push(`/login`)
      return {}
    }
    return user
  }
  constructor() {
    super();
    this.state = {
      user: this.getUser(),
      text: "",
      data: []
    };
  }
  componentWillMount() {
    this.getData()
  }
  getData = async () => {
    const { data } = await axios({
      url: `http://127.0.0.1:8088/api/goods/list?text=${this.state.text}`,
    })
    this.setState({
      data
    })
  }
  addCart = (_id) => {
    Cart.addItem(_id)
    this.props.history.push(`/cart`)
  }
  render() {
    return (
      <div className="home">
        <h3 style={{textAlign:"center"}}>EATIT</h3>
        <div className="row">
          <div className="col-lg-12">
            <a onClick={() => this.props.history.push(`/order`)} style={{ marginRight: 20 }}>show my order</a>
            <a onClick={() => this.props.history.push(`/cart`)} style={{ marginRight: 20 }}>show my cart</a>
            <a onClick={() => this.props.history.push(`/login`)} style={{ marginRight: 20 }}>logout</a>
          </div>
          <div className="col-lg-12">
            <div className="input-group">
              <span className="input-group-btn">
                <button className="btn btn-default" type="button" onClick={this.getData}>search</button>
              </span>
              <input value={this.state.text} onChange={(e) => this.setState({ text: e.target.value })} type="text" className="form-control" placeholder="Search for .." />
            </div>
          </div>
        </div>
        <br />
        <div className="row" >
          {this.state.data.map((item, key) => {
            return (
              <div className="col-sm-4 col-md-3" key={key}>
                <div className="item">
                  <div className="item-bg" style={{ backgroundImage: `url(http://127.0.0.1:8088/${item.image})` }}>
                  </div>
                  <h3 className="line2">{item.name}</h3>
                  <h3 className="line2">{item.title}</h3>
                  <div className="item-ft">
                    <span className="line1">${item.price}</span>
                    <i onClick={() => this.addCart(item._id)}>add Cart</i>
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

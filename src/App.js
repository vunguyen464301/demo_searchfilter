import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Alert, Form, Button } from 'react-bootstrap';
import { api } from './api/index'
import { getData } from './services/actions'
import { connect } from 'react-redux'
import { IoIosCloseCircle } from 'react-icons/io';
// import { FaBeer } from 'react-icons/fa';
let obj = [
  {
    id: '1',
    name: 'Bánh cuốn',
  },
  {
    id: '2',
    name: 'Bánh chiên',
  }, {
    id: '3',
    name: 'Bánh bèo',
  }, {
    id: '4',
    name: 'Há cảo',
  }, {
    id: '5',
    name: 'Xíu mại',
  }, {
    id: '6',
    name: 'Xúc xích',
  }
]


class App extends React.Component {

  state = {
    obj: obj,
    inputName: "",
    listNameCheck: [],
    marginLeftInput: 0
  }
  textChoose = (obj) => {
    return (
      <text onClick={() => { this.btnClickRemove(obj.id) }}
        style={{ background: '#dbd6c0', marginBottom: '13px', marginTop: '13px', marginLeft: '6px', marginRight: '6px' }}>
        {obj.name}
        <IoIosCloseCircle style={{ marginBottom: '5px' }} />
      </text>
    )
  }
  renderTextChoose = (arr) => {
    return (
      <div className="row" style={{  marginLeft: '10px' }}>
        {arr.map(i => this.textChoose(i))}
      </div>
    )

  }
  renderShowText = (arr) => {
    return (
      <ul style={{ listStyle: 'none' }}>
        {arr.map(i => <li onClick={() => { this.btnClickShowText(i) }}><text style={{ background: '#e5be20' }}>{i.name}</text></li>)}
      </ul>
    )
  }
  btnClickRemove = async (id) => {
    const { listNameCheck } = this.state;
    let result = await listNameCheck.filter(e => e.id !== id)
    await this.setState({ listNameCheck: result })
    let mlI = 0;
    await result.forEach(e => {
      mlI = mlI + e.name.length * 10 + 20;
    })
    this.setState({ marginLeftInput: mlI })
  }
  btnClickShowText = (obj) => {
    const { listNameCheck } = this.state;
    let d = listNameCheck;
    d.push(obj);
    this.setState({ listNameCheck: d })
    let mlI = 0;
    d.forEach(e => {
      mlI = mlI + e.name.length * 10 + 20;
    })
    this.setState({ marginLeftInput: mlI })
  }
  handleOnChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value
    });
    let str = this.state.inputName.toUpperCase();
    let data = obj.filter(e => e.name.toUpperCase().search(str) != -1)
    this.setState({ obj: data })
  }
  render() {
    const { obj, listNameCheck, marginLeftInput } = this.state;
    return (
      <div >
        <div style={{ width: '800px', height: '50px' }}>
          {/* {this.renderTextChoose(listNameCheck)} */}
          {this.textChoose({id:1,name:"Bánh tráng"})}
          {this.textChoose({id:2,name:"Bánh bèo"})}
          <input style={{ width: '100%', height: '100%', paddingLeft: marginLeftInput + "px" }} name='inputName' onChange={this.handleOnChange} />
        </div>
        {/* {this.renderShowText(obj)} */}
      </div>
    )
  }


  getUser = async () => {
    var d = await api.get();
    this.props.getData(d)
    console.log(this.props.dataUser.data)
  }
}

const mapState = ({ dataUser }) => ({
  dataUser,
})
const mapDispatch = {
  getData,
}
export default connect(mapState, mapDispatch)(App)


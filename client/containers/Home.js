import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {BarChart} from 'components';
import superagent from 'superagent';
export default class Home extends Component{
  state = {
    packageData: [],
    days: 1
  };

  getData(days){
    const req = superagent.get('/packagebehaviour_api?days=' + days);
    req.send().
    then(res => {
      console.log(res.body);
      this.setState({packageData: res.body[this.refs.select.value], days: this.refs.days.value})
    }, err => {
      console.log(err.response.body);
    });
  }

  onSubmitDays =() =>{
    this.getData(this.refs.days.value);
  }

  onSelectChange =() => {
    this.getData(this.state.days);
  }

  componentWillMount(){
    this.getData(this.state.days);
  }

  render(){
    return(
      <div>
        <h1> Bar Graph </h1>
        <select ref = 'select' onChange = {() => this.onSelectChange()}>
          <option value="ipData">IP</option>
          <option value="locationData">LOCATION</option>
          <option value="customerData">CUSTOMER</option>
          <option value="clickDateData">CLICKDATE</option>
        </select>
        &nbsp; &nbsp;
        <input type='text' defaultValue={this.state.days} placeholder='Enter Days' ref='days' />
        <button onClick ={() => this.onSubmitDays()}> Submit days </button>
        <BarChart data={this.state.packageData}/>
      </div>
    );
  }
}

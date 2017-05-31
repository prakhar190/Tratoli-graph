import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {BarChart} from 'components';
import superagent from 'superagent';
export default class Home extends Component{
  state = {
    packageData: []
  };
  onSelectChange =() => {
    const req = superagent.get('/packagebehaviour_api');
      req.send({prakhar: 'ip'}).
      then(res => {
        console.log(res.body);
        this.setState({packageData: res.body[this.refs.select.value]})
      }, err => {
        console.log(err.response.body);
      });
  }

  componentWillMount(){
    const req = superagent.get('/packagebehaviour_api');
      req.send().
      then(res => {
        console.log(res.body);
        this.setState({packageData: res.body.ipData})
      }, err => {
        console.log(err.response.body);
      });
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
        <BarChart data={this.state.packageData}/>
      </div>
    );
  }
}

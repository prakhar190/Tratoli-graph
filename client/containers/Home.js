import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {BarChart} from 'components';
import superagent from 'superagent';
export default class Home extends Component{
  state = {
    packageData: []
  };

  componentWillMount(){
    const req = superagent.get('/packagebehaviour_api');
      req.send().
      then(res => {
        console.log(res.body);
        this.setState({packageData: res.body})
      }, err => {
        console.log(err.response.body);
      });
  }
  render(){
    return(
      <div>
        <h1> Bar Graph </h1>
        // <select>
        //   <option value="volvo">Volvo</option>
        //   <option value="saab">Saab</option>
        //   <option value="mercedes">Mercedes</option>
        //   <option value="audi">Audi</option>
        // </select>
        <BarChart data={this.state.packageData}/>
      </div>
    );
  }
}

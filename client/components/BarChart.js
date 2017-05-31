import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';

export default class BarChart extends Component{
  render(){
    let labels =[]
    let count = []
    this.props.data.map((data, index) => {
        labels.push(data.keyData)
        count.push(data.occuring)
		})
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Count',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: count
        }
      ]
    };
    return(
      <HorizontalBar
        data={data}
        width={100}
        height={50}
        options={{
            maintainAspectRatio: true
        }}
      />
    );
  }
}

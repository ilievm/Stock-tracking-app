import React, { Component } from 'react';
import './styles.css';
import CanvasJSReact from '../assets/canvasjs.react';
import Stock from "./userInputFunction/userInputFunction";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

 
// let thestyles = {
// 	backgroundColor: 'red',
// width: '90vw', }
let options;
let searchTearm

let dataPoints1;
let dataPoints2;
let dataPoints3;
let dataPoints4;

class MultiseriesChart extends Component {	
	constructor(props) {
		super(props);
		this.state = {
		  stockChartXValues: [],
		  stockChartYValues: []
		//   where do we write info from the api
		}			
		this.pushData=this.pushData.bind(this);
		this.handleSearch=this.handleSearch.bind(this)	
		this.testlog=this.testlog.bind(this)	
	  }
	
	  componentDidMount() {
		this.fetchStock()		
	  }
	//   reading api on start
	
	  fetchStock() {
		const pointerToThis = this;
		// console.log(pointerToThis);
		const API_KEY = '740WRQPFQK10PTAG';
		let StockSymbol = 'INX';
		let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${StockSymbol}&apikey=${API_KEY}`;
		let stockChartXValuesFunction = [];
		let stockChartYValuesFunction = [];
	
		fetch(API_Call)
		  .then(
			function(response) {
			  return response.json();
			}
		  ) /* actually fetching data */
		  .then(
			function(data) {					
			  for (var key in data['Monthly Adjusted Time Series']) {
				stockChartXValuesFunction.push(key);
				stockChartYValuesFunction.push(Math.floor(Number(data['Monthly Adjusted Time Series'][key]['5. adjusted close'])));
				
			}
			// pushing them in the state
			
			  pointerToThis.setState({
				stockChartXValues: stockChartXValuesFunction,
				stockChartYValues: stockChartYValuesFunction
				//  /\state.............../\value from the function above
			  })
			//   console.log(pointerToThis.state);
			  
			}
		  )
	  }
	// iterates over the function above and pushes values one by one to a new var and returns it
	Stock1(param) {
		let y = [];
		for (let i = 0;  i <= this.state.stockChartXValues.length; i++) {
			y.push({y: this.state.stockChartYValues[i], label: this.state.stockChartXValues[i]})}
		return y
	// iterates over state and one by one pushing stock to Y on command. then called from render to chart the line
	}

	rerenderOnUpd() {
		this.chart.render()
	}

	handleSearch(event){searchTearm = event.target.value}
	// assigns to searchTerm whatever is in typed in the input field
	componentDidUpdate(){
		
	}

	 pushData(){
		options.data.push(Stock.fetchStock(searchTearm)); 
		// this.chart.render();
		setTimeout(() => {
			this.rerenderOnUpd();
			console.log('updated');
			
		}, 800);
		setTimeout(() => {
			this.rerenderOnUpd();
			console.log('updated');
			
		}, 1800);
		setTimeout(() => {
			this.rerenderOnUpd();
			console.log('updated');
			
		}, 2500) 
	}

	testlog(){
		console.log(Stock.fetchStock('INX'));
	}

	render() {
			options = {
				animationEnabled: true,	
				zoomEnabled: true,
				exportEnabled: true,
				title:{
					text: "Stock Perfomance"
				},
				axisX:{
					reversed: true,
				},
				axisY : {
					title: "Price(USD)",
					prefix: "$",
					includeZero: true
	
				},
				toolTip: {
					shared: true
				},
				
				data: [
			/* 1 */	{
						type: "line",
						name: 'INX',
						xValueFormatString: "MMM YYYY",
						showInLegend: true,
						dataPoints: this.Stock1()
					}
				]}


		return (
		<div /* style={thestyles} */>
			<h1>React Multiseries Chart</h1>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}		/>
			{/* You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods */}
			<input placeholder="Search by index" onChange={this.handleSearch} /> 
			<button className="testbutton" onClick={this.pushData}>pushData</button>
		</div>
		);
	}
}

export default MultiseriesChart;
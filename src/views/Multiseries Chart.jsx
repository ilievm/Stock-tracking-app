import React, { Component } from 'react';
import './styles.css';
import CanvasJSReact from '../assets/canvasjs.react';
import Stock from "./userInputFunction/userInputFunction";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

let options;
let searchTearm;
let counter = 0;


class MultiseriesChart extends Component {	
	constructor(props) {
		super(props);
		this.state = {
		//   stockChartXValues: [],
		//   stockChartYValues: []
		//   percentChartXValues: [],
		//   percentChartYValues: []
		//   where do we write info from the api
		}			
		this.pushData=this.pushData.bind(this);
		this.handleSearch=this.handleSearch.bind(this)	
		this.testlog=this.testlog.bind(this)	
	  }
	
	  componentDidMount() {
		// this.fetchStock()		
		const receivedObjects = Stock.fetchStock('INX')		 
		options.data.push(receivedObjects[0]); 
		options.data.push(receivedObjects[1]); 
		// this.chart.render();
		++counter;
		console.log(counter);
		
		this.addStock.value = "";
		setTimeout(() => {
			this.rerenderOnUpd();
		}, 800);
		setTimeout(() => {
			this.rerenderOnUpd();
		}, 1800);
		setTimeout(() => {
			this.rerenderOnUpd();
		}, 2500) 
	  }
	//   reading api on start
	
	//   fetchStock() {
	// 	const pointerToThis = this;
	// 	// console.log(pointerToThis);
	// 	const API_KEY = '740WRQPFQK10PTAG';
	// 	let StockSymbol = 'INX';
	// 	let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${StockSymbol}&apikey=${API_KEY}`;
	// 	// initial graph data
	// 	let stockChartXValuesFunction = [];
	// 	let stockChartYValuesFunction = [];
	// 	let percentChartXValuesFunction = [];
	// 	let percentChartYValuesFunction = [];
	
	// 	fetch(API_Call)
	// 	  .then(
	// 		function(response) {
	// 		  return response.json();
	// 		}
	// 	  ) /* actually fetching data */
	// 	  .then(
	// 		function(data) {					
	// 		  for (var key in data['Monthly Adjusted Time Series']) {
	// 			stockChartXValuesFunction.push(key);
	// 			stockChartYValuesFunction.push(Math.floor(Number(data['Monthly Adjusted Time Series'][key]['5. adjusted close'])));
				
	// 		}
	// 		// pushing them in the state
			
	// 		  pointerToThis.setState({
	// 			stockChartXValues: stockChartXValuesFunction,
	// 			stockChartYValues: stockChartYValuesFunction
	// 			//  /\state.............../\value from the function above
	// 		  })
	// 		//   console.log(pointerToThis.state);
			  
	// 		}
	// 	  )
	//   }
	// // iterates over the function above and pushes values one by one to a new var and returns it
	// Stock1(param) {
	// 	let y = [];
	// 	for (let i = 0;  i < this.state.stockChartXValues.length; i++) {
	// 		y.push({y: this.state.stockChartYValues[i], label: this.state.stockChartXValues[i]})}
	// 	return y
	// // iterates over state and one by one pushing stock to Y on command. then called from render to chart the line
	// }
	// Percents1(param) {
	// 	let p = [];
	// 	for (let i = 0;  i < this.state.percentChartXValuesFunction.length; i++) {
	// 		p.push({y: (this.state.percentChartYValuesFunction[i]/
	// 										 this.state.percentChartYValuesFunction[this.state.percentChartYValuesFunction.length - 1] *100 ),
	// 										 label: this.state.percentChartXValuesFunction[i]})}  
	// 	return p
	// // iterates over state and one by one pushing stock to Y on command. then called from render to chart the line
	// }

	rerenderOnUpd() {
		this.chart.render()}

	handleSearch(event){
		searchTearm = event.target.value.toUpperCase()}
	// assigns to searchTerm whatever is in typed in the input field

	enterPressed(event) {
		var code = event.keyCode || event.which;
		if(code === 13) { //13 is the enter keycode
			this.pushData()
		} 
	}

	 pushData(){
		 const receivedObjects = Stock.fetchStock(searchTearm)		 
		 // calling fetchStock from imported "userinput" file
		options.data.push(receivedObjects[0]); 
		options.data.push(receivedObjects[1]); 
		// this.chart.render();
		++counter;
		console.log(counter);
		
		this.addStock.value = "";
		setTimeout(() => {
			this.rerenderOnUpd();
		}, 800);
		setTimeout(() => {
			this.rerenderOnUpd();
		}, 1800);
		setTimeout(() => {
			this.rerenderOnUpd();
		}, 2500) 
		// rerendering chart to ensure that if stock takes a lot of time to render it will appear		
	}

	testlog(){
		console.log(Stock.fetchStock('INX'));
	}

	render() {
		// initial charts below
			options = {
				backgroundColor: '#f2f1f0',
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
				axisY2: {
					title: "Percent",
					suffix: "%",
					lineColor: "#C0504E",
					tickColor: "#C0504E",
					labelFontColor: "#C0504E"
				},
				toolTip: {
					shared: true
				},
				
				data: [
					// {
					// 	type: "line",
					// 	name: 'INX',
					// 	xValueFormatString: "MMM YYYY",
					// 	showInLegend: true,
					// 	dataPoints: this.Stock1()
					// },
					// {
					// 	type: "splineArea",
					// 	showInLegend: true,
					// 	axisYType: "secondary",
					// 	suffix: "%",
					// 	name: '',
					// 	dataPoints: this.Percents1()
					// }
				]}

				
		return (
			<div /* style={thestyles} */>
			<h1>React Multiseries Chart</h1>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}		/>
			{/* You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods */}
			<div className="field"><div className="field-box"/><div className="field-box"/></div>
			<div className="input-box">
				<div className="input-block">
					<div className="group">
						<input type="text" id="name" 
							   ref={el => this.addStock = el} 
							   required="required" 
							   onChange={this.handleSearch}
							   onKeyPress={this.enterPressed.bind(this)}
						 />
						<label htmlFor="name">Stock symbol</label>
						<div className="bar"></div>
					</div>
				</div>
				<div className="input-block">
					<div className="btn-bg bg-2">
							<div className="btn btn-2">
								<button onClick={this.pushData}>Add stock</button>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		);
	}
}

export  {MultiseriesChart, counter};
import React, { Component } from 'react';
import './styles.css';
import CanvasJSReact from '../assets/canvasjs.react';
import Stock from "./userInputFunction/userInputFunction";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

let options;
let searchTearm;
let counter = 0;
let isVisible = false;


class MultiseriesChart extends Component {	
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		}			
		this.pushData=this.pushData.bind(this);
		this.handleSearch=this.handleSearch.bind(this)	
		this.toggleVisibility=this.toggleVisibility.bind(this)	
		this.testlog=this.testlog.bind(this)	
	  }
	
	  componentDidMount() {
		//   on startup calling userinput
		const receivedObjects = Stock.fetchStock('INX')		 
		options.data.push(receivedObjects[0]); 
		options.data.push(receivedObjects[1]); 
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

	rerenderOnUpd() {
		this.chart.render()
	}

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
		}, 3500) 
		// rerendering chart to ensure that if stock takes a lot of time to render it will appear		
	}

	toggleVisibility(){
		for (let objNum in options.data) {
			if (objNum % 2 === 1) {
			options.data[objNum]["visible"] = !isVisible
			console.log(isVisible);
			}
		}
		this.rerenderOnUpd();
		isVisible = !isVisible
	}

	testlog(){
		for (const key in options.data) {
			if (options.data.hasOwnProperty(key)) {
				const element = options.data[key];
				console.log(element);
				
			}
		}		
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
				
				data: [	]}

				
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
			<div className="togglePercent">
				<p className="toggleText">Display percentage growth:</p>
				<div className="switch_box box_1">
					<input type="checkbox" className="switch_1" onClick={this.toggleVisibility} />
				</div>
			</div>
			{/* <div className='card-list'>
              {props.monsters.map(monster => (
				  <div className='card-container '>
					  <img src={`https://robohash.org/${props.monster.id}?set=set2&size=180x180`} alt="monster" />
					  <h2> {props.monster.name}</h2>
					  <p>{props.monster.email}</p>
				  </div>
                ))}    
            </div> */}

			</div>
		);
	}
}

export  {MultiseriesChart, counter};
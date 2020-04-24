import React, { Component } from 'react';
import './styles.css';
import CanvasJSReact from '../assets/canvasjs.react';
import Stock from "./userInputFunction/userInputFunction";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

let options;
let searchTearm;
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
				<div className="hint">
			<span>Click here to download report
			<svg xmlns="http://www.w3.org/2000/svg" id="arrow" width="75" height="20"><g fill="none" stroke="#101f54" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"><path d="M2.347 9.986c9.493-.062 19.22 1.688 28.654.271 2.884-.434 9.69-1.479 10.938-4.862 1.027-2.788-1.396-3.576-3.87-3.362-2.499.217-6.745 2.109-6.838 5.112-.122 3.962 5.874 4.825 8.68 5.199 9.058 1.206 18.126-1.019 27.186-.983"/><path d="M63.172 18c2.325-3.721 6.603-4.349 9.481-7.403-3.027-1.045-9.07-3.442-11.113-6.125"/></g></svg>			
			</span>	
			</div>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}		/>
			{/* You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods */}
			<div className="field"><div className="field-box"/><div className="field-box"/></div>
			<p className="zoomHint">Select an area to zoom in <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M13 24v-13.333l10 8.333h-6.156l-3.844 5zm8-20h2v-4h-4v2h2v2zm0 6h2v-4h-2v4zm-4-10h-4v2h4v-2zm4 14.73l2 1.645v-4.375h-2v2.73zm-10-14.73h-4v2h4v-2zm0 20h-4v2h4v-2zm-10-16h2v-2h2v-2h-4v4zm2 2h-2v4h2v-4zm0 6h-2v4h2v-4zm0 6h-2v4h4v-2h-2v-2z"/></svg></p>
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
			<footer>
				<p className="name">Made by Mykhailo Iliev</p>
				<p>Get in contact:</p>
				<address>
					<span className="email">Email: <a href="mailto: ilievmyk@gmail.com">ilievmyk@gmail.com</a></span> 
					<span>LinkedIn: <a href="https://www.linkedin.com/in/ilievm/">                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Mykhailo Iliev LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> Mykhailo Iliev</a></span>
				</address>
			</footer>
			</div>
		);
	}
}

export default MultiseriesChart;
import React, { Component } from 'react';
import MultiseriesChart from './views/Multiseries Chart';
import TheRest from './views/TheRest';


let contStyles = {
    backgroundColor: 'red',
    width: '70vw',
    margin: '0 auto'
}

let searchQuerry;

class App extends Component {
  constructor(props) {
    super(props);
  }
  

  
  render() {    
    return (
      <div className="mainDIv">
        <div className="container" style={contStyles}>
          <MultiseriesChart/>
        </div>
        <TheRest />
      </div>
    );
  }
}

export default App;

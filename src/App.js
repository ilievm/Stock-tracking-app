import React, { Component } from 'react';
import MultiseriesChart from './views/Multiseries Chart';
import TheRest from './views/TheRest';


let contStyles = {
    width: '95vw',
    margin: '0 auto'
}

class App extends Component {  
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

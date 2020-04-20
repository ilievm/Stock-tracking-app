// mb define apikey

const Stock = {
            fetchStock(name) {
                let stockObject={
                    type: "line",
                    xValueFormatString: "MMM YYYY",
                    showInLegend: true,
                    name: '',
                    dataPoints: []
                };
                const pointerToThis = this;
                // console.log(pointerToThis);
                const API_KEY = '740WRQPFQK10PTAG';
                let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${name}&apikey=${API_KEY}`;
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
                    stockObject.name = data['Meta Data']["2. Symbol"] ;
                    for (var key in data['Monthly Adjusted Time Series']) {
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(Math.floor(Number(data['Monthly Adjusted Time Series'][key]['5. adjusted close'])));
                        
                    }
                            // pushing them in the state
                    for (let i = 0;  i <= stockChartXValuesFunction.length; i++) {
                        stockObject.dataPoints.push({y: stockChartYValuesFunction[i], label: stockChartXValuesFunction[i]})}     
                    }
                    
                  )
                  
                  return stockObject
              }        
}

export default Stock
// mb define apikey
// second API key = 'HGJWFG4N8AQ66ICD'
import {counter} from '../Multiseries Chart'

const Stock = {
            fetchStock(name) {
                let stockObject={
                    type: "line",
                    xValueFormatString: "MMM YYYY",
                    prefix: "$",
                    showInLegend: true,
                    name: '',
                    dataPoints: []
                };

                let growthObject={
                    type: "splineArea",
                    showInLegend: true,
                    axisYType: "secondary",
                    suffix: "%",
                    visible : false,
                    name: '',
                    dataPoints: []
                };
                
                
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
                        console.log();
                        
                     stockObject.name = data['Meta Data']["2. Symbol"] ;
                    growthObject.name = data['Meta Data']["2. Symbol"] + '%' ;
                    for (var key in data['Monthly Adjusted Time Series']) {
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(parseInt(data['Monthly Adjusted Time Series'][key]['5. adjusted close']));
                        
                    }
                            // pushing them in the object
                    for (let i = 0;  i < stockChartXValuesFunction.length; i++) {
                        stockObject.dataPoints.push({y: stockChartYValuesFunction[i], label: stockChartXValuesFunction[i]})}     
                    // ================================

                    for (let i = 0;  i < stockChartXValuesFunction.length; i++) {
                        growthObject.dataPoints.push({y: (stockChartYValuesFunction[i]/
                                                         stockChartYValuesFunction[stockChartYValuesFunction.length - 1] *100 ),
                                                         label: stockChartXValuesFunction[i]})}  
                    
                    }
                  )
                  
                  return [stockObject, growthObject]
              }        
}

export default Stock
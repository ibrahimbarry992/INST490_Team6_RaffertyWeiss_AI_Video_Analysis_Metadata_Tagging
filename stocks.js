document.addEventListener('DOMContentLoaded', () => {
    const stockForm = document.getElementById('stock-form');
    const stockChart = document.getElementById('stock-chart').getContext('2d');
    const topStocksTable = document.getElementById('top-stocks');
    const turnOnButton = document.getElementById('audio-on');
    const turnOffButton = document.getElementById('audio-off');
    let chart;

    
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const targetUrl = 'https://tradestie.com/api/v1/apps/reddit?date=2022-04-03';

    
    fetchTopStocks();

   
    stockForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const ticker = document.getElementById('stock-ticker').value.toUpperCase();
        const days = document.getElementById('stock-days').value;

       
        await fetchStockData(ticker, days);
    });

    
    async function fetchTopStocks() {
        try {
            const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
            const data = await response.json();
            const parsedData = JSON.parse(data.contents);
    
            console.log('Parsed Data:', parsedData); 
    
            
            topStocksTable.innerHTML = '';
    
            
            parsedData.slice(0, 5).forEach(stock => {
                const commentCount = stock.no_of_comments || 'N/A';
                const sentiment = stock.sentiment || 'Neutral';
                const ticker = stock.ticker || 'Unknown';
    
                
                let sentimentIcon = 'neutral.png'; 
                if (sentiment === 'Bullish') {
                    sentimentIcon = 'bullish.png';
                } else if (sentiment === 'Bearish') {
                    sentimentIcon = 'bearish.webp';
                }
    
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><a href="https://finance.yahoo.com/quote/${ticker}" target="_blank">${ticker}</a></td>
                    <td>${commentCount}</td>
                    <td>
                        <img class="sentiment-icon" src="images/${sentimentIcon}" alt="${sentiment}">
                    </td>
                `;
                topStocksTable.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching top stocks:', error);
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="3">Failed to load top stocks. Please try again later.</td>`;
            topStocksTable.appendChild(row);
        }
    }

    async function fetchStockData(ticker, days) {
        try {
            const apiKey = 'gGxYeaaoNpHj1Agu0Ra_RDgH_huda1Zh'; 
            const to = new Date().toISOString().split('T')[0];
            const from = new Date(new Date().setDate(new Date().getDate() - days)).toISOString().split('T')[0];

            const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&apiKey=${apiKey}`);
            const data = await response.json();
            console.log('API Response:', data); 

            if (data.results && data.results.length > 0) {
                const labels = data.results.map(result => new Date(result.t).toLocaleDateString());
                const prices = data.results.map(result => result.c);
                plotBarChart(labels, prices, ticker);
            } else {
                alert('No data available for the specified ticker.');
            }
        } catch (error) {
            console.error('Error fetching stock data:', error);
            alert('Failed to fetch stock data. Please try again later.');
        }
    }

   
    function plotBarChart(labels, data, ticker) {
        if (chart) {
            chart.destroy();
        }
        chart = new Chart(stockChart, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: `Closing Prices for ${ticker}`,
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'top' }
                },
                scales: {
                    x: { title: { display: true, text: 'Date' } },
                    y: { title: { display: true, text: 'Price (USD)' } }
                }
            }
        });
    }


    if (annyang) {
        console.log('Voice recognition is available.');

        
        const commands = {
            'look up stock *ticker': (ticker) => {
                console.log(`Looking up stock: ${ticker}`);
                fetchStockData(ticker.toUpperCase(), 30); // Default to 30 days
            },
            'navigate to *page': (page) => {
                if (page.toLowerCase() === 'home') {
                    window.location.href = 'assignment2_homepage.html';
                } else if (page.toLowerCase() === 'dogs') {
                    window.location.href = 'assignment2_dogs.html';
                } else {
                    alert(`Sorry, I can't navigate to "${page}".`);
                }
            },
            'change the color to *color': (color) => {
                document.body.style.backgroundColor = color;
                alert(`Changed the background color to ${color}`);
            },
            'hello': () => {
                alert('Hello! How can I help you?');
            }
        };

        
        annyang.addCommands(commands);

        
        turnOnButton.addEventListener('click', () => {
            annyang.start();
            alert('Microphone is ON. Start speaking commands.');
        });

        
        turnOffButton.addEventListener('click', () => {
            annyang.abort();
            alert('Microphone is OFF.');
        });

        console.log('Voice recognition started. Try saying:');
        console.log('- "Look up stock Tesla"');
        console.log('Voice recognition started. Try saying:');
        console.log('- "Navigate to stocks"');
        console.log('- "Change the color to blue"');
        console.log('- "Hello"');
    } else {
        console.error('Voice recognition is not supported in this browser.');
        turnOnButton.disabled = true;
        turnOffButton.disabled = true;
    }

    
    stockForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const ticker = document.getElementById('stock-ticker').value.toUpperCase();
        const days = document.getElementById('stock-days').value;

        await fetchStockData(ticker, days);
    });
});
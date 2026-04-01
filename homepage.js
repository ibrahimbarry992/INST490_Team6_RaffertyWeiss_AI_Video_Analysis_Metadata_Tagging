document.addEventListener('DOMContentLoaded', () => {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');
    const turnOnButton = document.getElementById('audio-on');
    const turnOffButton = document.getElementById('audio-off');

    if (!quoteElement || !authorElement) {
        console.error('Required elements with IDs "quote" and "author" are missing in the DOM.');
        return;
    }

    fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/random'))
        .then(response => response.json())
        .then(data => {
            const json = JSON.parse(data.contents); 
            quoteElement.textContent = `"${json[0].q}"`;
            authorElement.textContent = `- ${json[0].a}`;
        })
        .catch(error => {
            console.error('Error fetching quote:', error);
            quoteElement.textContent = 'Failed to fetch quote. Please try again later.';
        });
});

if (annyang) {
    console.log('Voice recognition is available.');

    
    const commands = {
        'navigate to *page': (page) => {
            console.log(`Voice command: Navigate to ${page}`);
            if (page.toLowerCase() === 'stocks') {
                window.location.href = 'assignment2_stocks.html';
            } else if (page.toLowerCase() === 'dogs') {
                window.location.href = 'assignment2_dogs.html';
            } else {
                alert('Page not found. Try saying "navigate to stocks" or "navigate to dogs".');
            }
        },
        'change the color to *color': (color) => {
            console.log(`Voice command: Change the color to ${color}`);
            document.body.style.backgroundColor = color;
        },
        'hello': () => {
            alert('Hello back to you!');
        }
    };

    
    annyang.addCommands(commands);

    
    document.getElementById('audio-on').addEventListener('click', () => {
        annyang.start(); 
        alert('Microphone is ON. Start speaking commands.');
        console.log('Voice recognition turned ON.');
    });

    document.getElementById('audio-off').addEventListener('click', () => {
        annyang.abort(); 
        alert('Microphone is OFF.');
        console.log('Voice recognition turned OFF.');
    });

    console.log('Voice recognition is ready. Use the buttons to toggle microphone.');
} else {
    console.error('Voice recognition is not supported in this browser.');
    document.getElementById('audio-on').disabled = true;
    document.getElementById('audio-off').disabled = true;
};


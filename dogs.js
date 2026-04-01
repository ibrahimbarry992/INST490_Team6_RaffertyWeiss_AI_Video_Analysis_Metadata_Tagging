document.addEventListener('DOMContentLoaded', () => {
    const dogImage = document.getElementById('dogImage');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const breedButtonsContainer = document.querySelector('.breed-buttons');
    const breedInfo = document.getElementById('breedInfo');
    const turnOnButton = document.getElementById('audio-on');
    const turnOffButton = document.getElementById('audio-off');
    let dogImages = [];
    let currentIndex = 0;


    const breedNameMap = {
        'shih tzu': 'shihtzu',
        'bichon frise': 'bichonfrise',
        'bull terrier': 'bullterrier',
        'st bernard': 'stbernard',
        'american bulldog': 'americanbulldog',
        'golden retriever': 'goldenretriever',
        'cavalier king charles spaniel': 'cavalierkingcharlesspaniel',
    };

   
    async function fetchRandomDogs() {
        try {
            for (let i = 0; i < 5; i++) {
                const response = await fetch('https://dog.ceo/api/breeds/image/random');
                const data = await response.json();
                dogImages.push(data.message);
            }
            currentIndex = 0; 
            displayDogImage();
        } catch (error) {
            console.error('Error fetching random dogs:', error);
            alert('Failed to load random dog breeds. Please try again.');
        }
    }

  
    function displayDogImage() {
        dogImage.src = dogImages[currentIndex];
    }

    
    async function fetchDogBreeds() {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/list/all');
            const data = await response.json();
            const breeds = Object.keys(data.message);

            breeds.slice(0, 10).forEach(breed => {
                const button = document.createElement('button');
                button.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
                button.addEventListener('click', () => fetchBreedDetails(breed));
                breedButtonsContainer.appendChild(button);
            });
        } catch (error) {
            console.error('Error fetching dog breeds:', error);
        }
    }

    
    async function fetchBreedDetails(breed) {
        try {
            const normalizedBreed = breed.toLowerCase();
            const breedSlug = breedNameMap[normalizedBreed]
                ? breedNameMap[normalizedBreed]
                : normalizedBreed.replace(/ /g, '-'); 

            console.log(`Fetching details for breed: ${breedSlug}`);

            const response = await fetch(`https://dog.ceo/api/breed/${breedSlug}/images/random`);
            if (!response.ok) {
                throw new Error(`Breed "${breed}" not found`);
            }

            const data = await response.json();
            dogImages = [data.message];
            currentIndex = 0;
            displayDogImage();

            const breedDetails = getMockBreedDetails(breed);
            breedInfo.innerHTML = `
                <h3>Name: ${breedDetails.name}</h3>
                <p>Description: ${breedDetails.description}</p>
                <p>Min Life: ${breedDetails.minLife} years</p>
                <p>Max Life: ${breedDetails.maxLife} years</p>
            `;
        } catch (error) {
            console.error(`Error fetching breed details for "${breed}":`, error);
            alert(`Sorry, no data available for the breed "${breed}".`);
        }
    }

    
    function getMockBreedDetails(breed) {
        const mockDetails = {
            name: breed.charAt(0).toUpperCase() + breed.slice(1),
            description: `The ${breed} is a popular dog breed known for its friendly and loyal nature. They are excellent companions and highly trainable.`,
            minLife: Math.floor(Math.random() * 5) + 8, // Random life expectancy between 8 and 12 years
            maxLife: Math.floor(Math.random() * 5) + 13, // Random life expectancy between 13 and 17 years
        };
        return mockDetails;
    }

    
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            displayDogImage();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < dogImages.length - 1) {
            currentIndex++;
            displayDogImage();
        }
    });

    // Initialize the page
    fetchRandomDogs();
    fetchDogBreeds();

    if (annyang) {
        console.log('Voice recognition is available.');
    
        
        const commands = {
            'load dog breed': () => {
                console.log('Voice command: Load Dog Breed');
                fetchRandomDogs(); 
            },
            'search for dog breed *breed': (breed) => {
                console.log(`Voice command: Search for Dog Breed - ${breed}`);
                fetchBreedDetails(breed);
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
    
        
    
    
        annyang.start();
        console.log('Voice recognition is active. Try saying:');
        console.log('- "Search for Dog Breed Labrador"');
        console.log('Voice recognition started. Try saying:');
        console.log('- "Change the color to blue"');
        console.log('- "Hello"');
    }else {
        console.error('Voice recognition is not supported in this browser.');
        turnOnButton.disabled = true;
        turnOffButton.disabled = true;
    }
});
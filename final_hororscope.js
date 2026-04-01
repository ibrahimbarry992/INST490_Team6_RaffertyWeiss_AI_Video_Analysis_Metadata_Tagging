document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, ready for user input.');
  

  
  document.getElementById('submitBtn').addEventListener('click', async () => {
    console.log('Submit button clicked');
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    console.log('Day:', day, 'Month:', month, 'Year:', year);

    // Validate input
    if (!day || !month || !year) {
      console.log('Invalid input detected');
      alert('Please enter a valid day, month, and year!');
      return;
    }

    console.log('Valid input, proceeding with API calls...');

    // Format date for NASA API (YYYY-MM-DD)
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    // Determine Zodiac sign based on birthday
    const zodiacSign = getZodiacSign(parseInt(day), parseInt(month));

    try {
      // Fetch horoscope
      const horoscopeData = await fetchHoroscope(zodiacSign);
      console.log('Horoscope:', horoscopeData);

      // Fetch NASA APOD
      const apodData = await fetchNasaAPOD(formattedDate);
      console.log('NASA APOD:', apodData);

      // Update UI with results
      updateUI(zodiacSign, horoscopeData, apodData);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred while fetching data. Please try again.');
    }
  });
});


function getZodiacSign(day, month) {
  const signs = [
    ['Capricorn', 19], 
    ['Aquarius', 18],  
    ['Pisces', 20],    
    ['Aries', 19],     
    ['Taurus', 20],    
    ['Gemini', 20],    
    ['Cancer', 22],    
    ['Leo', 22],       
    ['Virgo', 22],     
    ['Libra', 22],     
    ['Scorpio', 21],   
    ['Sagittarius', 21] 
  ];

  // Handle December after the 21st correctly
  if (month === 12 && day > signs[month - 1][1]) {
    return signs[0][0]; // Capricorn for December 22 onward
  }

  // Default case for other months
  return day > signs[month - 1][1] ? signs[month][0] : signs[month - 1][0];
}

// Function to fetch horoscope
async function fetchHoroscope(sign, day = "TODAY") {
  const endpoint = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=${day}`;

  const response = await fetch(endpoint) 

  return response.json();
 /* .then((resp) => resp.json())
  .then((data) => {

    return resp.json();

  })
*/
 /*try {
    const response = await fetch(endpoint);
    
    // Log raw response for debugging
    console.log(await response.text()); 

    // Check for valid JSON response
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid response format: Expected JSON");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Horoscope Data:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch horoscope:", error);
    return null;
  }
  */
}

// Function to fetch NASA APOD
async function fetchNasaAPOD(date) {
  const apiKey = 'wKeq374VeUXqgnK3BfoCivpRywZVdLy2VmjDcpUI'; 
  const earliestDate = '1995-06-16'; // NASA's first APOD image
  const endpointBase = 'https://api.nasa.gov/planetary/apod';

  // Ensure the date is not earlier than the earliest allowed date
  if (new Date(date) < new Date(earliestDate)) {
    alert(`The NASA APOD API only supports dates from ${earliestDate}. Using ${earliestDate} instead.`);
    date = earliestDate;
  }

  const endpoint = `${endpointBase}?api_key=${apiKey}&date=${date}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log('NASA APOD Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching NASA APOD data:', error);
    alert('Failed to fetch NASA APOD data. Please try again later.');
    throw error;
  }
}

// Function to update UI with fetched data
function updateUI(sign, horoscopeData, apodData) {
  document.getElementById("zodiacSign").innerText = `Your Zodiac Sign: ${sign}`;

  // Handle missing or invalid horoscope data
  if (horoscopeData && horoscopeData.data) {
    document.getElementById("horoscope").innerText = horoscopeData.data.horoscope_data;
  } else {
    document.getElementById("horoscope").innerText = "Horoscope data is unavailable.";
  }

  // Handle missing or invalid APOD data
  if (apodData && apodData.title && apodData.url && apodData.explanation) {
    document.getElementById("apodTitle").innerText = apodData.title;
    document.getElementById("apodImage").src = apodData.url;
    document.getElementById("apodDescription").innerText = apodData.explanation;
  } else {
    document.getElementById("apodTitle").innerText = "NASA APOD data is unavailable.";
    document.getElementById("apodImage").src = "";
    document.getElementById("apodDescription").innerText = "";
  }

  document.getElementById("results").style.display = "block";
}
async function saveHoroscopeReading(zodiacSign, reading) {
  const { data, error } = await supabase
    .from('horoscope_readings')
    .insert([
      { zodiac_sign: zodiacSign, reading: reading },
    ]);

  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log('Data inserted successfully:', data);
  }
}
async function getHoroscopeReadings(zodiacSign) {
  const { data, error } = await supabase
    .from('horoscope_readings')
    .select('*')
    .eq('zodiac_sign', zodiacSign)
    .order('created_at', { ascending: false }); // Most recent first

  if (error) {
    console.error('Error fetching data:', error);
    return [];
  } else {
    console.log('Horoscope readings:', data);
    return data;
  }
}


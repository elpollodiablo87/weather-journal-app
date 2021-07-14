/* Global Variables */

const apiKey = 'a055dfbf06ba783119b20ef52f8bf6fb';

//Grabbing the ui elements
const generate = document.getElementById('generate');
const date = document.getElementById('date');
const tempElement = document.getElementById('temp');
const content = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

//click event listener for the generate button
generate.addEventListener('click', async (e)=> {
    //grabbing the values for zip code and content area, dynamically
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    //Fetching the weather data from the API
	const returnedData = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`)).json();
    const temp = returnedData.main.temp;
    //post request
    const postData = async function (url = '/postData', data = {date: newDate, temp, feelings}) {
    const response = await fetch(url, {
      method: 'POST', 
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
  }()
  //Getting the final result
    const serverData = await fetch('/get', {
        credentials: 'same-origin'
    });
    const jsonServerData = await serverData.json();

    //Updating the UI
    date.innerHTML = jsonServerData.date;
        tempElement.innerHTML = jsonServerData.temperature;
        content.innerHTML = jsonServerData.feelings;
}
)



/* Global Variables */
const btn = document.querySelector('#generate'),
      // output variables
      dateOutput = document.getElementById('date'),
      tempOutput = document.getElementById('temp'),
      contentOutput = document.getElementById('content'),
      // api
      apiKey = '2bf2822a0e545bd5ad0e1d8199df6ba4', 
      apiURL = 'http://api.openweathermap.org/data/2.5/weather',
      // icons variable
      label = document.querySelectorAll('#entryHolder label');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'-'+ d.getDate()+'-'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
btn.addEventListener("click", myFunc);
function myFunc(e) {
    // e.preventDefault();
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
        try {
            if (zipCode) {
                const url = `${apiURL}?zip=${zipCode}&appid=${apiKey}&units=metric`;
                getData(url)
                    .then(function(data = {})  {
                        postData('/addData', 
                        {
                            date: newDate,
                            temp: data.main.temp,
                            feelings: feelings
                        })
                        .then(updateUI());
                    });
            }
            else {
                alert("Enter a Valid zip code");
            }
        } catch (error) {
            console.log(`error: ${error}`)
        }
    
};

// Function to GET Web API Data
async function getData(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(`error: ${error}`)
    }
}

// Function to POST data
async function postData (url = '', data = {}) {
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    try {
        const data= await res.json();
        return data;
    } catch (error) {
        console.log(`error: ${error}`);
    }
}

// Update user interface
async function updateUI() {
    const req = await fetch('/all');
    try {
        const projectData = await req.json();
        dateOutput.innerHTML = `${projectData.date}`;
        tempOutput.innerHTML = `${projectData.temp}°C`;
        contentOutput.innerHTML = `${projectData.feelings}`;
    } catch (error) {
        console.log(`error: ${error}`);
    }
};



                            /* ---- Just more Styles ---- */
const calender = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-alt" class="svg-inline--fa fa-calendar-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path></svg>`,
    temp = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="thermometer-three-quarters" class="svg-inline--fa fa-thermometer-three-quarters fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M192 384c0 35.346-28.654 64-64 64-35.346 0-64-28.654-64-64 0-23.685 12.876-44.349 32-55.417V160c0-17.673 14.327-32 32-32s32 14.327 32 32v168.583c19.124 11.068 32 31.732 32 55.417zm32-84.653c19.912 22.563 32 52.194 32 84.653 0 70.696-57.303 128-128 128-.299 0-.609-.001-.909-.003C56.789 511.509-.357 453.636.002 383.333.166 351.135 12.225 321.755 32 299.347V96c0-53.019 42.981-96 96-96s96 42.981 96 96v203.347zM208 384c0-34.339-19.37-52.19-32-66.502V96c0-26.467-21.533-48-48-48S80 69.533 80 96v221.498c-12.732 14.428-31.825 32.1-31.999 66.08-.224 43.876 35.563 80.116 79.423 80.42L128 464c44.112 0 80-35.888 80-80z"></path></svg>`, 
    content = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sticky-note" class="svg-inline--fa fa-sticky-note fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M312 320h136V56c0-13.3-10.7-24-24-24H24C10.7 32 0 42.7 0 56v400c0 13.3 10.7 24 24 24h264V344c0-13.2 10.8-24 24-24zm129 55l-98 98c-4.5 4.5-10.6 7-17 7h-6V352h128v6.1c0 6.3-2.5 12.4-7 16.9z"></path></svg>`;

function addIcons() {
    label[0].innerHTML =  calender;
    label[1].innerHTML =  temp;
    label[2].innerHTML =  content;
}
addIcons();
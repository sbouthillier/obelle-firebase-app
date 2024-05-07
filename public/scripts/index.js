// convert epochtime to JavaScripte Date object
function epochToJsDate(epochTime){ 
    return new Date(epochTime);
}

// convert time to human-readable format YYYY/MM/DD HH:MM:SS
function epochToDateTime(epochTime){
    var epochDate = new Date(epochTime);
    var dateTime = epochDate.getFullYear() + "/" +
    ("00" + (epochDate.getMonth() + 1)).slice(-2) + "/" + ("00" + epochDate.getDate()).slice(-2) + " " +
    ("00" + epochDate.getHours()).slice(-2) + ":" +
    ("00" + epochDate.getMinutes()).slice(-2) + ":" + ("00" + epochDate.getSeconds()).slice(-2);
    return dateTime;
}

// function to plot values on charts
function plotValues(chart, timestamp, value){ 
    var x = epochToJsDate(timestamp).getTime(); 
    var y = Number (value);
    if(chart.series[0].data.length > 30) { 
        chart.series[0].addPoint([x, y], true, true, true);
    } else {
        chart.series[0].addPoint([x, y], true, false, true);
    } 
}

// DOM elements
const logoutNavElement = document.querySelector('#logout-link');
const loginNavElement = document.querySelector('#login-link');
const signedOutMessageElement = document.querySelector('#signedOutMessage');
const dashboardElement = document.querySelector("#dashboardSignedIn");
const userDetailsElement = document.querySelector('#user-details');

//Buttons
const loadDataButtonElement = document.getElementById('load-data');
const viewDataButtonElement = document.getElementById('view-data-button'); 
const hideDataButtonElement = document.getElementById('hide-data-button');

//DOM elements for sensor readings
const tempCardElement = document.getElementById('temperature');
const humCardElement = document.getElementById('humidity');
const lastUpdateElement = document.getElementById('last-update');
const tableContainerElement = document.querySelector('#table-container');


// MANAGE LOGIN/LOGOUT UI
const setupUI = (user) => {
  if (user) {
    //toggle UI elements
    dashboardElement.style.display = 'block';

    // get user UID to get data from database
    var uid = user.uid;
    console.log(uid);

    // Database paths (with user UID)
    var dbPathBmeTemp = '/sensors/air/temperature';
    var dbPathReadings = '/sensors/air';

    //////// SENSOR READINGS ////////
    //Reference to the parent node where the readings are saved
    var dbReadingsRef = firebase.database().ref(dbPathReadings);

    // Get the latest readings and display on cards
    dbReadingsRef.limitToLast(1).on('child_added', snapshot =>{
        var jsonData = snapshot.toJSON(); // example: {temperature: 25.02, timestamp:1641317355}
        console.log("here");
        console.log(jsonData);
        var temperature = jsonData.temperature;
        var timestamp = jsonData.timestamp;
        
        // Update DOM elements
        tempCardElement.innerHTML = temperature; 
        lastUpdateElement.innerHTML = epochToDateTime(timestamp);
    });

    // Render charts to display data
    chartT = createTemperatureChart();

    //Get the latest 30 readings to display on charts 
    dbReadingsRef.orderByKey().limitToLast(30).on('child_added', snapshot =>{
        var jsonData = snapshot.toJSON(); // example: {temperature: 25.02, humidity: 50.20, timestamp:1641317355}
        console.log(jsonData);
        // Save values on variables
        var temperature = jsonData.temperature;
        var timestamp = jsonData.timestamp;

        // Plot the values on charts 
        plotValues(chartT, timestamp, temperature);
    });

  // if user is logged out
  } else{
    // toggle UI elements
    logoutNavElement.style.display = 'none';
    loginNavElement.style.display = 'block';
    signedOutMessageElement.style.display ='block';
    dashboardElement.style.display = 'none';
    userDetailsElement.style.display ='none';
  }
}
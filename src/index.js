import Data from "./config.js";
import {searchBar,container,cityNameContainer,weekdays} from "./config.js";
import { children,addelem,removeel,ineer} from "./functions.js";
//////////////////////:

/////////////////

////////////////////
///fonctions globales
//////////////////////
//////////////////////

////////////////////////////////
///////////////////////////////////
//////////////////////////////////
searchBar.addEventListener('keyup', (event) => {
    if(event.key === "Enter") {
        const thisCity = event.currentTarget.value.toLowerCase();
        const apiUrl = "https://api.openweathermap.org/data/2.5/forecast/?q=" + thisCity + "&appid=" + Data.key;
        event.currentTarget.value = '';
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const lon = data.city.coord.lon;
                const lat = data.city.coord.lat;
                cityNameContainer.innerHTML = data.city.name;
                fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&exclude=minutely,hourly,alerts&appid=" + Data.key)
                    .then(response => response.json())
                    .then(result => {
                        console.log('Welcome to this basic weather app. this is not a product but the product of an academic exercise.')                        
                        removeel(container);
                        for(let i = 0; i < 5; i++) {
                            const date = new Date();
                            var dayOfTheWeek = weekdays[(date.getDay() + i) % 7];
                            const data = result.daily[i];

                            const card = document.createElement('div');
                            addelem(card,"card");
                            children(container,card);
                            
                            const imageBox = document.createElement('div');
                            addelem(imageBox,"imgBx");
                            children(card,imageBox);

                            const cardImg = document.createElement('img');
                            cardImg.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
                            children(imageBox,cardImg);

                            const contentBox = document.createElement("div");
                            addelem(contentBox,"contentBx");
                            children(card,contentBox);

                            const cardHeader = document.createElement("h2");
                            ineer(cardHeader,dayOfTheWeek)
                            children(contentBox,cardHeader);

                            const tempDescription = document.createElement("h4");
                            ineer(tempDescription,data.weather[0].description)
                            children(contentBox,tempDescription);

                            const currentTempBox = document.createElement("div");
                            addelem(currentTempBox,"color");
                            children(contentBox,currentTempBox);

                            const currentTempHeader = document.createElement("h3");
                            children(currentTempBox,currentTempHeader);

                            const currentTemp = document.createElement("span");
                            addelem(currentTemp,"current-temp");
                            ineer(currentTemp,data.temp.day + "°C")
                            children(currentTempBox,currentTemp);

                            const minMaxTemperatures = document.createElement("div");
                            addelem(minMaxTemperatures,"details");
                            children(contentBox,minMaxTemperatures);

                            const minMaxTempHeader = document.createElement("h3");
                            ineer(minMaxTempHeader,"More:")
                            children(minMaxTemperatures,minMaxTempHeader);

                            const minTemp = document.createElement("span");
                            addelem(minTemp,"min-temp");
                            ineer(minTemp,data.temp.min + "°C")
                            children(minMaxTemperatures,minTemp);

                            const maxTemp = document.createElement("span");
                            addelem(maxTemp,"max-temp");
                            ineer(maxTemp,data.temp.max + "°C")
                            children(minMaxTemperatures,maxTemp);
                        };
                    });
            })
            .catch((error) => {
                // If there are errors, send out an error message
                console.error('Error:', "not a place!");
                removeel(container);
                return alert("Are you sure you aren't holding your map upside down?");
            });
    };
});

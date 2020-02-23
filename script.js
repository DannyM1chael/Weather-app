window.addEventListener('load', () =>{
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let long = position.coords.longitude;
            let lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/9c46ab6b98e4118bc1ae7624afed5be2/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temperature, summary, icon } = data.currently;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    setIcons(icon, document.querySelector('.icon'));
                    let formula = (temperature - 32) * (5 / 9);

                    temperatureSection.addEventListener('click', ()=>{
                        if(temperatureSpan.textContent === 'F') {
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = Math.floor(formula);
                        } else{
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = temperature;
                        }
                    })
                })
        })
    }

    function setIcons(icon, iconId) {
        const skycons = new Skycons({ color:'white' });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }
});
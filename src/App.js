// This is the imp. file in React.

import React from "react";
// Title component
import Titles from "./components/Titles";
// Form
import Form from "./components/Form";
// Weather
import Weather from "./components/Weather";
// weather API from OpenWeatherMap 
const API_KEY = "5b588e2b530a249595b626ca65217522";

class App extends React.Component{
    // properties should be shown single page
    state = {
      temp: undefined,
      temp_max: undefined,
      temp_min: undefined,
      city: undefined,
      country: undefined,
      pressure: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
    }

    // API calling -- another way by constructor -- gitFetchUser
    getWeather = async(e) => {
      // after submitting the page is refreshed so to avoid that, preventDefault
      e.preventDefault();

      // Setting up city & country from form so that, it is variable.
      const city = e.target.elements.city.value;
      const country = e.target.elements.country.value;
                                                                        // Randomizing city & country
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);

      // Data to readable format -- to json
      const data = await api_call.json();
      
      if(city && country){
        console.log(data);
      // using the setState method -- To set the above state & obtain the values
        this.setState({
          temp: data.main.temp,
          temp_max: data.main.temp_max,
          temp_min: data.main.temp_min,
          city: data.name,
          country: data.sys.country,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: ""
      });
    
    } else { 
      this.setState({
        temp: undefined,
        temp_max: undefined,
        temp_min: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the city & country."
      });
    }
  };

  render(){
    return(
      /* [REACT+BABBEL] Following isnot actually a HTML, it is HTML+js = jsx so that, we require here babbel to compile it.
      And react accepts only one parent element, all of the elements are included into it. the elements out of it 
      shows error. here e.g., <div> is parent element.*/
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles/>
                </div>
                <div className="col-xs-7 form-container">
                  {/* props method is used so that the getWeather method can be used in form */}
                   <Form getWeather = {this.getWeather}/>

                    {/* using props method for showing weather comp. */}
                    <Weather 
                      temp = {this.state.temp}
                      temp_max = {this.state.temp_max}
                      temp_min = {this.state.temp_min}
                      city = {this.state.city}
                      country = {this.state.country}
                      pressure = {this.state.pressure}
                      humidity = {this.state.humidity}
                      description = {this.state.description}
                      error = {this.state.error}
                    />
                </div>  
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

// This allows other files to import "App"
export default App;



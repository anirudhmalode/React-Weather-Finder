import React from "react";

class Form extends React.Component{
    render(){
        return(
            // props method is used so that the getWeather method can be used in form
            <form onSubmit={this.props.getWeather}>
                <input type="text" name="city" placeholder="city..."/>
                <input type="text" name="country" placeholder="country..." />
                <button>Get Weather!</button>
            </form>
        )
    }
}

export default Form;
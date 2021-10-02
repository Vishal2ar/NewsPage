import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News  from './Components/News'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {
  pg = 12;
  state= {
    progress : 0
  }
setProgress = (progress) => {
this.setState({progress : progress})
}
 apiKey = process.env.REACT_APP_API_KEY;
 
  render() {

    return (
      <div>
        <Router>
        <Navbar />
        <LoadingBar   color='#f11946'  progress={this.state.progress} />
        {console.log(this.apiKey + "apikey")}
        <Switch>
          <Route exact path="/NewsPage"><News apiKey = {this.apiKey} setProgress={this.setProgress} key="general" pageSize={this.pg} country="in" category="general" /></Route>
           <Route exact path="/business"><News apiKey = {this.apiKey} setProgress={this.setProgress}  key="business" pageSize={this.pg} country="in" category="business" /></Route>
           <Route exact path="/entertainment"><News apiKey = {this.apiKey} setProgress={this.setProgress} key="entertainment" pageSize={this.pg}country="in" category="entertainment" /></Route>
           <Route exact path="/general"><News apiKey = {this.apiKey} setProgress={this.setProgress} key="general" pageSize={this.pg} country="in" category="general" /></Route>
           <Route exact path="/health"><News apiKey = {this.apiKey} setProgress={this.setProgress} key="health" pageSize={this.pg} country="in" category="health" /></Route>
           <Route exact path="/science"><News apiKey = {this.apiKey} setProgress={this.setProgress} key="science" pageSize={this.pg} country="in" category="science" /></Route>
           <Route exact path="/sports"><News apiKey = {this.apiKey} setProgress={this.setProgress} key="sports" pageSize={this.pg} country="in" category="sports" /></Route>
           <Route exact path="/technology"><News apiKey = {this.apiKey} setProgress={this.setProgress} key="technology" pageSize={this.pg} country="in" category="technology" /></Route>
       
        </Switch>
        </Router>
      </div>
    )
  }
}

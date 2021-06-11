import  React, {Component } from 'react'
import './App.css';
// import Postform from './Postform';
import Tawk from './Tawk';




class App extends Component{
  render(){
    const tawk=new Tawk();
    <tawk/>
      return(
          <div className="App">
            {/* <Postform/> */}
          </div>
      )
  }

}
export default App

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavCompoment from '../nav/NavCompoment';
class Ticket extends Component {
  constructor(props){
    super(props);

  }
  render(){
    return(
      <MuiThemeProvider>
        <div className="color-5-0">
          <NavCompoment info={this.props.info} />
          <div>Ticket</div>
        </div>
      </MuiThemeProvider>
    )
  }

}

export default Ticket;

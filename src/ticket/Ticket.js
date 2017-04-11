import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavCompoment from '../nav/NavCompoment';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Drawer from 'material-ui/Drawer';

class Ticket extends Component {
  constructor(props){
    super(props);

    this.state = {
      // state for tabel
       fixedHeader: true,
       fixedFooter: true,
       stripedRows: false,
       showRowHover: false,
       selectable: true,
       multiSelectable: false,
       enableSelectAll: false,
       deselectOnClickaway: true,
       showCheckboxes: true,

      //  state for drawer
        open: false,
        openSecondary:true,
        ticket:[]
     };

  }

  componentDidMount() {
    var formData = new FormData();
    formData.append('email', InfoGen.email);
    formData.append('token', InfoGen.token);
    formData.append('type_view','active');
    formData.append('status_view','active');
    formData.append('owner','myself');
    var that = this;
    get(Url.ticket, formData).then(function(res){
      console.log(res);
      that.setState({ticket:res.data});
    });
  }


  handleToggle = () => this.setState({open: !this.state.open});


  render(){
    var tableBody = [];

    this.state.ticket.forEach((item, i) => {
      tableBody.push(
        <TableRow key={i} selected={item.selected}  onTouchTap={this.handleToggle} >
          <TableRowColumn>{i}</TableRowColumn>
          <TableRowColumn>{item.subject}</TableRowColumn>
          <TableRowColumn>{item.urgency}</TableRowColumn>
        </TableRow>
      );
    });

    return(
      <MuiThemeProvider>
        <div>
              <NavCompoment info={this.props.info} />
              <div>
                <Drawer
                   docked={false} width={'50%'}
                   open={this.state.open}
                   openSecondary={this.state.openSecondary}
                   onRequestChange={(open) => this.setState({open})}
                 >
                 </Drawer>

                  <Table
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                  >
                        <TableHeader
                           displaySelectAll={this.state.showCheckboxes}
                           adjustForCheckbox={this.state.showCheckboxes}
                           enableSelectAll={this.state.enableSelectAll}
                         >
                             <TableRow>
                              <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                              <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                              <TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={this.state.showCheckboxes}
                            deselectOnClickaway={this.state.deselectOnClickaway}
                            showRowHover={this.state.showRowHover}
                            stripedRows={this.state.stripedRows}
                          >
                        {tableBody}
                        </TableBody>
                  </Table>
                </div>
        </div>
      </MuiThemeProvider>
    )
  }

}

export default Ticket;

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


const tableData = [
  {
    name: 'John Smith',
    status: 'Employed',
  },
  {
    name: 'Randal White',
    status: 'Unemployed',
  },
  {
    name: 'Stephanie Sanders',
    status: 'Employed',
  }
];

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
        openSecondary:true
     };

  }


  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});


  render(){
    return(
      <MuiThemeProvider>
        <div className="color-5-0">
          <NavCompoment info={this.props.info} />
          <div>Ticket</div>
            <Drawer
               docked={false}
               width={500}
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
              {tableData.map( (row, index) => (
                <TableRow key={index} selected={row.selected}  onTouchTap={this.handleToggle} >
                  <TableRowColumn>{index}</TableRowColumn>
                  <TableRowColumn>{row.name}</TableRowColumn>
                  <TableRowColumn>{row.status}</TableRowColumn>
                </TableRow>
                ))}
            </TableBody>
          </Table>

        </div>
      </MuiThemeProvider>
    )
  }

}

export default Ticket;

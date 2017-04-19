// view for Approve Taxi and OT Request
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

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  }
};

class ApproveService extends Component {
  constructor(props){
    super(props);

    this.state = {
      // state for tabel
       fixedHeader: true,
       fixedFooter: true,
       stripedRows: false,
       showRowHover: false,
       selectable: false,
       multiSelectable: false,
       enableSelectAll: false,
       deselectOnClickaway: true,
       showCheckboxes: false,

      //  state for drawer
        open: false,
        openSecondary:true,
        requestTaxi:[],
      //state for select dropdown
        values: [],
        valueOwner:1,
        valueStatus:1

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
    get(Url.taxiService, formData).then(function(res){
      console.log(res);
      that.setState({requestTaxi:res.data});
    });
  }

  // handle for Drawer
  handleToggle = () => this.setState({open: !this.state.open});

// handle for selected
  handleChange = (event, index, values) => this.setState({values});
  handleOwnerChange = (event, index, valueOwner) => this.setState({valueOwner});
  handleStatusChange = (event, index, valueStatus) => this.setState({valueStatus});
  menuItems = (values) => {
    return this.state.caseType.map((item,i) => (
      <MenuItem
        key={i}
        insetChildren={true}
        checked={values && values.includes(item.name)}
        value={item.name}
        primaryText={item.name}
      />
    ));
  }

  render(){
    const {values, valuesOwner} = this.state;
    var tableBody = [];
    this.state.requestTaxi.forEach((item, i) => {
      tableBody.push(
        <TableRow key={i} selected={item.selected}  onTouchTap={this.handleToggle} >
          <TableRowColumn style={{'width':'10%'}}>{item.no_task}</TableRowColumn>
          <TableRowColumn style={{'width':'30%'}}>{item.subject_service_report}</TableRowColumn>
          <TableRowColumn style={{'width':'30%'}}>{item.end_user_site}</TableRowColumn>
          <TableHeaderColumn style={{'width':'10%'}}>{item.overtime_expect}</TableHeaderColumn>
          <TableRowColumn style={{'width':'10%'}}>{item.taxi_fare_total}</TableRowColumn>
          <TableRowColumn style={{'width':'10%'}}>Pending</TableRowColumn>
        </TableRow>
      );
    });

    return(
      <MuiThemeProvider>
        <div>
              <NavCompoment info={this.props.info} />
              <div>
                <DatePicker
                  hintText="Search bt Date"
                  style={{'marginLeft':'3%'}}
                  autoOk={true}/>
                <Drawer
                   docked={false} width={'50%'}
                   open={this.state.open}
                   openSecondary={this.state.openSecondary}
                   onRequestChange={(open) => this.setState({open})}
                 >
                 </Drawer>
                 <Card style={styles.root}>
                   <CardText>
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
                                  <TableHeaderColumn style={{'width':'10%'}}>No</TableHeaderColumn>
                                  <TableHeaderColumn style={{'width':'30%'}} >Subject</TableHeaderColumn>
                                  <TableHeaderColumn style={{'width':'30%'}}>End User</TableHeaderColumn>
                                  <TableHeaderColumn style={{'width':'10%'}} >OT Request (Hours)</TableHeaderColumn>
                                  <TableHeaderColumn style={{'width':'10%'}} >Taxi Fare(BAHT)</TableHeaderColumn>
                                  <TableHeaderColumn style={{'width':'10%'}}>Status</TableHeaderColumn>
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
                    </CardText>
                  </Card>
                </div>
        </div>
      </MuiThemeProvider>
    )
  }

}

export default ApproveService;

/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  UncontrolledDropdown
} from "reactstrap";
// core components
import Header from "../components/Headers/Header.js";
import config from "../config/config";
import {withRouter} from "react-router";
import {isAuthorisedUserLoggedIn, makeApiCall} from "../utils/utils";
import classnames from "classnames";
import moment from "moment";
import Popup from "reactjs-popup";
import AssignVolunteerForm from "../components/Forms/AssignVolunteerForm";
import SeniorCitizenRegistration from "../components/Forms/SeniorCitizenRegistration";
import VolunteerRegistration from "../components/Forms/VolunteerRegistration";
import AssignManagerForm from "../components/Forms/AssignManagerForm";

const tableConfigMap = {
  requests: {
    key: 'requests',
    title: 'Requests',
    fieldHeaders: [
      'Name',
      'Mobile',
      'Address',
      'Geo-address',
      'Request',
      'Status',
      'Time'
    ],
    fieldKeys: [
      'name',
      'mob_number',
      'address',
      'geoaddress',
      'request',
      'status',
      'timestamp'
    ],
    pageSize: 10,
    actions: [{
      key: 'assign',
      name: 'Assign a volunteer'
    }, {
      key: 'update',
      name: 'Update Info'
    },{
      key: 'assign_manager',
      name: 'Assign Manager'
    }]
  },
  volunteers: {
    key: 'volunteers',
    title: 'Volunteers',
    fieldHeaders: [
      'Name',
      'Mobile',
      'Email',
      'Address',
      'Geo-address',
      'Status',
      'Time'
    ],
    fieldKeys: [
      'name',
      'mob_number',
      'email_id',
      'address',
      'geoaddress',
      'status',
      'timestamp'
    ],
    pageSize: 10,
    actions: [{
      key: 'update',
      name: 'Update Info'
    }]
  }
};

class Tables extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currState: {
        requests: {
          data: [],
          filteredData: [],
          currPage: 1,
          searchString: '',
          statusFilter: ''
        },
        volunteers: {
          data: [],
          filteredData: [],
          currPage: 1,
          searchString: '',
          statusFilter: ''
        }
      },
      popupDetails: {
        isPopupOpen: false
      }
    };
    if (!isAuthorisedUserLoggedIn()) {
      localStorage.setItem(config.redirectToPageKey, this.props.location.pathname);
      this.props.history.push("/admin-login");
    }
  }

  componentDidMount() {
    this.getData();
  }

  parseTimestamp(data) {
    return data.map(d => {
      d.timestampMillis = moment(d.timestamp, "ddd, DD MMM YY, hh:mmA").valueOf();
      return d;
    });
  }

  getData() {
    makeApiCall(config.mapAuthEndpoint, 'GET',
        {},
        (response) => {
          const requestData = this.parseTimestamp(response.Requests)
          .sort((a, b) => {
            // if (a.status.toLowerCase() === 'pending' && b.status.toLowerCase() !== 'pending') {
            //   return -1;
            // }
            // if (a.status.toLowerCase() !== 'pending' && b.status.toLowerCase() === 'pending') {
            //   return 1;
            // }
            return b.timestampMillis - a.timestampMillis
          });
          const volunteerData = this.parseTimestamp(response.Volunteers)
          .sort((a, b) => b.timestampMillis - a.timestampMillis);
          this.setState({
            currState: {
              requests: {
                data: requestData,
                filteredData: requestData,
                currPage: 1,
                searchString: '',
                statusFilter: ''
              },
              volunteers: {
                data: volunteerData,
                filteredData: volunteerData,
                currPage: 1,
                searchString: '',
                statusFilter: ''
              }
            }
          });
        },
        false,
        (data) => {
          if (data.string_response === "Invalid token. Please log in again.") {
            localStorage.setItem(config.redirectToPageKey, this.props.location.pathname);
            this.props.history.push('/admin-login');
          }
        });
  }

  search = (event, tableConfig) => {
    const {currState} = this.state;
    currState[tableConfig.key].searchString = event.target.value;
    currState[tableConfig.key].filteredData = this.getFilteredData(currState[tableConfig.key],
        tableConfig);
    currState[tableConfig.key].currPage = 1;
    this.setState({currState: currState});
  };

  filter = (event, tableConfig) => {
    const {currState} = this.state;
    currState[tableConfig.key].statusFilter = event.target.value;
    currState[tableConfig.key].filteredData = this.getFilteredData(currState[tableConfig.key],
        tableConfig);
    currState[tableConfig.key].currPage = 1;
    this.setState({currState: currState});
  };

  getFilteredData(currTableData, tableConfig) {
    return currTableData.data.filter(row => {
      if (currTableData.statusFilter &&
          row.status.toString().toLowerCase() !== currTableData.statusFilter) {
        return false;
      }
      let keepRow = false;
      tableConfig.fieldKeys.forEach(fk => {
        if (row[fk] && row[fk].toString().toLowerCase().indexOf(
            currTableData.searchString.toLowerCase())
            !== -1) {
          keepRow = true;
        }
      });
      return keepRow;
    });
  }

  getDropDown(tableConfig, rowData) {
    return (
        <UncontrolledDropdown>
          <DropdownToggle
              className="btn-icon-only text-light"
              href="#"
              role="button"
              color=""
              onClick={e => e.preventDefault()}>
            <i className="fas fa-ellipsis-h"/>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            {
              tableConfig.actions.map(action => {
                return (
                    <DropdownItem href="#" key={action.key + '_' + (rowData.r_id || rowData.v_id)}
                                  onClick={e => {
                                    this.takeAction(action, rowData, tableConfig);
                                    e.preventDefault();
                                  }}>
                      {action.name}
                    </DropdownItem>
                );
              })
            }
          </DropdownMenu>
        </UncontrolledDropdown>
    );
  }

  getRows(tableConfig) {
    const {currState} = this.state;
    const currTableState = currState[tableConfig.key];
    if (currTableState.filteredData.length === 0) {
      return null;
    }
    let startNumber = (currTableState.currPage - 1) * tableConfig.pageSize;
    let endNumber = Math.min(startNumber + tableConfig.pageSize,
        currTableState.filteredData.length);
    const dataToReturn = [];
    for (let i = startNumber; i < endNumber; i++) {
      let currRowData = currTableState.filteredData[i];
      dataToReturn.push(<tr key={tableConfig.key + '_' + i}>
        <td key={tableConfig.key + '_' + i + ')s_no'}>{i + 1}</td>
        {
          tableConfig.fieldKeys.map(k => {
            return (<td key={tableConfig.key + '_' + i + '_' + k}>{currRowData[k]}</td>)
          })
        }
        <td key={tableConfig.key + '_' + i + '_action'}>
          {this.getDropDown(tableConfig, currRowData)}
        </td>
      </tr>);
    }
    return dataToReturn;
  }

  getNavigationPageNums(tableConfig) {
    const {currState} = this.state;
    const currTableState = currState[tableConfig.key];
    let startPage = Math.max(currTableState.currPage - 2, 1);
    let endPage = Math.min(startPage + 4, Math.ceil(
        currTableState.filteredData.length / tableConfig.pageSize));
    const dataToReturn = [];
    for (let i = startPage; i <= endPage; i++) {
      dataToReturn.push(
          <PaginationItem key={tableConfig.key + '_nav_' + i}
                          className={classnames({
                            active: currTableState.currPage === i
                          })}>
            <PaginationLink href="#" onClick={e => {
              currState[tableConfig.key].currPage = i;
              this.setState({currState: currState});
              e.preventDefault();
            }}>
              {i}
            </PaginationLink>
          </PaginationItem>);
    }
    return dataToReturn;
  }

  getNavigation(tableConfig) {
    const {currState} = this.state;
    const currTableState = currState[tableConfig.key];
    return (
        <nav>
          <Pagination
              className="pagination justify-content-end mb-0"
              listClassName="justify-content-end mb-0">
            <PaginationItem className="disabled">
              <PaginationLink
                  href="#"
                  onClick={e => {
                    if (currTableState.currPage > 1) {
                      currState[tableConfig.key].currPage = currTableState.currPage - 1;
                      this.setState({currState: currState});
                    }
                    e.preventDefault();
                  }}>
                <i className="fas fa-angle-left"/>
                <span className="sr-only">Previous</span>
              </PaginationLink>
            </PaginationItem>
            {this.getNavigationPageNums(tableConfig)}

            <PaginationItem>
              <PaginationLink href="#" onClick={e => {
                if (currTableState.currPage < Math.ceil(
                    currTableState.filteredData.length / tableConfig.pageSize)) {
                  currState[tableConfig.key].currPage = currTableState.currPage + 1;
                  this.setState({currState: currState});
                }
                e.preventDefault();
              }}>
                <i className="fas fa-angle-right"/>
                <span className="sr-only">Next</span>
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </nav>
    );
  }

  getTable(tableConfig) {
    const currTableState = this.state.currState[tableConfig.key];
    const statusList = []
    if (currTableState.data.length !== 0) {
      currTableState.data.map(row => row.status.toString().toLowerCase()).forEach(status => {
        if (status && statusList.indexOf(status) === -1) {
          statusList.push(status);
        }
      });
    }
    return (
        <Col>
          <Card className="shadow">
            <CardHeader className="border-0">
              <h3 className="mb-3 d-inline-block col-sm-4">
                {tableConfig.title} ({this.state.currState[tableConfig.key].filteredData.length})
              </h3>
              <Form inline className="navbar-search d-inline-block ml-auto col-sm-8"
                    onSubmit={e => e.preventDefault()}>
                <FormGroup>
                  {
                    statusList.length > 1 ?
                        <InputGroup className="input-group-alternative mr-0 ml-auto">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-filter"/>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Status" type="select"
                                 value={this.state.currState[tableConfig.key].statusFilter}
                                 onChange={e => this.filter(e, tableConfig)}>
                            <option value="">Status</option>
                            {
                              statusList.sort(
                                  (a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).map(
                                  status => {
                                    return (<option key={status} value={status}>{status}</option>);
                                  })
                            }
                          </Input>
                        </InputGroup> : null
                  }
                  <InputGroup className="input-group-alternative mr-0 ml-auto">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-search"/>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Search" type="text"
                           value={this.state.currState[tableConfig.key].searchString}
                           onChange={e => this.search(e, tableConfig)}/>
                  </InputGroup>
                </FormGroup>
              </Form>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
              <tr>
                <th scope="col">S.No.</th>
                {
                  tableConfig.fieldHeaders.map(fh => {
                    return (
                        <th scope="col" key={tableConfig.key + '_' + fh}>{fh}</th>
                    );
                  })
                }
                <th scope="col">Action</th>
              </tr>
              </thead>
              <tbody>{this.getRows(tableConfig)}</tbody>
            </Table>
            <CardFooter className="py-4">
              {this.getNavigation(tableConfig)}
            </CardFooter>
          </Card>
        </Col>
    );
  }

  takeAction(action, rowData, tableConfig) {
    this.setState({popupDetails: {isPopupOpen: true, action, rowData, tableConfig}});
  }

  renderAction = () => {
    const {popupDetails} = this.state;

    switch (popupDetails.action.key) {
      case 'assign':
        return <AssignVolunteerForm requestData={popupDetails.rowData} volunteerList={this.state.currState.volunteers.data}/>
      case 'update':
        if(popupDetails.tableConfig.key === 'volunteers') {
          return <VolunteerRegistration existingData={popupDetails.rowData}/>
        } else {
          return <SeniorCitizenRegistration existingData={popupDetails.rowData}/>
        }
      case 'assign_manager':
        return <AssignManagerForm existingData={popupDetails.rowData} afterAssign={() => this.setState({popupDetails: {isPopupOpen: false, action: { name: '', key: '' }}})}/>
      default:
        return 'No action defined for the option: ' + popupDetails.action.name;
    }
  }

  getPopup() {
    const {popupDetails} = this.state;
    return (
        <Popup open={popupDetails.isPopupOpen} closeOnEscape closeOnDocumentClick
               position="right center"
               contentStyle={{borderRadius: "0.375rem", minWidth: "50%", width: "unset"}}
               className="col-md-6"
               onClose={() => this.setState({popupDetails: {isPopupOpen: false, action: { name: '', key: '' }}})}>
          {close => (
              <>
                <CardHeader className="bg-transparent">
                  <Row className="justify-content-end">
                    <a className="close" href="#index" onClick={close}>
                      &times;
                    </a>
                  </Row>
                  <Row className="align-items-center">
                    <div className="col text-center">
                      <h2 className="mb-0">
                        {popupDetails.action.name}
                      </h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody className="pre-scrollable">
                  <Row className="justify-content-center">
                    {
                      this.renderAction()
                    }
                  </Row>
                </CardBody>
              </>
          )}
        </Popup>
    );
  }

  render() {
    if (!isAuthorisedUserLoggedIn()) {
      localStorage.setItem(config.redirectToPageKey, this.props.location.pathname);
      this.props.history.push("/admin-login");
      return null;
    }
    return (
        <>
          {this.getPopup()}
          <Header showCards={false}/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row>
              {this.getTable(tableConfigMap.requests)}
            </Row>
            <Row className="mt-5">
              {this.getTable(tableConfigMap.volunteers)}
            </Row>
          </Container>
        </>
    );
  }
}

export default withRouter(Tables);
import React, {Component} from 'react';
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row
} from "reactstrap";
import {withRouter} from "react-router";
import Header from "../components/Headers/Header.js";
import {isAuthorisedUserLoggedIn, makeApiCall} from "utils/utils";
import config from 'config/config';
import {sanitizeMobileNumber, validateMobile} from "../utils/utils";
import AutoCompleteAddressFormGroup from "../components/AutoComplete/AutoCompleteAddressFormGroup";
import FormGroupTemplate from "../components/Forms/FormGroupTemplate";

const defaultData = {
    name: '',
    mob_number: '',
    address: '',
    geoaddress: '',
    source: localStorage.getItem(config.sourceKey) ? localStorage.getItem(config.sourceKey)
                                                   : 'covidsos',
    request: '',
    latitude: '0.0',
    longitude: '0.0',
    place_id: '',
    checked: '',
    help_groceries: '',
    help_medicine: '',
    help_cook: '',
    help_virtual: '',
    help_volunteer: '',
    help_operation: '',

};

class NGOFormView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            request: defaultData,
            address: '',
            why: '',
            what: '',
            verification_status: 'pending',
            financial_assistance: 0,
            urgent: "",
            sources: [],
            volunteer_count: 1,
            supportTypeList: [
                {"id": 'help_groceries', "support_type": "Deliver groceries", "isSelected": false},
                {"id": 'help_medicine', "support_type": "Deliver medicines", "isSelected": false},
                {"id": 'help_cook', "support_type": "Help with cooked food", "isSelected": false},
                {"id": 'help_volunteer', "support_type": "Volunteer with NGOs", "isSelected": false},
                {"id": 'help_operation', "support_type": "Operations", "isSelected": false}
            ],
            members_impacted: 1,
            map_supporttype_to_key: new Map(),
        };
        if (!isAuthorisedUserLoggedIn()) {
            localStorage.setItem(config.redirectToPageKey, this.props.location.pathname);
            this.props.history.push("/admin-login");
        }

        this.getSupportListData();

    }

    mapSupportTypeToKey(){
        let mstk = new Map();
        mstk.set('Deliver groceries', 'help_groceries');
        mstk.set('Deliver medicines', 'help_medicine');
        mstk.set('Volunteer with NGOs (Field Work)', 'help_volunteer');
        mstk.set('Help with cooked food', 'help_cook');
        mstk.set('COVIDSOS operations support', 'help_operation');

        this.setState({map_supporttype_to_key: mstk});
    }

    updateData = (event, field) => {
        const {request} = this.state;
        request[field] = event.target.value;
        if (['checked', 'help_groceries', 'help_medicine', 'help_cook', 'help_virtual', 'help_operation', 'help_volunteer'].indexOf(field) !== -1) {
            request[field] = event.target.checked;
        }
        if (field === 'mob_number' || field === 'email_id') {
            request[field] = event.target.value.trim();
        }
        this.setState({request: request, isSubmitClicked: false});
    };

    getSupportListData() {
        makeApiCall(config.supportTypeList, 'GET', {"type": "volunteer"}, (response) => {
            let supportTypeList = response;
            supportTypeList.map((listItem) => {
                listItem["isSelected"] = false;
            });

            this.setState({supportTypeList: supportTypeList});
            this.mapSupportTypeToKey()
        }, false);
    }


    onChange = (key, value) => {
        this.setState({
                          [key]: value
                      })
    };

    handleSubmit = (status) => {
        const { request, supportTypeList } = this.state;

        supportTypeList.forEach((supportTypeItem) => {
            if (supportTypeItem.isSelected)
            {
                request[this.state.map_supporttype_to_key.get(supportTypeItem.support_type)] = true;
            }
        });


        let data = request;
        if (data.mob_number) {
            data.mob_number = sanitizeMobileNumber(data.mob_number);
            if (!validateMobile(data.mob_number)) {
                return;
            }
        }

        if (data.help_groceries) {
            data.request = 'Deliver Groceries';
        }
        if (data.help_medicine) {
            data.request = (data.request ? data.request + ' | ' : '') + 'Deliver Medicines';
        }
        if (data.help_food) {
            data.request = (data.request ? data.request + ' | ' : '') + 'Need Cooked Food';
        }
        if (data.help_virtual) {
            data.request = (data.request ? data.request + ' | ' : '') + 'Virtual Help';
        }

        makeApiCall(config.requestEndpoint, 'POST', data, () => {

        });
        const {why, what, financial_assistance, urgent, volunteer_count, source} = this.state;
        const {name, mob_number, geoaddress, address} = data;
        const verification_status= 'pending';
        makeApiCall(config.ngoFormView, 'POST', {
                name,
                mob_number,
                geoaddress,
                why,
            address,
                request,
                what,
                financial_assistance,
                verification_status,
                urgent,
                volunteer_count,
                source
            }, (response) => {
                this.props.history.push('/pending-requests')
            });
    }

    onChecked(event, id) {
        let supportTypeList = this.state.supportTypeList;
        supportTypeList.map((listItem) => {
            if (listItem.id === id) {
                listItem.isSelected = event.target.checked;
            }
        })
        this.setState({supportTypeList: supportTypeList});
    }

    renderSupportList(){
        return (
            this.state.supportTypeList.map((supportListItem) => {
            return (
                <div key={supportListItem.id}
                     className="custom-control custom-control-alternative custom-checkbox">
                    <input
                        className="custom-control-input"
                        id={supportListItem.id}
                        type="checkbox"
                        checked={supportListItem.isSelected}
                        onChange={e => this.onChecked(e, supportListItem.id)}/>
                    <label className="custom-control-label" htmlFor={supportListItem.id}>
              <span className="text-muted">
                {supportListItem.support_type}
              </span>
                    </label>
                </div>
            );
        }));
    }

    render() {


        if (!isAuthorisedUserLoggedIn()) {
            localStorage.setItem(config.redirectToPageKey, this.props.location.pathname);
            this.props.history.push("/admin-login");
            return null;
        }
        const {request, why, what, verification_status, financial_assistance, volunteer_count, members_impacted} = this.state;
        // if (!r_id) {
        //     return null;
        // }
        return (
            <>
                <Header showCards={false}/>
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Row className="justify-content-center">
                        <Col lg="8" md="8">
                            <Card className="bg-secondary shadow border-0">
                                <CardBody className="px-lg-3 py-lg-3 text-justify">
                                    <div className="text-uppercase text-center mt-2 mb-2">
                                        NGO Form
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Container className="request-card-container" fluid>
                    <Row className="mt-5">
                        <Card className='request-verification-card center-align'>
                            <CardBody>

                                <Form className='verify-request-form'>
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input autoComplete="off" type="textarea" value={request.name}
                                               onChange={(event) => this.updateData(event, 'name')}/>
                                        <Label>Mobile Number</Label>
                                        <Input autoComplete="off" type="textarea" value={request.mob_number}
                                               onChange={(event) => this.updateData(event, 'mob_number')}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <AutoCompleteAddressFormGroup
                                            iconClass="fas fa-map-marker"
                                            placeholder="Area / Landmark / Apartment Name"
                                            domID='volunteer-popup-address'
                                            onSelect={({geoaddress, latitude, longitude, place_id}) => {
                                                this.setState({
                                                                  request: {
                                                                      ...request,
                                                                      geoaddress,
                                                                      latitude,
                                                                      longitude,
                                                                      place_id
                                                                  }
                                                              })
                                            }}
                                        />
                                        <FormGroupTemplate iconClass="fas fa-address-card"
                                                           placeholder="Enter Flat number/house number" type="text"
                                                           value={this.state.request.address}
                                                           onChange={e => this.updateData(e, 'address')}/>
                                        <Label>Why do they need help?</Label>
                                        <Input autoComplete="off" type="textarea" name="address" value={why}
                                               onChange={(event) => this.onChange('why', event.target.value)}/>
                                    </FormGroup>
                                    {this.renderSupportList()}
                                    <FormGroup>
                                        <Label>What do you need?</Label>
                                        <Input autoComplete="off" type="textarea" name="address2" value={what}
                                               onChange={(event) => this.onChange('what', event.target.value)}/>
                                    </FormGroup>
                                    <div className="custom-control custom-control-alternative custom-checkbox mb-4">
                                        <input
                                            className="custom-control-input"
                                            id="financialAssistanceCheck"
                                            type="checkbox"
                                            checked={financial_assistance}
                                            onChange={event => this.onChange('financial_assistance',
                                                                             event.target.checked ? 1 : 0)}/>
                                        <label className="custom-control-label" htmlFor="financialAssistanceCheck">
                                            <span className="text-muted">This person needs financial assistance</span>
                                        </label>
                                    </div>
                                    <div className="mb-4">
                                        Urgent ?
                                        <FormGroup check style={{display: 'inline-block', marginLeft: '20px'}}>
                                            <Label check>
                                                <Input type="radio" name="radio1" checked={this.state.urgent === "yes"}
                                                       onChange={event => this.onChange('urgent',
                                                                                        event.target.checked && "yes")}/>{' '}
                                                Yes
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check style={{display: 'inline-block', marginLeft: '20px'}}>
                                            <Label check>
                                                <Input type="radio" name="radio1" checked={this.state.urgent === "no"}
                                                       onChange={event => this.onChange('urgent',
                                                                                        event.target.checked && "no")}/>{' '}
                                                No
                                            </Label>
                                        </FormGroup>
                                    </div>
                                    <div>
                                        <FormGroup>
                                            <Label for="exampleEmail">Vounteer Count</Label>
                                            <Input type="number" name="volunteer_count"
                                                   id="vounteerCount" placeholder="Enter Volunteer Count"
                                                   value={volunteer_count}
                                                   onChange={(event) => this.onChange('volunteer_count',
                                                                                      event.target.value)}
                                            />
                                            <Label for="exampleEmail">Number of People who need help</Label>
                                            <Input type="number" name="volunteer_count"
                                                   id="member_impacted" placeholder="Enter number of people who need help count"
                                                   value={members_impacted}
                                                   onChange={(event) => this.onChange('members_impacted',
                                                                                      event.target.value)}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className='text-center'>

                                        <Button
                                            outline={!(verification_status === 'verified')}
                                            color="success"
                                            onClick={() => this.handleSubmit('verified')}
                                        >Submit</Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Row>
                </Container>
            </>

        )
    }
}

export default withRouter(NGOFormView);
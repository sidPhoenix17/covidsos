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
/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
// reactstrap components
import { Button, CardBody, Form, Row, Label, Input } from "reactstrap";
import FormGroupTemplate from "./FormGroupTemplate";
import AutoCompleteAddressFormGroup from '../AutoComplete/AutoCompleteAddressFormGroup';
import config from "../../config/config";
import { makeApiCall, sanitizeMobileNumber, validateEmail, validateMobile } from "../../utils/utils";

const defaultData = {
    name: '',
    mob_number: '',
    email_id: '',
    geoaddress: '',
    address: '',
    source: localStorage.getItem(config.sourceKey) ? localStorage.getItem(config.sourceKey) : 'covidsos',
    latitude: '',
    longitude: '',
    support_type: '',
    checked: ''
};

let items = [];

class VolunteerRegistrationStepOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = { volunteer: defaultData, isSubmitClicked: false, activeTab: 1, supportTypeList: [] };
    }

    getSupportListData() {
        makeApiCall(config.supportTypeList, 'GET', {}, (response) => {
            let supportTypeList = response;
            supportTypeList.map((listItem) => {
                listItem["isSelected"] = false;
            });

            this.setState({ supportTypeList: supportTypeList });
        });
    }

    componentWillMount() {
        localStorage.removeItem(config.supportTypeSelected);
        this.getSupportListData();
    }


    componentDidMount() {
        if (localStorage.getItem(config.sourceKey)) {
            this.setState(
                { volunteer: { ...this.state.volunteer, source: localStorage.getItem(config.sourceKey) } });
        }
    }

    onChecked(id) {
        let supportTypeList = this.state.supportTypeList;
        supportTypeList.map((listItem) => {
            if (listItem.id === id) {
                listItem.isSelected = !listItem.isSelected;
            }
        })
        this.setState({ supportTypeList: supportTypeList });
    }


    getCheckBox(supportListItem) {
        return (
            <div key={supportListItem.id} className="custom-control custom-control-alternative custom-checkbox">

                <Label check>
                    <Input type="checkbox"
                        checked={supportListItem.isSelected}
                        onChange={() => { this.onChecked(supportListItem.id) }}
                    />{' '}
                    {supportListItem.support_type}
                </Label>
            </div>
        );
    }

    onNext() {
        let selectedSupportTypes = "";
        let supportTypeList = this.state.supportTypeList;

        supportTypeList.forEach((supportTypeItem) => {
            if (supportTypeItem.isSelected) {
                selectedSupportTypes = selectedSupportTypes.concat(supportTypeItem.support_type, ",");
            }
        });

        selectedSupportTypes = selectedSupportTypes.substr(0, selectedSupportTypes.length - 1);
        localStorage.setItem(config.supportTypeSelected, selectedSupportTypes);
        this.props.onNext();
    }

    render() {
        return (
            <>
                {this.state.supportTypeList.map((item) => this.getCheckBox(item))}
                <Button className="mt-4" color="primary" type="submit" onClick={() => this.onNext()}>
                    Next
                </Button>
            </>
        );
    }
}

export default VolunteerRegistrationStepOne;
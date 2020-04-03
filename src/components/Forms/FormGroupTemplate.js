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
import {Button, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import {geolocated} from "react-geolocated";
import Form from "reactstrap/lib/Form";
import PropTypes from "prop-types";
import UserDropDown from "../DropDown/UserDropDown";

class FormGroupTemplate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {iconClass, placeholder, type, optionsArray, ...attributes} = this.props;
    return (
        <FormGroup>
          <InputGroup className="input-group-alternative mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className={iconClass}/>
              </InputGroupText>
            </InputGroupAddon>
            {
              type === 'select' && optionsArray ?
                  <Input {...attributes} placeholder={placeholder} type={type}>
                    <option value="">{placeholder}</option>
                    {optionsArray.map(org => {
                      return (<option key={org.value} value={org.value}>{org.label}</option>);
                    })}
                  </Input>
                  :
                  <Input {...attributes} placeholder={placeholder} type={type}/>
            }
          </InputGroup>
        </FormGroup>
    );
  }
}

UserDropDown.defaultProps = {
  type: "text"
};

FormGroupTemplate.propTypes = {
  iconClass: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  optionsArray: PropTypes.array
};

export default FormGroupTemplate;
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
import {CardText, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import PropTypes from "prop-types";

class FormGroupTemplate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {iconClass, placeholder, type, optionsArray, optionGroupsArray, optionGroupsLabels, ...attributes} = this.props;
    return (
        <FormGroup>
          <CardText className="text-gray text-custom-small mb-0">
            {placeholder}
          </CardText>
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
                    {optionsArray.map(option => {
                      return (
                          <option key={option.value} value={option.value}>{option.label}</option>);
                    })}
                  </Input>
                  :
                  type === 'select' && optionGroupsArray ?
                      <Input {...attributes} placeholder={placeholder} type={type}>
                        <option value="">{placeholder}</option>
                        {optionGroupsArray.map(optionGroup => {
                          return (
                              <optgroup label={optionGroup.label} key={optionGroup.label}>
                                {optionGroup.optionList.map(option => {
                                  return (
                                      <option key={option.value}
                                              value={option.value}>{option.label}</option>);
                                })}
                              </optgroup>
                          )
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

FormGroupTemplate.defaultProps = {
  type: "text"
};

FormGroupTemplate.propTypes = {
  iconClass: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  optionsArray: PropTypes.array,
  optionGroupsArray: PropTypes.array
};

export default FormGroupTemplate;
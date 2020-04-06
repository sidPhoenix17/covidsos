import React from "react";
import {FormGroup, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import AutoCompleteAddress from "./Adress";

export default class AutoCompleteAddressFormGroup extends React.Component {

  render() {
    const {iconClass, ...props} = this.props;
    return (
        <FormGroup>
          <InputGroup className="input-group-alternative mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className={iconClass}/>
              </InputGroupText>
            </InputGroupAddon>
            <AutoCompleteAddress {...props}/>
          </InputGroup>
        </FormGroup>
    )
  }
}
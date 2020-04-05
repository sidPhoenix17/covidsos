import React from "react";
import {InputGroupAddon, InputGroupText, InputGroup, Input, FormGroup} from "reactstrap";
import config from "../../config/config";


export default class AutoCompleteAddress extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            query: ''
        }
    }

    componentDidMount(){
        this.createScript();
    }
    
    createScript() {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${config.googleMapAPIToken}&libraries=places`;
        
        script.onload = () => {
            // eslint-disable-next-line
            this.autocomplete = new google.maps.places.Autocomplete(
                document.getElementById('autocomplete'), {types: ['geocode']}
            );
            this.autocomplete.setFields(['address_component', 'geometry']);
            this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
        };
    
        script.onerror = (err) => {
            console.log(err);
        };
    
        document.body.appendChild(script);
      }

    handlePlaceSelect = () => {
        const addressObject = this.autocomplete.getPlace();
        const addressComponents = addressObject.address_components;
        const geometry = addressObject.geometry;
        const geoaddress = addressComponents.map(({ long_name }) => long_name).join(',');
        const latitude = geometry.location.lat();
        const longitude = geometry.location.lng();
        
        this.setState({
            query: geoaddress
        }, () => {
            this.props.onSelect({
                geoaddress,
                latitude,
                longitude
            });
        })
    }

    render (){  
        const { iconClass, placeholder, disabled } = this.props;
        const { query } = this.state;

        return (
            <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className={iconClass}/>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        type="text"
                        name="address"
                        id="autocomplete"
                        placeholder={placeholder}
                        value={query}
                        disabled={disabled}
                        onChange={(event) => this.setState({query: event.target.value}) }
                    />
                </InputGroup>
            </FormGroup>
        )
    }
}
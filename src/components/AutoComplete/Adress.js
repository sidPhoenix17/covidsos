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
        const existingScript = document.getElementById('googleMaps');
  
        if (!existingScript) {
          const script = document.createElement('script');
          script.async = false;
          script.src = `https://maps.googleapis.com/maps/api/js?key=${config.googleMapAPIToken}&libraries=places`;
          script.id = 'googleMaps';
          document.body.appendChild(script);
        }

        this.initAPI();
    }

    initAPI = () => {

        if (!window.google) {
            setTimeout(() => { this.initAPI() }, 1000);
            return;
        }


        if (!window.google.maps) {
            setTimeout(() => { this.initAPI(); }, 1000);
            return;
        }
        
        if (!window.google.maps.places) {
            setTimeout(() => { this.initAPI(); }, 1000);
            return;
        }

        const { domID } = this.props;
        this.autocomplete = new window.google.maps.places.Autocomplete(
            document.getElementById(domID), {types: ['geocode']}
        );
        this.autocomplete.setFields(['address_component', 'geometry']);
        this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
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
        const { iconClass, placeholder, disabled, domID } = this.props;
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
                        id={domID}
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
import React, {Component} from 'react';
import {withRouter} from "react-router";
import {Button, Input} from "reactstrap";
import Header from "../components/Headers/Header";

class RequestStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {requestStatus:'Matc   hed', noVolunteerImg: 'assets/img/icons/noVolunteer.svg', volunteerAllottedImg: 'src/assets/img/icons/volunteer_find.svg', volunteerName: '', volunterContact: '', feedback: ''};
    }

    componentDidMount() {
        // makeAPICALL and populate state with
        // -> Request Status
        // -> Volunteer Information or vid if there is
    }

    messageVolunteerDetails(){

    }

    submitFeedback(){

    }


    render() {
        const { requestStatus, feedback } = this.state;
        switch (requestStatus)
        {
            case 'Received':
                return (
                    <>
                        <img alt='logo' src={require("assets/img/icons/noVolunteer.svg")}/>
                    <h1> your request has been received. We will reach out to you shortly for verification </h1>
                        </>
            );

            case 'Verified':
            return (
                <>
                <img alt='logo' src={require("assets/img/icons/noVolunteer.svg")}/>
                <h1>  Still looking for Volunteer </h1>
                </>
            );

            case 'Matched':
            return (
                <>
                    <img alt='logo' src={require("assets/img/icons/requestAccept.png")}/>
                    <h1> {this.state.volunteerName} has been allotted to you. Click the below button to get volunteer information </h1>
                    <div className='text-center'>
                        <Button color="success" type="submit" onClick={this.messageVolunteerDetails}
                         >Contact Volunteer</Button>
                    </div>
                    </>

            );

            case 'Completed':
                return (
                    <>
                    <img alt='logo' src={require("assets/img/icons/requestAccept.png")}/>,
                    <h1> {this.state.volunteerName} closed this request. Please provide feedback below </h1>
                    <Input autoComplete="off" type="textarea" name="feedback" value={this.state.feedback}
                       onChange={(event) => this.setState({
                       ...this.state,
                           feedback: event.target.value,
                       })
                       }/>
                        <div className='text-center'>
                            <Button color="success" type="submit" onClick={this.submitFeedback}>Submit</Button>
                        </div>
                       </>
            );

            default:
                return (
                    <>
                    <h1>  Unvalid Request </h1>
                        </>
            )





        }
    }
}

export default withRouter(RequestStatus);
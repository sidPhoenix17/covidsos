import React from "react";
import {withRouter} from "react-router";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container, Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row
} from "reactstrap";
import Header from "../components/Headers/Header.js";
import {clearLoginData, getFormPopup, makeApiCall} from "../utils/utils";
import config from '../config/config';
import Popup from "reactjs-popup";

class VolunteerLogin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mobileNumber: '',
      loading: false,
      step: 1,
      resend: false,
      otp: '',
      isRegistrationPopupOpen: false
    }
  }

  getURL = (resend) => {
    return resend ? config.resendOTP : config.requestOTP;
  }

  onSubmitMobileNumber = (e, resend = false) => {
    e.preventDefault();
    const {mobileNumber} = this.state;

    this.setState({loading: true}, () => {
      makeApiCall(this.getURL(resend), 'POST', {mob_number: mobileNumber}, (response) => {
        if (response) {
          if (resend) {
            this.setState({
              step: 2,
              resend: true,
              loading: false
            });
          } else {
            this.setState({
              step: 2,
              loading: false
            });
          }
        }
      }, false, () => {
        this.setState({
          loading: false
        })
      });
    });

  }

  onSubmitOTP = (e) => {
    e.preventDefault();
    const {mobileNumber, otp} = this.state;

    this.setState({loading: true}, () => {
      makeApiCall(config.verifytOTP, 'POST', {mob_number: mobileNumber, otp: otp}, (response) => {

        this.setState({loading: false});
        clearLoginData();
        localStorage.setItem(config.tokenStorageKey, response.auth_token);
        localStorage.setItem(config.volunteerIdStorageKey, response.volunteer_id);
        localStorage.setItem(config.fullNameStorageKey, response.name);
        const redirectToPage = localStorage.getItem(config.redirectToPageKey);
        if (redirectToPage) {
          localStorage.removeItem(config.redirectToPageKey);
          this.props.history.push(redirectToPage);
        } else {
          this.props.history.push("/");
        }

      }, false, () => {
        this.setState({
          loading: false
        })
      });
    });

  }

  renderMobileNumberForm = () => {

    const {mobileNumber, loading} = this.state;

    return (
        <>
          {
            getFormPopup(
                false,
                this.state.isRegistrationPopupOpen,
                1,
                () => this.setState({isRegistrationPopupOpen: false}),
                null)
          }
          <Form role="form" onSubmit={this.onSubmitMobileNumber}>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText><i className={'fa fa-mobile'}/></InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Enter Mobile Number" inputMode='numeric' value={mobileNumber}
                     onChange={(event) => this.setState({mobileNumber: event.target.value})}/>
            </InputGroup>

            <div className="text-center">
              <Button
                  className="mt-4"
                  color="primary"
                  type="submit"
                  disabled={!mobileNumber || loading}
              >
                Send OTP
              </Button>
            </div>
            <div className="text-center">
              <Button
                  className="mt-4"
                  color="outline-primary"
                  type="button"
                  disabled={loading}
                  onClick={() => this.setState({isRegistrationPopupOpen: true})}
              >
                Not a volunteer? Register now
              </Button>
            </div>
          </Form>
        </>
    )
  }

  renderOTPForm = () => {
    const {loading, otp} = this.state;

    return (
        <Form role="form" onSubmit={this.onSubmitOTP}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText><i className='fa fa-lock'/></InputGroupText>
            </InputGroupAddon>
            <Input placeholder="Enter OTP" inputMode='numeric' value={otp}
                   onChange={(event) => this.setState({otp: event.target.value})}/>
          </InputGroup>
          <Label>Not received? Try <a href="#resend" onClick={
            e => this.onSubmitMobileNumber(e, true)}>Resend
            OTP</a>
          </Label>

          <div className="text-center">
            <Button
                className="mt-4"
                color="primary"
                type="submit"
                disabled={!otp || loading}
            >
              Verify OTP
            </Button>
          </div>
        </Form>
    )
  }

  renderCard = () => {
    const {step} = this.state;
    switch (step) {
      case 1:
        return this.renderMobileNumberForm();
      case 2:
        return this.renderOTPForm();
      default:
        break;
    }

  }

  render() {
    return (
        <>
          <Header showCards={false}/>
          <Container className="mt--7" fluid>
            <Row className="justify-content-center">
              <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-transparent pb-3">
                    <div className="text-uppercase text-muted text-center mt-2 mb-2">
                      Volunteer Login
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    {this.renderCard()}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
    );
  }
}

export default withRouter(VolunteerLogin);

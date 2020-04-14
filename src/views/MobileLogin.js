import React from "react";
import {withRouter} from "react-router";
import {Card, CardBody, CardHeader,Label, FormText, Col, Container, Row, InputGroup, InputGroupAddon, InputGroupText, Input} from "reactstrap";
import Header from "../components/Headers/Header.js";
import {isLoggedIn, makeApiCall} from "../utils/utils";
import {Button, Form} from "reactstrap";
import FormGroupTemplate from "../components/Forms/FormGroupTemplate";
import config from '../config/config';



class MobileLogin extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            mobileNumber: '',
            loading: false,
            step: 1,
            resend: false,
            otp: ''
        }
    }


    getURL = (resend) => {
        return resend ? config.resendOTP : config.requestOTP;
    }


    onSubmitMobileNumber = (resend = false) => {
        const { mobileNumber } = this.state;

        this.setState({ loading: true }, () => {
          makeApiCall(this.getURL(resend), 'POST', {mob_number: mobileNumber}, (response) => {
              if(response){
                  if(resend) {
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

    onSubmitOTP = () => {
      const { mobileNumber, otp } = this.state;

      this.setState({ loading: true }, () => {
        makeApiCall(config.verifytOTP, 'POST', {mob_number: mobileNumber, otp: otp}, (response) => {
          let { auth_token } = response;

          if(auth_token.length > 0){
            this.setState({
              loading: false
            })
            localStorage.setItem('covidsos-auth-token', auth_token)
            this.props.history.push("");
          }

          }, false, () => {
            this.setState({
              loading: false
            })
          });
      });

    }



    renderMobileNumberForm = () => {

        const { mobileNumber, loading } = this.state;

        return (
            <div>

                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText><i className={'fa fa-mobile'}/></InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Enter Mobile Number" inputMode='numeric' value={mobileNumber}  onChange={(event) => this.setState({mobileNumber: event.target.value }) }/>
                </InputGroup>

                <div className="text-center">
                    <Button
                        className="mt-4"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        onClick={() => this.onSubmitMobileNumber()}
                    >
                        Send OTP
                    </Button>
                </div>
          </div>
        )
    }


    renderOTPForm = () => {
      const { mobileNumber, loading, otp } = this.state;

      return (
          <div>

              <InputGroup>
                  <InputGroupAddon addonType="prepend">
                  <InputGroupText><i className={'fa fa-mobile'}/></InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Enter OTP" inputMode='numeric' value={otp}  onChange={(event) => this.setState({otp: event.target.value }) }/>
              </InputGroup>
              <Label>Not recieved? Try <span onClick={() => this.onSubmitMobileNumber(true)}>Resend OTP</span></Label>

              <div className="text-center">
                  <Button
                      className="mt-4"
                      color="primary"
                      type="submit"
                      disabled={loading}
                      onClick={() => this.onSubmitOTP()}
                  >
                      Send OTP
                  </Button>
              </div>
        </div>
      )
    }

    renderCard = () => {
      const { step } = this.state;
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
                      Verify Mobile Number
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

export default withRouter(MobileLogin);

import React from "react";
import {Card, CardBody, CardHeader, FormText, Col, Container, Row, InputGroup, InputGroupAddon, InputGroupText, Input} from "reactstrap";
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
            loading: false
        }
    }

    onSubmitMobileNumber = () => {
        const { mobileNumber } = this.state;
        console.log(mobileNumber);

        makeApiCall(config.requestOTP, 'POST', {mob_number: mobileNumber}, (response) => {
            console.log(response);

            // this.setState({
            //   requests: (response.pending || [])
            // })
          }, false);


    }



    renderForm = () => {

        const { mobileNumber, loading } = this.state;

        return (
            <div>

                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText><i className={'fa fa-mobile'}/></InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Enter Mobile Number" inputMode='numeric' value={mobileNumber}  onChange={(event) => this.setState({mobileNumber: event.target.value }) }/>
                    <FormText color="muted">
                        This is some placeholder block-level help text for the above input.
                        It's a bit lighter and easily wraps to a new line.
                    </FormText>
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
                      Login
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    {isLoggedIn() ? 'You are already logged in!' : this.renderForm()}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
    );
  }
}

export default MobileLogin;

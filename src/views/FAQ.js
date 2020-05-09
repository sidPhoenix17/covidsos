import React from 'react';
import { Container, Card, CardHeader }  from "reactstrap";

const FAQ = () => (
    <Container className="faq-container" style={{ height: '70vh'}}>
        <Card>
            <CardHeader className="bg-transparent pb-3">
                <div className="text-uppercase text-muted text-center mt-2 mb-2">
                  Frequently Asked Questions
                </div>
              </CardHeader>
            <div  >
                <iframe 
                    title="FAQ document"
                    style={{ width: '100%', height: '70vh'}}
                    src="https://docs.google.com/document/d/162D6YrrjibmEIl-gn8Bue1ADRyoe-0gsB7TllnNYTcE/edit">
                </iframe>
            </div>
            </Card>
    </Container>
   
);

export default FAQ;
import Popup from "reactjs-popup";
import {Button, CardHeader, Row} from "reactstrap";
import React from "react";
import ImageUploadPopup from "../components/Forms/ImageUploadPopup";

export const fileUploadPopup = (defaultOpen, open, onCloseFunc, uuid, vid) => {
  return (
      <Popup defaultOpen={defaultOpen} open={open} closeOnEscape closeOnDocumentClick
             position="right center"
             contentStyle={{borderRadius: "0.375rem", minWidth: "50%", width: "unset"}}
             overlayStyle={{background: "rgba(0, 0, 0, 0.85)"}}
             className="col-md-6"
             onClose={onCloseFunc}>
        {
          close => (
              <>
                <CardHeader className="bg-transparent">
                  <Row className="justify-content-end">
                    <Button onClick={close}
                            className="close btn-icon btn-link border-0 text-dark">
                      <i className="fas fa-times" style={{fontSize: '1rem'}}/>
                    </Button>
                  </Row>
                  <Row className="align-items-center">
                    <div className="col text-center">
                      Add Image(s)
                    </div>
                  </Row>
                </CardHeader>
                {<ImageUploadPopup uuid={uuid} vid={vid}/>}
                <div className="text-center">
                  <Button className="mt-4" color="primary" onClick={close}>
                    Done
                  </Button>
                </div>
              </>
          )}
      </Popup>
  );
}
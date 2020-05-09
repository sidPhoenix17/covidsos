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
import {CardBody, Row} from "reactstrap";
import config from "../../config/config";
import {makeApiCall} from "../../utils/utils";
import {FileManager, FileUploader} from "reactjs-file-uploader";
import Col from "reactstrap/es/Col";

class ImageUploadPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitClicked: false,
      files: []
    };
    this.uploadFiles = this.uploadFiles.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  uploadFiles(files) {
    return (
        <div className="d-flex flex-wrap justify-content-center image-preview-wrapper">
          {files.map(this.uploadFile)}
        </div>
    )
  }

  uploadFile(file) {
    const {uuid, vid} = this.props;
    return (
        <FileUploader
            key={file.key}
            file={file}
            url={config.imageUpload}
            formData={{
              file,
              request_uuid: uuid,
              volunteer_id: vid
            }}
            readFile
            autoUpload
        >
          {this.fileProgress}
        </FileUploader>
    )
  }

  fileProgress({

    /*
    References to the Event objects.
    Initial state is null and each property gets assigned on Event.
     */
    uploadReady,
    uploadStart,
    uploadProgress,
    uploadComplete,
    downloadStart,
    downloadProgress,
    downloadComplete,
    error,
    abort,
    timeout,

    /*
    The sequential state of the request
    enum {
        uploadReady, uploadStart, uploadProgress, uploadComplete, downloadStart
        downloadStart, downloadProgress, downloadComplete
    }
     */
    requestState,

    /*
    Function references to start / abort request
      */
    startUpload,
    abortRequest,

    /*
    Request Object reference (XMLHttpReqeust)
     */
    request,

    /*
    Response text Object (JSON)
     */
    response,

    /*
    Data of the file being uploaded (if readData props is true)
     */
    fileData,

  }) {
    console.log(uploadProgress, requestState);
    return (
        <>
          <div className="image-preview">
            {fileData && <img src={fileData} alt="Preview"/>}
            <div>
              <div style={{position: "relative"}}>
                <span className="avatar rounded-circle image-preview-status" title={requestState}>
                  {requestState === 'uploadComplete' && <i className="fas fa-check text-green"/>}
                  {requestState === 'error' && <i className="fas fa-exclamation-triangle text-red"/>}
                </span>
              </div>
            </div>
          </div>
        </>
    )
  }

  render() {
    return (
        <>
          <CardBody className="pre-scrollable">
            <Row className="justify-content-center">
              <div className="d-block justify-content-center text-center">
                <div>
                  <input
                      type="file"
                      accept="image/*"
                      onChange={event => this.setState(
                          {files: this.state.files.concat(Array.from(event.target.files))})}
                      multiple
                  />
                </div>
                <FileManager files={this.state.files}>
                  {this.uploadFiles}
                </FileManager>
              </div>
            </Row>
          </CardBody>
        </>
    );
  }
}

export default ImageUploadPopup;
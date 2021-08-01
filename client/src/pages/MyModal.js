import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "carbon-components-react";
import "bootstrap/dist/css/bootstrap.min.css";

function MyModal(props){

    return (<Modal  {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                     <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Energisers Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{props.header}</h4>
                    <p>
                      {props.body}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{
                        border: "0",
                        borderRadius: "10px",
                        textDecoration: "none",
                        fontSize: "1.3em",
                        background: "#ED4343",
                        textAlign: "center",
                      }} onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>);
}

export default MyModal;
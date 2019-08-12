import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import Header from "./Header";
import Jumbo from "./Jumbo";

interface StartProps {}

class Start extends React.Component<StartProps, {}> {
  public render(): JSX.Element {
    return (
      <Container>
        <Header />
        <Jumbo />
        <Row>
          <Col>
            <h3>Choose your network</h3>
            <p>Your address will get a network identifier for one of the following networks.</p>
          </Col>
        </Row>
        <Row>
          <Col className=""></Col>
          <Col className="col-4">
            <Link to="/testnet" className="btn btn-lg btn-block btn-primary">
              Testnet
            </Link>
            <p>All test networks like e.g. Lovenet</p>
          </Col>
          <Col className=""></Col>
          <Col className="col-4">
            <Link to="/mainnet" className="btn btn-lg btn-block btn-primary">
              Mainnet
            </Link>
            <p>The IOV main network</p>
          </Col>
          <Col className=""></Col>
        </Row>
      </Container>
    );
  }
}

export default Start;

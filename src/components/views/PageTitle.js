import React from "react";
import classNames from "classnames";
import { Col, Button, Row } from "shards-react";
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../../store/actions/auth";
import requireAuth from "../hoc/requireAuth";

const PageTitle = ({ title, signout, subtitle, className }) => {
  const classes = classNames(
    className,
    "text-center",
    "text-md-left",
    "mb-sm-0"
  );

  return (
    <Row style={{ width: "100%" }}>
      <Col xs="12" sm="6" md="6">
        <h3 className="page-title">{title}</h3>
        <span className=" page-subtitle">{subtitle}</span>
      </Col>

      <Col xs="12" sm="6" md="6">
        <Button
          style={{ float: "right" }}
          outline
          pill
          theme="info"
          onClick={() => signout()}
        >
          Log Out
        </Button>
      </Col>
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    signout: () => dispatch(signout()),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  requireAuth
)(PageTitle);

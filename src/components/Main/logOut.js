import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../../store/actions/auth";
import requireAuth from "../hoc/requireAuth";

const logOut = ({ signout }) => {
  return (
    <div>
      <button className="btn-switch" onClick={() => signout()}>
        Log out
      </button>
    </div>
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
)(logOut);

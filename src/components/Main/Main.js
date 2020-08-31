import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import Loader from "./Loader";

import DashboardOverview from "../views/DashboardOverview";

const Main = ({ auth }) => {
  return (
    <div>
      {!auth.isLoaded ? (
        <Loader />
      ) : !auth.isEmpty ? (
        <DashboardOverview />
      ) : (
        <Login />
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
  };
}

export default connect(mapStateToProps)(Main);

export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_COVID_DATA": {
      return action.payload;
    }

    default:
      return state;
  }
};

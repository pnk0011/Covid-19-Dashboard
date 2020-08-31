import covidData from "../../components/apis/covidapi";

export const fetchCovidData = () => async (dispatch) => {
  const response = await covidData.get();

  dispatch({
    type: "FETCH_COVID_DATA",
    payload: response.data,
  });
};

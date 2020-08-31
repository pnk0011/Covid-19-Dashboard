import React from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardBody, CardFooter } from "shards-react";
import Chart from "../utils/chart";

class CovidPieChart extends React.Component {
  componentDidMount() {
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    // console.log("pieChart " + this.props.dailyCovidData[0].deltadeaths);

    const chartConfig = {
      type: "pie",

      data: {
        datasets: [
          {
            hoverBorderColor: "#ffffff",
            data: [
              this.props.dailyCovidData[0].deltaconfirmed,
              this.props.dailyCovidData[0].deltarecovered,
              this.props.dailyCovidData[0].deltadeaths,
            ],
            backgroundColor: [
              "rgba(0,123,255,0.7)",
              "rgba(23,198,113,0.7)",
              "rgba(255,65,105,0.7)",
            ],
          },
        ],
        labels: ["Confirmed", "Recovered", "Deaths"],
        options: {
          ...{
            legend: {
              position: "bottom",
              labels: {
                padding: 25,
                boxWidth: 20,
              },
            },
            cutoutPercentage: 0,
            tooltips: {
              custom: false,
              mode: "index",
              position: "nearest",
            },
          },
          ...this.props.chartOptions,
        },
      },
    };
    new Chart(this.canvasRef.current, chartConfig);
  }
  render() {
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Today's Report</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        <CardFooter className="border-top text-center text-semibold text-light">
          <span className=" text-center"> Stay Home, Stay Safe!</span>
        </CardFooter>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return { dailyCovidData: state.graphDataReducer.statewise };
};
export default connect(mapStateToProps)(CovidPieChart);

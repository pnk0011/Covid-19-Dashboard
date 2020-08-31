import React from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardBody } from "shards-react";
import Chart from "../utils/chart";

class CovidBarGraph extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    const chartOptions = {
      ...{
        responsive: true,
        legend: {
          position: "top",
        },
        elements: {
          line: {
            tension: 0.3,
          },
          point: {
            radius: 0,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                callback(tick, index) {
                  return index % 7 !== 0 ? "" : tick;
                },
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                suggestedMax: 45,
                callback(tick) {
                  if (tick === 0) {
                    return tick;
                  }
                  // Format the amounts using Ks for thousands.
                  return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
                },
              },
            },
          ],
        },
        hover: {
          mode: "nearest",
          intersect: false,
        },
        tooltips: {
          custom: false,
          mode: "nearest",
          intersect: false,
        },
      },
      ...this.props.chartOptions,
    };
    var index,
      dailyConfirmed = [],
      dailyRecovered = [],
      dailyDeaths = [],
      dailyActive = [],
      datelabels = [];
    //console.log("insideBar " + this.props.dailyReportedCases.length);
    for (index = 0; index < this.props.dailyReportedCases.length; index++) {
      // console.log(this.props.dailyReportedCases[index]);
      dailyConfirmed.push(this.props.dailyReportedCases[index].dailyconfirmed);
      dailyRecovered.push(this.props.dailyReportedCases[index].dailyrecovered);
      dailyDeaths.push(this.props.dailyReportedCases[index].dailydeceased);
      datelabels.push(this.props.dailyReportedCases[index].date);
    }
    // console.log(dailyConfirmed,dailyDeaths);
    dailyConfirmed = dailyConfirmed.slice(
      Math.max(dailyConfirmed.length - 30, 0)
    );
    dailyDeaths = dailyDeaths.slice(Math.max(dailyDeaths.length - 30, 0));
    dailyRecovered = dailyRecovered.slice(
      Math.max(dailyRecovered.length - 30, 0)
    );
    datelabels = datelabels.slice(Math.max(datelabels.length - 30, 0));

    var chartData = {
      labels: datelabels,
      datasets: [
        {
          label: "Confirmed",
          fill: "start",
          data: dailyConfirmed,
          backgroundColor: "rgba(0,123,255,0.1)",
          borderColor: "rgba(0,123,255,1)",
          pointBackgroundColor: "#ffffff",
          pointHoverBackgroundColor: "rgb(0,123,255)",
          borderWidth: 1.5,
          pointRadius: 0,
          pointHoverRadius: 3,
        },
        {
          label: "Recovered",
          fill: "start",
          data: dailyRecovered,
          backgroundColor: "rgba(23,198,113,0.1)",
          borderColor: "rgba(23,198,113,1)",
          pointBackgroundColor: "#ffffff",
          pointHoverBackgroundColor: "rgb(23,198,113)",
          borderWidth: 1.5,
          pointRadius: 0,
          pointHoverRadius: 3,
        },
        {
          label: "Deaths",
          fill: "start",
          data: dailyDeaths,
          backgroundColor: "rgba(255,65,105,0.1)",
          borderColor: "rgba(255,65,105,1)",
          pointBackgroundColor: "#ffffff",
          pointHoverBackgroundColor: "rgba(255,65,105,1)",
          borderWidth: 1,
          pointRadius: 0,
          pointHoverRadius: 2,
          pointBorderColor: "rgba(255,65,105,1)",
        },
      ],
    };
    const BlogUsersOverview = new Chart(this.canvasRef.current, {
      type: "LineWithLine",
      data: chartData,
      options: chartOptions,
    });

    const buoMeta = BlogUsersOverview.getDatasetMeta(0);
    buoMeta.data[0]._model.radius = 0;
    buoMeta.data[chartData.datasets[0].data.length - 1]._model.radius = 0;

    BlogUsersOverview.render();
  }

  render() {
    const { title } = this.props;
    var height = "140";

    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="pt-0">
          <canvas
            height={height}
            ref={this.canvasRef}
            style={{ maxWidth: "100% !important" }}
          />
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return { dailyReportedCases: state.graphDataReducer.cases_time_series };
};
export default connect(mapStateToProps)(CovidBarGraph);

import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import PageTitle from "./PageTitle";
import SmallStats from "./SmallStats";
import CovidBarGraph from "./CovidBarGraph";
import CovidPieChart from "./CovidPieChart";
import { fetchCovidData } from "../../store/actions/graphData";
import "bootstrap/dist/css/bootstrap.min.css";
import "../shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

class DashboardOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      covidData: [
        {
          label: "Total Confirmed",
          value: "",
          increase: true,
          // chartLabels: [],
          attrs: { md: "6", sm: "6" },
          datasets: [
            {
              label: "Today",
              fill: "",
              borderWidth: 1.5,
              backgroundColor: "rgba(0, 184, 216, 0.1)",
              borderColor: "rgb(0, 184, 216)",
              data: [1, 3, 4, 5, 6, 8, 9],
            },
          ],
        },
        {
          label: "Active",
          value: "",
          percentage: "12.4",
          increase: true,
          chartLabels: [null, null, null, null, null, null, null],
          attrs: { md: "6", sm: "6" },
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: "rgba(23,198,113,0.1)",
              borderColor: "rgb(23,198,113)",
              data: [1, 3, 4, 5, 6, 8, 9],
            },
          ],
        },

        {
          label: "Recovered",
          value: "",
          percentage: "2.4%",
          increase: true,
          chartLabels: [null, null, null, null, null, null, null],
          attrs: { md: "4", sm: "6" },
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: "rgb(0,123,255,0.1)",
              borderColor: "rgb(0,123,255)",
              data: [3, 4, 5, 6, 7, 9, 7],
            },
          ],
        },
        {
          label: "Deaths",
          value: "29",
          // percentage: "2.71%",
          increase: true,
          chartLabels: [null, null, null, null, null, null, null],
          attrs: { md: "4", sm: "6" },
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: "rgba(255,65,105,0.1)",
              borderColor: "rgb(255,65,105)",
              data: [1, 2, 3, 4, 5, 8, 9, 8],
            },
          ],
        },
      ],
      callItOnce: false,
    };
    console.log("bro bro");
  }

  componentDidMount() {
    this.props.fetchCovidData();
  }

  componentDidUpdate() {
    if (this.state.callItOnce == false) {
      this.setState({
        covidData: [
          {
            label: "Total Confirmed",
            value: this.props.covidStats[0].confirmed,
            increase: true,
            chartLabels: [null, null, null, null, null, null, null],
            attrs: { md: "6", sm: "6" },
            datasets: [
              {
                label: "Today",
                fill: "start",
                borderWidth: 1.5,
                backgroundColor: "rgba(0, 184, 216, 0.1)",
                borderColor: "rgb(0, 184, 216)",
                data: [1, 3, 4, 5, 6, 8, 9],
              },
            ],
          },
          {
            label: "Active",
            value: this.props.covidStats[0].active,
            percentage: "12.4",
            increase: true,
            chartLabels: [null, null, null, null, null, null, null],
            attrs: { md: "6", sm: "6" },
            datasets: [
              {
                label: "Today",
                fill: "start",
                borderWidth: 1.5,
                backgroundColor: "rgba(23,198,113,0.1)",
                borderColor: "rgb(23,198,113)",
                data: [1, 3, 4, 5, 6, 8, 9],
              },
            ],
          },

          {
            label: "Recovered",
            value: this.props.covidStats[0].recovered,
            percentage: "2.4%",
            increase: true,
            chartLabels: [null, null, null, null, null, null, null],
            attrs: { md: "4", sm: "6" },
            datasets: [
              {
                label: "Today",
                fill: "start",
                borderWidth: 1.5,
                backgroundColor: "rgb(0,123,255,0.1)",
                borderColor: "rgb(0,123,255)",
                data: [1, 3, 4, 5, 6, 8, 9],
              },
            ],
          },
          {
            label: "Deaths",
            value: this.props.covidStats[0].deaths,
            percentage: "2.71%",
            increase: true,
            chartLabels: [null, null, null, null, null, null, null],
            attrs: { md: "4", sm: "6" },
            datasets: [
              {
                label: "Today",
                fill: "start",
                borderWidth: 1.5,
                backgroundColor: "rgba(255,65,105,0.1)",
                borderColor: "rgb(255,65,105)",
                data: [1, 3, 4, 5, 6, 8, 9],
              },
            ],
          },
        ],
      });
      this.setState({ callItOnce: true });
    }
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}

        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Overall Stats"
            subtitle="COVID-19 Tracker | INDIA"
            className="text-sm-left mb-3"
          />
        </Row>

        <Row>
          {this.state.covidData.map((stats, idx) => (
            <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
              <SmallStats
                id={`small-stats-${idx}`}
                variation="1"
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={stats.value}
              />
            </Col>
          ))}
        </Row>

        <Row>
          {/* Users Overview */}
          <Col lg="8" md="12" sm="12" className="mb-4">
            <CovidBarGraph />
          </Col>

          {/* Users by Device */}
          <Col lg="4" md="6" sm="12" className="mb-4">
            <CovidPieChart />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { covidStats: state.graphDataReducer.statewise };
};
export default connect(mapStateToProps, { fetchCovidData })(DashboardOverview);

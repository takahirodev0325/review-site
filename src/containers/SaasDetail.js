import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { Header } from '../components';
import { Saas } from '../modules';
import { UrlUtil } from '../utils';
import { SAAS } from '../config';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(1000 + theme.spacing.unit * 2 * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  pointText: {
    fontSize: 20,
    marginLeft: 10,
  },
});

class SaasDetail extends Component {
  state = {
    saas: '',
  };

  async componentDidMount() {
    const { history } = this.props;
    const snapshot = await Saas.sassInfoById(
      UrlUtil.baseUrl(history.location.pathname)
    );
    this.setState({ saas: snapshot.data() });
  }

  render() {
    const { history, classes } = this.props;
    const saas = this.state.saas;
    const data = [
      {
        subject: `${SAAS.RADAR.sales}: ${saas && saas.point.sales}`,
        value: `${saas && saas.point.sales}`,
      },
      {
        subject: `${SAAS.RADAR.support}: ${saas && saas.point.support}`,
        value: `${saas && saas.point.support}`,
      },
      {
        subject: `${SAAS.RADAR.recommendation}: ${saas &&
          saas.point.recommendation}`,
        value: `${saas && saas.point.recommendation}`,
      },
      {
        subject: `${SAAS.RADAR.utilization}: ${saas && saas.point.utilization}`,
        value: `${saas && saas.point.utilization}`,
      },
      {
        subject: `${SAAS.RADAR.satisfaction}: ${saas &&
          saas.point.satisfaction}`,
        value: `${saas && saas.point.satisfaction}`,
      },
    ];

    return (
      <React.Fragment>
        <Header history={history} />
        <CssBaseline />

        <main className={classes.layout}>
          <div className={classes.appBarSpacer} />
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12}>
              <Typography component="h1" variant="h4" className={classes.title}>
                {saas && saas.name}
              </Typography>
            </Grid>
            {saas && (
              <Grid item xs={12} sm={12}>
                <StarRatings
                  rating={saas.point.total}
                  starRatedColor="blue"
                  numberOfStars={5}
                  starDimension="30px"
                  starSpacing="2px"
                />
                <span className={classes.pointText}>{saas.point.total}</span>
              </Grid>
            )}
          </Grid>
          <Paper>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={7}>
                <RadarChart
                  height={300}
                  width={500}
                  cx={250}
                  cy={150}
                  data={data}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis
                    domain={[0, 5]}
                    angle={90}
                    tick={false}
                    tickCount={6}
                  />
                  <Radar
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography component="h1" variant="h6">
                  総合評価
                </Typography>
                {saas && (
                  <Grid item xs={12} sm={12}>
                    <StarRatings
                      rating={saas.point.total}
                      starRatedColor="blue"
                      numberOfStars={5}
                      starDimension="30px"
                      starSpacing="2px"
                    />
                    <span className={classes.pointText}>
                      {saas.point.total}
                    </span>
                    <Typography>
                      回答者: {saas && saas.numOfReviews}人
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SaasDetail);

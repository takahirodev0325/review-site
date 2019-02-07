import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import withStyle from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Authentication from '../modules';
import { SCALE, SERVICE_TYPE, DEPARTMENT, POSITION } from '../config';

const styles = theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    minWidth: 200,
    fontSize: 18,
  },
  formControl: {
    minWidth: 200,
  },
});

class MemberInfo extends Component {
  state = {
    name: '',
    company: '',
    scale: 0,
    serviceType: 0,
    department: 0,
    position: 0,
  };
  render() {
    const { classes, email, password } = this.props;

    const info = {
      email: email,
      password: password,
      name: this.state.name,
      company: this.state.company,
      scale: this.state.scale,
      serviceType: this.state.serviceType,
      department: this.state.department,
      position: this.state.position,
    };

    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="ユーザー名"
              fullWidth
              autoComplete="fname"
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" gutterBottom>
              会社情報
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="会社名"
              fullWidth
              autoComplete="lname"
              value={this.state.company}
              onChange={event => this.setState({ company: event.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required className={classes.formControl}>
              <InputLabel>会社規模</InputLabel>
              <Select
                value={this.state.scale}
                onChange={event => this.setState({ scale: event.target.value })}
              >
                {SCALE.map((element, index) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {element}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required className={classes.formControl}>
              <InputLabel>業種</InputLabel>
              <Select
                value={this.state.serviceType}
                onChange={event =>
                  this.setState({ serviceType: event.target.value })
                }
              >
                {SERVICE_TYPE.map((element, index) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {element}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required className={classes.formControl}>
              <InputLabel>部署</InputLabel>
              <Select
                value={this.state.department}
                onChange={event =>
                  this.setState({ department: event.target.value })
                }
              >
                {DEPARTMENT.map((element, index) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {element}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required className={classes.formControl}>
              <InputLabel>役職</InputLabel>
              <Select
                value={this.state.position}
                onChange={event =>
                  this.setState({ position: event.target.value })
                }
              >
                {POSITION.map((element, index) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {element}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => Authentication.signupWithEmail(info)}
            className={classes.button}
          >
            送信
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyle(styles)(MemberInfo);

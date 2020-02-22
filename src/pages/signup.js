import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

//Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

//Material UI
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Misc Imports
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import TextField from '@material-ui/core/TextField';

const styles = {
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto 20px auto'
  },
  pageTitle: {
    margin: '10px auto 20px auto'
  },
  textField: {
    margin: '10px auto 20px auto'
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    position: "relative"
  },
  customError: {
    color: 'red',
    fontSize: '.8rem'
  },
  progress: {
    position: "absolute"
  }
}

class signup extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      errors: []
    };
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    }
    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { classes, UI: { loading } } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img src={AppIcon} alt="Monkey head" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField 
              id="email" 
              name="email" 
              type="email" 
              label="Email" 
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField 
              id="password" 
              name="password" 
              type="password" 
              label="Password" 
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password" 
              label="Confirm Password" 
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField 
              id="handle" 
              name="handle" 
              type="handle" 
              label="Handle" 
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button type="submit" variant='contained' color="primary" className={classes.button} disabled={loading} >
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
          </form>
          <small>Already have an account? Login <Link to='/login'>HERE</Link></small>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    )
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));
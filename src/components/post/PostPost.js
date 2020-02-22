import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//Redux
import { connect } from 'react-redux';
import { postPost, clearErrors } from '../../redux/actions/dataActions';

//Components
import MyButton from '../../util/MyButton';

//Material UI
import ToolTip from '@material-ui/core/ToolTip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress'

//Icons
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  ...theme.palette.primary,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '4%'
  }
});



class PostPost extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if( !nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', open: false, errors: {} })
    }
  };

  handleOpen = () => {
    this.setState({ open: true })
  };

  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false })
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.postPost({ body: this.state.body });
    this.handleClose();
  }

  render() {
    const { errors } = this.state
    const { classes, UI: { loading } } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post">
          <AddIcon color="primary"/>
        </MyButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
            <CloseIcon/>
          </MyButton>
          <DialogTitle>Post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField name="body" type="text" label="Post" multiline rows="3" error={errors.body ? true : false} helperText={errors.body} className={classes.textField} onChange={this.handleChange} fullWidth/>
              <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                Submit
                {loading && (
                  <CircularProgress size={30} className={classes.progressSpinner} />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
};

const mapStateToProps = (state) => ({
  UI: state.UI
})

PostPost.propTypes = {
  postPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  
}

export default connect(mapStateToProps, { postPost, clearErrors })(withStyles(styles)(PostPost));

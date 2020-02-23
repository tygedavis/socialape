import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

//Redux
import { connect } from 'react-redux';
import { deletePost, getPosts } from '../../redux/actions/dataActions';

//Components
import MyButton from '../../util/MyButton';

//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

const styles = {
  deleteButton: {
    position: 'absolute',
    top: '10%',
    left: '90%'
  }
}

class DeletePost extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true })
  };

  handleClose = () => {
    this.setState({ open: false })
  };

  deletePost = () => {
    this.props.deletePost(this.props.postId);
    this.setState({ open: false })
    this.props.getPosts();
  };

  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <MyButton tip="Delete" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
          <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deletePost} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
};

DeletePost.propTypes = {
  deletePost: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

export default connect(null, { deletePost, getPosts })(withStyles(styles)(DeletePost))

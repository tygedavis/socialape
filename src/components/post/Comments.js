import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//DayJS
import dayjs from 'dayjs';

const styles = theme => ({
  ...theme.palette.primary,
  commentImage: {
    width: '100%',
    maxWidth: '135%',
    minWidth: '25%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  commentData: {
    marginLeft: 45,
    minWidth: '100%'
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  typography: {
    useNextVariants: true
  }
});

class Comments extends Component{
  render() {
    const { comments, classes } = this.props;
    return (
      <Grid>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <>
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img src={userImage} alt="comment" className={classes.commentImage} /> 
                  </Grid>
                  <Grid itme sm={9}>
                    <div className={classes.commentData}>
                      <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1">
                        {body}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
            </>
          )
        })}
      </Grid>
    )
  }

}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//DayJS
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//Redux
import { connect } from 'react-redux';

//Components
import MyButton from '../../util/MyButton';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import LikeButton from './LikeButton';

//Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

//Icons
import ChatIcon from '@material-ui/icons/Chat';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
}

class Post extends Component {
  render() {
    const { classes, post : { body, createdAt, userImage, userHandle, postId, likeCount, commentCount }, user: { authenticated, credentials: { handle} } } = this.props;

    dayjs.extend(relativeTime);

    const deleteButton = authenticated && userHandle === handle ? (
      <DeletePost postId={postId} />
    ) : null

    return (
      <Card className={classes.card}>
        <CardMedia image={userImage} title="Profile Image" className={classes.image}/>
        <CardContent className={classes.content}>
          <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton postId={postId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="Comment">
            <ChatIcon color="primary"/>
          </MyButton>
          <span>{commentCount} Comments</span>
          <PostDialog postId={postId} userHandle={userHandle} openDialog={this.props.openDialog} />
        </CardContent>    
      </Card>
    )
  }
};

Post.propType = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapActionsToProps = {
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));

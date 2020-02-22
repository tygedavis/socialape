import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//Redux
import { connect } from 'react-redux';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//Icons
import HomeIcon from '@material-ui/icons/Home';

//Components
import MyButton from '../../util/MyButton';
import PostPost from '../post/PostPost';
import NotificationsIcon from './Notifications';


const useStyles = makeStyles({
  navContainer: {
    justifyContent: "center"
  }
})

class Navbar extends Component {
  render() {
    const { authenticated } = this.props
    return (
      <>
        <AppBar>
          <Toolbar className='nav-container'>
            {authenticated ? (
              <>
                <PostPost />
                <Link to="/">
                  <MyButton tip="Home">
                    <HomeIcon/>
                  </MyButton>
                </Link>
                <NotificationsIcon/>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to='/' >Home</Button>
                <Button color="inherit" component={Link} to='/login' >Login</Button>
                <Button color="inherit" component={Link} to='/signup' >Signup</Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </>
    );
  }
};

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);
import { withStyles } from '@material-ui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import sizes from '../helpers/sizes';
import PaletteMetaForm from './NewPaletteForm/PaletteMetaForm';

const drawerWidth = 400;
const styles = {
  root: {
    display: 'flex'
  },
  navBtns: {
    marginRight: '1rem',
    '& a': {
      textDecoration: 'none'
    },
    [sizes.down('xs')]: {
      marginRight: '0.5rem'
    }
  },
  button: {
    margin: '0 0.5rem !important',
    [sizes.down('xs')]: {
      margin: '0 0.2rem !important',
      padding: '0.3rem !important'
    }
  }
};
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  height: '64px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = { newPaletteName: '', formShowing: false };
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  showForm = () => {
    this.setState({ formShowing: true });
  };

  hideForm = () => {
    this.setState({ formShowing: false });
  };

  render() {
    const { open, palettes, handleSubmit, classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position='fixed' color='default' open={open}>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={this.props.handleDrawerOpen}
              edge='start'
              sx={{ mr: 2, ...(open && { display: 'none' }) }}>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap component='div'>
              Create A Palette
            </Typography>
          </Toolbar>

          <div className={classes.navBtns}>
            {/* Save Palette Form */}
            <Link to='/' style={{ textDecoration: 'none' }}>
              <Button variant='contained' color='secondary' className={classes.button}>
                Go Back
              </Button>
            </Link>
            <Button
              variant='contained'
              color='primary'
              onClick={this.showForm}
              className={classes.button}>
              Save
            </Button>
          </div>
        </AppBar>
        {this.state.formShowing && (
          <PaletteMetaForm
            palettes={palettes}
            handleSubmit={handleSubmit}
            hideForm={this.hideForm}
          />
        )}
      </div>
    );
  }
}
export default withStyles(styles)(PaletteFormNav);

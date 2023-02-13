import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { Component } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import { Link } from 'react-router-dom';

const drawerWidth = 400;
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
    this.state = { newPaletteName: '' };
  }
  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }
  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };
  render() {
    const { open } = this.props;
    const { newPaletteName } = this.state;
    return (
      <div>
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

          {/* Save Palette Form */}
          <div>
            <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
              <TextValidator
                label='Palette Name'
                value={this.state.newPaletteName}
                name='newPaletteName'
                onChange={this.handleChange}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['Enter Palette Name', 'Name already used']}
              />
              <Button variant='contained' color='primary' type='submit'>
                Save Palette
              </Button>
            </ValidatorForm>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <Button variant='contained' color='secondary'>
                Go Back
              </Button>
            </Link>
          </div>
        </AppBar>
      </div>
    );
  }
}
export default PaletteFormNav;

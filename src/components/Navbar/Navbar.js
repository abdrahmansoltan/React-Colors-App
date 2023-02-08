import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import React, { Component } from 'react';
import './Navbar.css';
// Material UI
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { format: 'hex', open: false };
  }
  handleFormatChange = event => {
    this.setState({ format: event.target.value, open: true });
    this.props.handleChange(event.target.value);
  };
  closeSnackbar = () => {
    this.setState({ open: false });
  };

  render() {
    const { level, changeLevel } = this.props;
    const { format, open } = this.state;
    const SnackbarActionEl = (
      <React.Fragment>
        <IconButton
          size='small'
          key='close'
          aria-label='close'
          color='inherit'
          onClick={this.closeSnackbar}>
          <CloseIcon fontSize='small' />
        </IconButton>
      </React.Fragment>
    );

    return (
      <header className='Navbar'>
        <div className='logo'>
          <Link to='/'>React Colors</Link>
        </div>
        <div className='slider-container'>
          <span>Level: {level}</span>
          <div className='slider'>
            <Slider defaultValue={level} min={100} max={900} step={100} onChange={changeLevel} />
          </div>
        </div>

        <div className='select-container'>
          <FormControl className='FormControl' sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id='demo-simple-select-autowidth-label'>Format</InputLabel>
            <Select
              className='select-input'
              labelId='demo-simple-select-autowidth-label'
              id='demo-simple-select-autowidth'
              value={format}
              onChange={this.handleFormatChange}
              autoWidth
              label='Format'>
              <MenuItem value='hex'>HEX - #FFFFFF</MenuItem>
              <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
              <MenuItem value='rgba'>RGBA - rgba(255,255,255, 1.0)</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={this.closeSnackbar}
          message={<span id='message-id'>Format Changed To {format.toUpperCase()}</span>}
          action={SnackbarActionEl}
        />
      </header>
    );
  }
}
export default Navbar;

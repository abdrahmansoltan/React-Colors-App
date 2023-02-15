import sizes from '../../helpers/sizes';

export default {
  Navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '6vh'
  },
  logo: {
    marginRight: '15px',
    padding: '0 13px',
    fontSize: '22px',
    backgroundColor: '#eceff1',
    fontFamily: 'Roboto',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '& a': {
      textDecoration: 'none',
      color: 'black'
    },
    [sizes.down('xs')]: {
      display: 'none'
    }
  },
  sliderContainer: {
    [sizes.down('xs')]: {
      paddingLeft: '13px'
    }
  },
  slider: {
    width: '340px',
    margin: '0 10px',
    display: 'inline-block',
    // override Material UI styles
    '& .rc-slider-track': {
      backgroundColor: 'transparent'
    },
    '& .rc-slider-rail': {
      height: '8px'
    },
    '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus,.rc-slider-handle:hover':
      {
        backgroundColor: 'green',
        outline: 'none',
        border: '2px solid green',
        boxShadow: 'none',
        width: '13px',
        height: '13px',
        marginLeft: '-7px',
        marginTop: '-3px'
      },
    [sizes.down('sm')]: {
      width: '150px'
    }
  },
  selectContainer: {
    marginLeft: 'auto',
    marginRight: '0.5rem',
    '& .MuiSelect-select': {
      paddingTop: '6px !important',
      paddingBottom: '4px !important'
    }
  }
};

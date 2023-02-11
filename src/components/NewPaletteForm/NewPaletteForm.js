import { withStyles } from '@material-ui/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { ChromePicker } from 'react-color';
import DraggableColorBox from '../DraggableColorBox/DraggableColorBox';

const styles = {
  picker: {
    width: '100% !important',
    marginTop: '2rem'
  },
  addColor: {
    width: '100%',
    padding: '1rem',
    marginTop: '1rem',
    fontSize: '2rem'
  },
  buttonsContainer: {
    paddingTop: '1rem',
    display: 'flex',
    justifyContent: 'space-around'
  }
};

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  height: 'calc(100vh - 64px)',
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

const NewPaletteForm = ({ classes }) => {
  const [open, setOpen] = React.useState(true);
  const [currentColor, setCurrentColor] = React.useState('teal');
  const [colors, setColors] = React.useState(['red', 'blue']);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrentColor = newColor => {
    setCurrentColor(newColor.hex);
  };

  const addNewColor = () => {
    setColors([...colors, currentColor]);
    console.log(colors);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Create A Palette
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant='persistent'
        anchor='left'
        open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* Drawer Content */}
        <Typography variant='h4' align='center'>
          Design Your Palette
        </Typography>
        <div className={classes.buttonsContainer}>
          <Button variant='contained' color='secondary'>
            Clear Palette
          </Button>
          <Button variant='contained' color='primary'>
            Random Color
          </Button>
        </div>
        <ChromePicker
          color={currentColor}
          className={classes.picker}
          onChangeComplete={newColor => updateCurrentColor(newColor)}
        />
        <Button
          variant='contained'
          color='primary'
          style={{ backgroundColor: currentColor }}
          className={classes.addColor}
          onClick={addNewColor}>
          Add Color
        </Button>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        {colors.map(color => (
          <DraggableColorBox color={color} />
        ))}
      </Main>
    </Box>
  );
};

export default withStyles(styles)(NewPaletteForm);

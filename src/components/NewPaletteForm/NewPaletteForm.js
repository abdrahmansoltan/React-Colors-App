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
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import DraggableColorBox from '../DraggableColorBox/DraggableColorBox';

const styles = {
  buttonsContainer: {
    paddingTop: '1rem',
    display: 'flex',
    justifyContent: 'space-around'
  },
  picker: {
    width: '100% !important',
    marginTop: '2rem'
  },
  addColor: {
    width: '100%',
    marginTop: '1rem !important',
    fontSize: '2rem !important'
  },
  colorNameInput: {
    width: '100%'
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

const NewPaletteForm = ({ classes, savePalette, palettes, history }) => {
  const formRef = React.useRef('form');
  // State
  const [open, setOpen] = React.useState(true);
  const [currentColor, setCurrentColor] = React.useState('teal');
  const [colors, setColors] = React.useState([{ color: 'blue', name: 'blue' }]);
  const [newColorName, setNewColorName] = React.useState('');
  const [newPaletteName, setNewPaletteName] = React.useState('');

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
    const newColor = {
      color: currentColor,
      name: newColorName
    };
    setColors([...colors, newColor]);
    setNewColorName('');
  };

  const handleChange = event => {
    if (event.target.name === 'newColorName') {
      setNewColorName(event.target.value);
    }
    if (event.target.name === 'newPaletteName') {
      setNewPaletteName(event.target.value);
    }
  };

  const handleSubmit = () => {
    let newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, '-'),
      colors: colors
    };

    savePalette(newPalette);
    history.push('/');
  };

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', value =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );
    ValidatorForm.addValidationRule('isColorUnique', value =>
      colors.every(({ color }) => color !== currentColor)
    );
    ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
      palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
    );
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' color='default' open={open}>
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

          {/* Save Palette Form */}
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              label='Palette Name'
              value={newPaletteName}
              name='newPaletteName'
              onChange={handleChange}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={['Enter Palette Name', 'Name already used']}
            />
            <Button variant='contained' color='primary' type='submit'>
              Save Palette
            </Button>
          </ValidatorForm>
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
        <ValidatorForm onSubmit={addNewColor} ref={formRef}>
          <TextValidator
            value={newColorName}
            name='newColorName'
            onChange={handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'Enter a color name',
              'Color name must be unique',
              'Color already used!'
            ]}
            className={classes.colorNameInput}
          />
          <Button
            variant='contained'
            type='submit'
            color='primary'
            className={classes.addColor}
            style={{ backgroundColor: currentColor }}>
            Add Color
          </Button>
        </ValidatorForm>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        {colors.map(color => (
          <DraggableColorBox key={color.name} color={color.color} name={color.name} />
        ))}
      </Main>
    </Box>
  );
};

export default withStyles(styles)(NewPaletteForm);

import { withStyles } from '@material-ui/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { ChromePicker } from 'react-color';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';
import DraggableColorList from '../DraggableColorList';
import PaletteFormNav from '../PaletteFormNav';

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
  const [colors, setColors] = React.useState(palettes[0].colors);
  const [newColorName, setNewColorName] = React.useState('');

  // Constants
  const defaultProps = {
    maxColors: 20
  };
  const paletteIsFull = colors.length >= defaultProps.maxColors;

  // Methods
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
  };

  const handleSubmit = newPaletteName => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, '-'),
      colors: colors
    };

    savePalette(newPalette);
    history.push('/');
  };

  const removeColor = colorName => {
    setColors(colors.filter(color => color.name !== colorName));
  };

  const clearColors = () => {
    setColors([]);
  };
  const addRandomColor = () => {
    //pick random color from existing palettes
    const allColors = palettes.map(p => p.colors).flat();
    const rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    setColors([...colors, randomColor]);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
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
      <PaletteFormNav
        open={open}
        classes={classes}
        palettes={palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
      />

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
          <Button variant='contained' color='secondary' onClick={clearColors}>
            Clear Palette
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={addRandomColor}
            disabled={paletteIsFull}>
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
            style={{
              backgroundColor: paletteIsFull ? 'grey' : currentColor
            }}
            disabled={paletteIsFull}>
            {paletteIsFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis='xy'
          onSortEnd={onSortEnd}
          pressDelay={160}
        />
      </Main>
    </Box>
  );
};

export default withStyles(styles)(NewPaletteForm);

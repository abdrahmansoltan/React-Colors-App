import { withStyles } from '@material-ui/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import seedColors from '../../models/seedColors';
import ColorPickerForm from '../ColorPickerForm';
import DraggableColorList from '../DraggableColorList';
import PaletteFormNav from '../PaletteFormNav';

const styles = {
  container: {
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto'
  },
  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  button: {
    width: '45%'
  }
};
const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  height: 'calc(100vh - 80px)',
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
  // State
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(seedColors[0].colors);

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

  const addNewColor = newColor => {
    setColors([...colors, newColor]);
  };

  const handleSubmit = palette => {
    const newPalette = {
      paletteName: palette.paletteName,
      emoji: palette.emoji,
      id: palette.paletteName.toLowerCase().replace(/ /g, '-'),
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

  return (
    <Box sx={{ display: 'flex' }}>
      <PaletteFormNav
        open={open}
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
        <div className={classes.container}>
          <Typography variant='h4' align='center' gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
              onClick={clearColors}>
              Clear Palette
            </Button>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={addRandomColor}
              disabled={paletteIsFull}>
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            addNewColor={addNewColor}
            colors={colors}
          />
        </div>
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

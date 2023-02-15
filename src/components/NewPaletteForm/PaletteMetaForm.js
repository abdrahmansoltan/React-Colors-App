import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

export default function PaletteMetaForm({ palettes, handleSubmit, hideForm }) {
  const [stage, setStage] = useState('form');
  const [newPaletteName, setNewPaletteName] = useState('');

  const handleChange = event => {
    setNewPaletteName(event.target.value);
  };

  const showEmojiPicker = () => {
    setStage('emoji');
  };

  const savePalette = emoji => {
    const newPalette = {
      paletteName: newPaletteName,
      emoji: emoji.native
    };
    handleSubmit(newPalette);
    setStage('');
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
      palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
    );
  });

  return (
    <div>
      <Dialog open={stage === 'emoji'} onClose={hideForm}>
        <DialogTitle>Choose a Palette Emoji</DialogTitle>
        <Picker data={data} onEmojiSelect={savePalette} />
      </Dialog>

      <Dialog open={stage === 'form'} onClose={hideForm}>
        <DialogTitle>Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new palette. Make sure it's unique!
            </DialogContentText>
          </DialogContent>
          <div style={{ padding: '10px 24px' }}>
            <TextValidator
              label='Palette Name'
              value={newPaletteName}
              name='newPaletteName'
              onChange={handleChange}
              fullWidth
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={['Enter Palette Name', 'Name already used']}
            />
          </div>
          <DialogActions style={{ margin: '0 1rem' }}>
            <Button onClick={hideForm}>Cancel</Button>
            <Button variant='contained' color='primary' type='submit'>
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}

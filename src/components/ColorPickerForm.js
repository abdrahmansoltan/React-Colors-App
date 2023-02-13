import { withStyles } from '@material-ui/styles';
import { Button } from '@mui/material';
import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

const styles = {
  picker: {
    width: '100% !important',
    marginTop: '2rem'
  },
  colorNameInput: {
    width: '100%',
    height: '70px'
  },
  addColor: {
    width: '100%',
    padding: '1rem !important',
    marginTop: '1rem !important',
    fontSize: '2rem !important'
  }
};

class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = { currentColor: 'teal', newColorName: '' };
  }
  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', value =>
      this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );
    ValidatorForm.addValidationRule('isColorUnique', value =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    );
  }
  updateCurrentColor = newColor => {
    this.setState({ currentColor: newColor.hex });
  };
  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };
  handleSubmit = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.props.addNewColor(newColor);
    this.setState({ newColorName: '' });
  };

  render() {
    const { paletteIsFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;

    return (
      <div style={{ width: '100%' }}>
        <ChromePicker
          color={currentColor}
          className={classes.picker}
          onChangeComplete={this.updateCurrentColor}
        />
        <ValidatorForm onSubmit={this.handleSubmit} ref='form'>
          <TextValidator
            value={newColorName}
            name='newColorName'
            placeholder='Color Name'
            variant='filled'
            margin='normal'
            onChange={this.handleChange}
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
            disabled={paletteIsFull}
            className={classes.addColor}
            style={{
              backgroundColor: paletteIsFull ? 'grey' : currentColor
            }}>
            {paletteIsFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}
export default withStyles(styles)(ColorPickerForm);

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import React, { Component } from 'react';
import ColorBox from '../ColorBox/ColorBox';
import './Palette.css';

export class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500 };
  }
  changeLevel = level => {
    this.setState({ level }); // 100 -> 900 with (100 step)
  };
  render() {
    const colorBoxes = this.props.palette.colors[this.state.level].map(color => (
      <ColorBox background={color.hex} name={color.name} />
    ));
    return (
      <div className='Palette'>
        <div className='slider'>
          <Slider
            defaultValue={this.state.level}
            min={100}
            max={900}
            step={100}
            onChange={this.changeLevel}
          />
        </div>
        <div className='Palette-colors'>{colorBoxes}</div>
      </div>
    );
  }
}

export default Palette;

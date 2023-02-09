import React, { Component } from 'react';
import ColorBox from '../ColorBox/ColorBox';
import Navbar from '../Navbar/Navbar';
import PaletteFooter from '../PaletteFooter/PaletteFooter';
import './Palette.css';

export class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: 'hex' };
  }
  changeLevel = level => {
    this.setState({ level }); // 100 -> 900 with (100 step)
  };
  changeFormat = val => {
    this.setState({ format: val });
  };

  render() {
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { level, format } = this.state;

    const colorBoxes = colors[level].map(color => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.id}
        moreUrl={`/palette/${id}/${color.id}`}
        showingFullPalette
      />
    ));
    return (
      <div className='Palette'>
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          showingAllColors
        />

        <div className='Palette-colors'>{colorBoxes}</div>

        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default Palette;

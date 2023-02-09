import React, { Component } from 'react';
import ColorBox from '../ColorBox/ColorBox';
import Navbar from '../Navbar/Navbar';
import PaletteFooter from '../PaletteFooter/PaletteFooter';

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId); // this won't change so no need to be in a state + won't call the expensive-method on each render
    this.state = { format: 'hex' };
  }

  // helper method (returns all shades of a given color)
  gatherShades(palette, colorToFilterBy) {
    let shades = [];
    let allColors = palette.colors;

    // find colors that match the colorId inside current palette
    for (let key in allColors) {
      shades = shades.concat(allColors[key].filter(color => color.id === colorToFilterBy));
    }
    //return all shades of given color
    return shades.slice(1);
  }

  changeFormat = val => {
    this.setState({ format: val });
  };

  render() {
    const { format } = this.state;
    const { paletteName, emoji } = this.props.palette;
    const colorBoxes = this._shades.map(color => (
      <ColorBox key={color.id} name={color.name} background={color[format]} showLink={false} />
    ));

    return (
      <div className='Palette'>
        <Navbar handleChange={this.changeFormat} showingAllColors={false} />

        <div className='Palette-colors'>{colorBoxes}</div>
        
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
export default SingleColorPalette;

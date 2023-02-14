import { withStyles } from '@material-ui/styles';
import { Button } from '@mui/material';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from '../MiniPalette/MiniPalette';
import styles from './PaletteList.styles';

class PaletteList extends Component {
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  render() {
    const { palettes, classes, deletePalette } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
            <Link to='/palette/new'>Create Palette</Link>
          </nav>
          {palettes.length > 0 ? (
            <div className={classes.palettes}>
              {palettes.map(palette => (
                <MiniPalette
                  key={palette.id}
                  {...palette}
                  handleClick={() => this.goToPalette(palette.id)}
                  handleDelete={deletePalette}
                />
              ))}
            </div>
          ) : (
            <Button
              variant='contained'
              color='primary'
              className={classes.addColor}
              onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          )}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(PaletteList);

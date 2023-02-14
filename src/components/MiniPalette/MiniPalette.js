import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import styles from './MiniPalette.styles';

function MiniPalette(props) {
  const { classes, paletteName, id, emoji, colors, handleDelete } = props;

  const deletePalette = e => {
    e.stopPropagation(); // to prevent triggering the click event on the miniPalette
    handleDelete(id);
  };

  const miniColorBoxes = colors.map(color => (
    <div className={classes.miniColor} style={{ backgroundColor: color.color }} key={color.name} />
  ));

  return (
    <div className={classes.root} onClick={props.handleClick}>
      <div onClick={deletePalette}>
        <DeleteIcon className={classes.deleteIcon} style={{ transition: 'all 0.3s ease-in-out' }} />
      </div>
      {/* container for mini color boxes grid */}
      <div className={classes.colors}>{miniColorBoxes}</div>

      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette); // this enable component to have a "classes" prop

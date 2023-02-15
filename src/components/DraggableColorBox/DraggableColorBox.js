import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import chroma from 'chroma-js';
import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import sizes from '../../helpers/sizes';

const styles = {
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    [sizes.down('lg')]: {
      width: '25%',
      height: '20%'
    },
    [sizes.down('md')]: {
      width: '50%',
      height: '10%'
    },
    [sizes.down('sm')]: {
      width: '100%',
      height: '5%'
    }
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
    padding: '10px',
    color: props =>
      chroma(props.color).luminance() <= 0.25 ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  deleteIcon: {
    color: props =>
      chroma(props.color).luminance() <= 0.25 ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
    letterSpacing: '1px',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.5)'
    }
  }
};

const DraggableColorBox = SortableElement(props => {
  const { classes, handleClick, name, color } = props;

  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span> {name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
      </div>
    </div>
  );
});
export default withStyles(styles)(DraggableColorBox);

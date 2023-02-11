import { withStyles } from '@material-ui/styles';
import React from 'react';

const styles = {
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px'
  }
};

function DraggableColorBox(props) {
  return (
    <div className={props.classes.root} style={{ backgroundColor: props.color }}>
      {props.name}
    </div>
  );
}
export default withStyles(styles)(DraggableColorBox);

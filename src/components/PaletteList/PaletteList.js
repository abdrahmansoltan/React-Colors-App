import { withStyles } from '@material-ui/styles';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MiniPalette from '../MiniPalette/MiniPalette';
import styles from './PaletteList.styles';

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      deletingId: ''
    };
  }

  goToPalette = id => {
    this.props.history.push(`/palette/${id}`);
  };
  openDialog = id => {
    this.setState({ openDeleteDialog: true, deletingId: id });
  };
  closeDialog = () => {
    this.setState({ openDeleteDialog: false, deletingId: '' });
  };
  handleDelete = () => {
    this.props.deletePalette(this.state.deletingId);
    this.closeDialog();
  };

  render() {
    const { palettes, classes, deletePalette } = this.props;
    const { openDeleteDialog, deletingId } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Colors</h1>
            <Link to='/palette/new'>Create Palette</Link>
          </nav>
          {palettes.length > 0 ? (
            <TransitionGroup className={classes.palettes}>
              {palettes.map(palette => (
                <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                  <MiniPalette
                    key={palette.id}
                    {...palette}
                    handleClick={() => this.goToPalette(palette.id)}
                    // handleDelete={deletePalette}
                    openDialog={this.openDialog}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
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

        <Dialog
          open={openDeleteDialog}
          aria-labelledby='delete-dialog-title'
          onClose={this.closeDialog}>
          <DialogTitle id='delete-dialog-title'>Delete This Palette?</DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Delete' />
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Cancel' />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(PaletteList);

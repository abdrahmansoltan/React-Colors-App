import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import styles from './ColorBox.styles';

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { isCopied: false };
  }
  changeCopyState = () => {
    this.setState({ isCopied: true });
    setTimeout(() => {
      this.setState({ isCopied: false });
    }, 1500);
  };
  render() {
    const { name, background, moreUrl, showingFullPalette, classes } = this.props;

    return (
      <CopyToClipboard text={background.toUpperCase()} onCopy={this.changeCopyState}>
        <div style={{ background }} className={classes.ColorBox}>
          {/* copy-overlay & message */}
          <div
            style={{ background }}
            className={`${classes.copyOverlay} ${this.state.isCopied && classes.showOverlay}`}
          />
          <div className={`${classes.copyMessage} ${this.state.isCopied && classes.showMessage}`}>
            <h1>copied!</h1>
            <p className={classes.copyText}>{this.props.background}</p>
          </div>

          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {/* conditional "See More" link */}
          {showingFullPalette && (
            <Link to={moreUrl} onClick={e => e.stopPropagation()}>
              <span className={classes.seeMore}>MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);

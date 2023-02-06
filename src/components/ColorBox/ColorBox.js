import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.css';

export default class ColorBox extends Component {
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
    const { name, background } = this.props;
    return (
      <CopyToClipboard text={background.toUpperCase()} onCopy={this.changeCopyState}>
        <div style={{ background }} className='ColorBox'>
          {/* copy-overlay & message */}
          <div style={{ background }} className={`copy-overlay ${this.state.isCopied && 'show'}`} />
          <div className={`copy-msg ${this.state.isCopied && 'show'}`}>
            <h1>copied!</h1>
            <p>{background}</p>
          </div>

          <div className='copy-container'>
            <div className='box-content'>
              <span>{name}</span>
            </div>
            <button className='copy-button'>Copy</button>
          </div>
          <span className='see-more'>More</span>
        </div>
      </CopyToClipboard>
    );
  }
}

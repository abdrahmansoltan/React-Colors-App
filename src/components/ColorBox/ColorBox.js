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

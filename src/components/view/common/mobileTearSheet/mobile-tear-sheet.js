import { getImageForEnv } from 'static/images/index'

let React = require('react');

let MobileTearSheet = React.createClass({

  propTypes: {
    height: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      height: 500
    };
  },

  render() {

    let styles = {
      root: {
        marginTop: 10,
        marginBottom: 24,
        marginRight: 24,
        maxWidth: 360

      },

      container: {
        border: 'solid 1px #d9d9d9',
        borderBottom: 'none',
        height: this.props.height,
        overflow: 'hidden'
      },

      bottomTear: {
        display: 'block',
        position: 'relative',
        marginTop: -10,
        width: 360
      }
    };

    const bottomTearImage = getImageForEnv('bottom-tear.svg');

    return (
      <div style={styles.root}>
        <div style={styles.container}>
          {this.props.children}
        </div>
        <img style={styles.bottomTear} src={bottomTearImage} />
      </div>
    );
  }

});

export default MobileTearSheet;
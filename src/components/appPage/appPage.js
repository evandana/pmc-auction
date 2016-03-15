// Libraries
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../../actions/App';

function mapStateToProps(state) {
    return {
        app: state.app
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(AppActions, dispatch);
}

class App extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        children: PropTypes.element.isRequired
    };

    render () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(App);

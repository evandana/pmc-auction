import {Dispatcher} from 'flux';
let AppDispatcher = new Dispatcher();

AppDispatcher.handleViewAction = function(action) {
    this.dispatch({
        source: 'VIEW_ACTION',
        action: action
    });
};

AppDispatcher.handleDataAction = function(action) {
  this.dispatch({
    source: 'DATA_ACTION',
    action: action
  });
}

export default AppDispatcher;

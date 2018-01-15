import { connect } from 'react-redux';
import View from 'components/view/Results';

const mapStateToProps = (state) => {
    return {};
};

const ResultsController = connect(
    mapStateToProps,
)(View);

export default ResultsController;
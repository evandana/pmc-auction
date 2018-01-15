import { connect } from 'react-redux';
import View from 'components/view/DonorInfo';

const mapStateToProps = (state) => {
    return {};
};

const DonorInfoController = connect(
    mapStateToProps,
)(View);

export default DonorInfoController;
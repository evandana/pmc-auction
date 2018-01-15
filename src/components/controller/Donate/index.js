import { connect } from 'react-redux';
import View from 'components/view/Donate';

const mapStateToProps = (state) => {
    return {};
};

const DonateController = connect(
    mapStateToProps,
)(View);

export default DonateController;
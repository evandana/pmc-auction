import { connect } from 'react-redux';
import { uploadImage } from 'actions';
import ImageUpload from 'components/view/ImageUpload';

const mapStateToProps = (state) => {
    return { images: state.images };
};

const mapDispatchToProps = { uploadImage };

const ImageUploadController = connect(
    mapStateToProps, mapDispatchToProps
)(ImageUpload);

export default ImageUploadController;
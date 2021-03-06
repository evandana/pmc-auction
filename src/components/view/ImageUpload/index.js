import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './imageUpload.css';

function isValidImageMimeType(type) {
    const validTypes = ['image/gif', 'image/png', 'image/jpeg'];
    return validTypes.includes(type);
}

function fileToDataURI(file) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onloadend = (event) => { resolve(event.target.result); };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function showErrors(list) {
    return (<div className="imageUpload-errors">
        <span>Your image could not be uploaded because of the following errors:</span>
        <ul>
            {list.map((err, key) => { return <li key={key}>{err}</li> })}
        </ul>
        </div>);
}

class ImageUpdate extends Component {
    
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.triggerFileInput = this.triggerFileInput.bind(this);
        this.updateURI = this.updateURI.bind(this);
        this.uploadImageFile = this.uploadImageFile.bind(this);
        this.selectImageProps = {
            label: 'Select File',
            primary: true,
            onClick: this.triggerFileInput,
        };
        this.state = {
            errors: [],
            file: null,
            uri: '',
        }
    }
    
    onFileChange(event) {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            this.updatePendingImage(file);
        }
    }

    triggerFileInput() {
        this.fileInput.click();
    }

    updatePendingImage(file = {}) {
        const { size, type, name } = file;
        const { images } = this.props;
        const isNewName = !images.find( image => image.name === name );
        const isImage = isValidImageMimeType(type);
        const isValidSize = size < 3000000;
        const isValid = isImage && isValidSize && isNewName;

        if (isValid) {
            this.setState({ file, errors: [] });
            this.updateURI(file);
        } else {
            const errorList = [];
            if (!isImage) {
                errorList.push('File type must be JPG, GIF, or PNG');
            }
            if (!isValidSize) {
                errorList.push('Upload an image less than 3MB');
            }
            if (!isNewName) {
                errorList.push("An image with this name already exists.  Please change the name or pick a different image");
            }
            this.setState({ errors: errorList });
        }
    }

    updateURI(image) {
        fileToDataURI(image)
            .then((uri) => { this.setState({ uri }); });
    }
    
    uploadImageFile() {
        this.props.uploadImage(this.state.file);
    }
    
    render() {

        const { file, uri, errors } = this.state;
        const { images } = this.props;
        
        let imageWasUploaded = false;
        
        if (file) {
            imageWasUploaded = !!images.find( image => image.name === file.name );
        }
        
        const fileInputProps = {
            onChange: this.onFileChange,
            ref: (ref) => { this.fileInput = ref; },
            type: 'file',
        };
        
        const uploadImgProps = {
            label: 'Upload File',
            onClick: this.uploadImageFile,
            secondary: true,
        };
        
        const cancelImageProps = {
            label: 'Cancel',
            onClick: () => { this.setState({ file: null, uri: null, errors: []})},
        };
        
        return (<div className="image-upload row">
            <h4 className="col-xs-5">Image Upload</h4>
            {errors.length ? showErrors(errors) : null}
            {uri && !imageWasUploaded && <div className="image-upload__file col-xs-12">
                <img src={uri} alt={file.name} />
            </div>}
            {!uri && (
                <div className="image-upload-btn col-xs-6">
                    <RaisedButton {...this.selectImageProps} />
            </div>)}
            {!uri && (<div className="col-xs-12">
                    <p>Upload an image for your auction listing.</p>
                    <p>Ideal image size: 600px X 400px, landscape.</p>
            </div>)}
            {uri && imageWasUploaded && <div>
                <p>The following image was uploaded successfully:</p>
                <ul><li>{file.name}</li></ul>
                <p>To add this image to your auction listing, select the file name on the form below and save your <changes className=""></changes></p>
            </div>}
            {uri && (<div className="image-upload-btn col-xs-12">
                <RaisedButton {...cancelImageProps} />
                <RaisedButton {...this.selectImageProps} />
                <RaisedButton {...uploadImgProps} />
            </div>)}
            <div className="image-upload-hidden col-xs-12">
                <input {...fileInputProps} />
            </div>
        </div>);
        
    }
    
}

export default ImageUpdate;
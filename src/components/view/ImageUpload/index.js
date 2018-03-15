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
        const { size, type } = file;

        const isImage = isValidImageMimeType(type);
        const isValidSize = size < 3000000;
        const isValid = isImage && isValidSize;

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

        const { file, uri } = this.state;
        
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
            onClick: () => {console.log('cancel click')},
        };
        
        return (<div className="image-upload">
            <h3>Image Upload</h3>
            {uri && <div className="image-upload__file">
                <img src={uri} alt={file.name} />
            </div>}
            {uri && (<div className="image-upload-btn">
                <RaisedButton {...cancelImageProps} />
                <RaisedButton {...this.selectImageProps} />
                <RaisedButton {...uploadImgProps} />
            </div>)}
            {!uri && (<div className="image-upload-btn">
                <RaisedButton {...this.selectImageProps} />
                <br /><span>Upload an image for your auction listing.</span>
            </div>)}
            <div className="image-upload-hidden">
                <input {...fileInputProps} />
            </div>
        </div>);
        
    }
    
}

export default ImageUpdate;
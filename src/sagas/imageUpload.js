import firebase from 'firebase/app';
import { call, takeEvery } from 'redux-saga/effects';
import { setImages } from 'actions';
import {
    FETCH_IMAGES,
    UPLOAD_IMAGE,
} from 'constants.js';

function* fetchImages() {
    window._FIREBASE_DB_.ref('/images')
        .on('value', (snapshot) => {
            const images = snapshot.val();

            const imageList = Object.keys(images).map(key => images[key]);
            window._UI_STORE_.dispatch(setImages(imageList));
        });
    yield;
}

function* uploadImage(action) {
    const { file } = action;

    // Create the file metadata
    const metadata = {
        contentType: 'image/jpeg'
    };
    
    // Upload file and metadata to the object 'images/mountains.jpg'
    let uploadTask = window._FIREBASE_STORAGE_REF_.child('images/auctions/' + file.name).put(file, metadata);
    
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function(error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;
                
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        }, function() {
            // Upload completed successfully, now we can get the download URL
            let downloadURL = uploadTask.snapshot.downloadURL;
            if (uploadTask.snapshot && uploadTask.snapshot.metadata) {
                const {
                    contentType,
                    fullPath,
                    name,
                    size, 
                } = uploadTask.snapshot.metadata;
                
                let dataName = uploadTask.snapshot.metadata.name.replace(/\./g,'');
                dataName = dataName.replace(/jpg?$/g,'');
                dataName = dataName.replace(/jpeg?$/g,'');
                dataName = dataName.replace(/png?$/g,'');
                
                const imageData = {
                    contentType, downloadURL, fullPath, name, size
                };
                window._FIREBASE_DB_.ref('images/' + dataName).set(imageData);
            }
        });
}

export default function* () {
    yield [
        takeEvery(UPLOAD_IMAGE, uploadImage),
        takeEvery(FETCH_IMAGES, fetchImages)
    ];
}
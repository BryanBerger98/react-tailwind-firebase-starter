import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { storage } from '../../firebase-config';

const FilesContext = React.createContext();
export { FilesContext };

const FilesContextProvider = props => {

    const [uploadingFile, setUploadingFile] = useState({
        status: null,
        progress: null,
        error: null,
        downloadURL: null
    });

    const uploadFile = (file, storagePath) => {
        return new Promise((resolve, reject) => {
            const metadata = {
                contentType: file.type,
                customMetadata: {
                    size: file.size.toString(),
                    lastModified: new Date(file.lastModified).toISOString()
                }
            };
            const storageRef = ref(storage, storagePath);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);
            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadingFile({
                        ...uploadingFile,
                        status: snapshot.state,
                        progress,
                        error: null,
                        downloadURL: null
                    });
                },
                (error) => {
                    setUploadingFile({...uploadingFile, error});
                    reject(error);
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUploadingFile({...uploadingFile, status:'over',  downloadURL});
                        resolve({...uploadingFile, status:'over',  downloadURL});
                    });
                }
            );
        });
    }


    return(
        <FilesContext.Provider value={{
            uploadingFile,
            uploadFile
        }}>
            {props.children}
        </FilesContext.Provider>
    );

}
export default FilesContextProvider;
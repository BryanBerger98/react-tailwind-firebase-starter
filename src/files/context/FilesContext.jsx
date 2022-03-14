import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { storage } from '../../firebase-config';

const FilesContext = createContext();
export { FilesContext };

const useFilesContext = () => {
    const context = useContext(FilesContext);
    if (context === undefined) {
        throw new Error('useFilesContext was used outside of its Provider');
    }
    return context;
};
export { useFilesContext };

const FilesContextProvider = props => {

    const [uploadingFile, setUploadingFile] = useState({
        status: null,
        progress: null,
        error: null,
        downloadURL: null
    });

    const uploadFile = useCallback((file, storagePath) => {
        return new Promise((resolve, reject) => {
            const metadata = {
                contentType: file.type,
                customMetadata: {
                    size: file.size.toString(),
                    lastModified: new Date(file.lastModified).toISOString()
                }
            };
            const storageRef = ref(storage, storagePath + file.name);
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
    }, [uploadingFile]);

    const deleteFile = useCallback(async (fileUrl) => {
        try {
            const fileRef = ref(storage, fileUrl);
            await deleteObject(fileRef);
            return;
        } catch (error) {
            if (error.code === 'storage/object-not-found') {
                return;
            }
            throw error;
        }
    }, []);

    const contextValues = useMemo(() => ({
        uploadingFile,
        uploadFile,
        deleteFile
    }), [uploadingFile, uploadFile, deleteFile]);

    return(
        <FilesContext.Provider value={contextValues}>
            {props.children}
        </FilesContext.Provider>
    );

}
export default FilesContextProvider;
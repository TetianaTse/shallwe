import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const PhotoUploadComponent: React.FC = () => {
    const [files, setFiles] = useState<any[]>([]);

    return (
        <div className="App">
            <FilePond
                files={files}
                onupdatefiles={(fileItems) => {
                    setFiles(fileItems.map(fileItem => fileItem.file));
                }}
                allowMultiple={true}
                maxFiles={1}
                server="/api"
                name="files"
                labelIdle='<span class="filepond--label-action">
                <img src="images/images.png" alt="Upload" class="upload"/>
                </span>'
            />
        </div>
    );
}

export default PhotoUploadComponent;

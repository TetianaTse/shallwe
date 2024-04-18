import { UploadDropzone } from "@bytescale/upload-widget-react";


const options = {
  apiKey: "free",
  maxFileCount: 1,
  showFinishButton: true,
  styles: {
    colors: {
      primary: "#377dff"
    }
    },
  mimeTypes: [
    "image/jpeg",
    "image/png",
    "image/heic",
    "image/heif"
  ],
};

const UploadPhoto = () => (
  <UploadDropzone options={options}
                  onUpdate={({ uploadedFiles }) => console.log(uploadedFiles.map(x => x.fileUrl).join("\n"))}
                  onComplete={files => alert(files.map(x => x.fileUrl).join("\n"))}
                  width="500px"
                  height="250px" />
)

export default UploadPhoto
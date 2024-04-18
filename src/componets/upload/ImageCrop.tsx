import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop, convertToPixelCrop } from 'react-image-crop';
import { useDebounceEffect } from './useDebounceEffect';
import 'react-image-crop/dist/ReactCrop.css';
import './ImageCrop.css';

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export default function ImageCrop() {
  const [imgSrc, setImgSrc] = useState('');
  const [fileSelected, setFileSelected] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [scaleValue, setScaleValue] = useState(1);

  useEffect(() => {
    if (imgRef.current && aspect) {
      const { width, height } = imgRef.current;
      const newCrop = centerAspectCrop(width, height, aspect);
      setCrop(newCrop);
      setCompletedCrop(convertToPixelCrop(newCrop, width, height));
    }
  }, [imgRef.current, aspect]);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      setFileSelected(true);
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {}

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current
      ) {
        // 
      }
    },
    100,
    [completedCrop],
  );

  async function onDownloadClick() {
    const canvas = document.createElement('canvas');
    const img = imgRef.current;
    if (!img) return;

    let finalCrop: PixelCrop;

    if (completedCrop) {
      finalCrop = {
        ...completedCrop,
        unit: 'px',
      };
    } else {
      finalCrop = {
        unit: 'px',
        x: 0,
        y: 0,
        width: img.naturalWidth,
        height: img.naturalHeight,
      };
    }

    canvas.width = finalCrop.width;
    canvas.height = finalCrop.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(
      img,
      finalCrop.x,
      finalCrop.y,
      finalCrop.width,
      finalCrop.height,
      0,
      0,
      finalCrop.width,
      finalCrop.height,
    );

    const downloadUrl = canvas.toDataURL('image/jpeg');
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'cropped-image.jpeg';
    a.click();
  }

return (
    <div className="App_crop">
      <div className="Crop-Controls">
        <input
          type="file"
          accept="image/jpeg, image/png, image/heic, image/heif"
          onChange={onSelectFile}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        {!fileSelected && (
          <div className="image_crop">
            <img
              src="images/images.png"
              alt="Выбрать файл"
              onClick={() => fileInputRef.current?.click()}
              style={{ maxWidth: '100%', maxHeight: '100%', cursor: 'pointer' }}
            />
          </div>
        )}
      </div>
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            onLoad={onImageLoad}
            style={{ transform: `scale(${scaleValue})` }}
          />
        </ReactCrop>
    )}
      {fileSelected && (
            <>
              <div className='scale_block'>
                <button className="scale_button" onClick={() => setScaleValue(scaleValue - 0.1)}>- </button>
                <button className="scale_button" onClick={() => setScaleValue(scaleValue + 0.1)}>+ </button>
              </div>
            </>
      )}
      {!!fileSelected && (
        <div>
          <button className="main_button" onClick={onDownloadClick}>Download</button>
        </div>
      )}
    </div>
  );
}

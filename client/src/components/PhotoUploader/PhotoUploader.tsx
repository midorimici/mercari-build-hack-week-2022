import { useState, useEffect } from 'react';
import { ReactComponent as AddPhoto } from './add_photo.svg';
import './PhotoUploader.css';

type Props = {
  image: File | undefined;
  setImage: (image: File | undefined) => void;
};

export const PhotoUploader: React.FC<Props> = ({ image, setImage }) => {
  const [imageURL, setImageURL] = useState<string>('');

  useEffect(() => {
    if (image === undefined) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener(
      'load',
      () => {
        const res = reader.result;
        if (typeof res === 'string') {
          setImageURL(res);
        }
      },
      false
    );
  }, [image]);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files === null) {
      return;
    }

    const file = files.item(0);
    if (file?.type.startsWith('image')) {
      setImage(file);
    }
  };

  return (
    <label className="image-container">
      {image === undefined ? (
        <div className="image-upload-btn">
          <AddPhoto width={48} height={48} fill="#808080" />
          画像をアップロード
        </div>
      ) : (
        <img src={imageURL} alt={image.name} title="画像を変更する" width={200} height={200} />
      )}
      <input type="file" accept="image/*" name="image" onChange={onImageChange} hidden />
    </label>
  );
};

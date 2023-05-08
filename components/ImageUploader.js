import { useState, useRef } from 'react';
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';

const ImageUploader = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'zsmy0nry'); // Replace with your upload preset

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dabmn9eje/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUploadedImageUrl(data.secure_url);
      } else {
        const errorData = await response.json();
        console.error('Image upload failed.', errorData);
      }
    } catch (error) {
      console.error('Image upload failed.', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    // You can access the uploaded image URL with `uploadedImageUrl` state
    console.log('Form submitted');
    console.log('Uploaded image URL:', uploadedImageUrl);
    // Reset the form
    fileInputRef.current.value = '';
    setUploadedImageUrl('');
  };

  const handleReset = () => {
    // Reset the form
    fileInputRef.current.value = '';
    setUploadedImageUrl('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Pick a PNG file</span>
            <span className="label-text-alt">Name Should Be id.png</span>
          </label>
          <input
            type="file"
            accept=".png"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full max-w-xs"
            ref={fileInputRef}
          />
          {uploadedImageUrl && (
            <CloudinaryContext cloudName="dabmn9eje">
              <Image publicId={uploadedImageUrl}>
                <Transformation width="300" crop="scale" />
              </Image>
            </CloudinaryContext>
          )}
          <label className="label">
            <span className="label-text-alt">Alt label</span>
            <span className="label-text-alt">Alt label</span>
          </label>
          <div className="flex justify-between">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ImageUploader;

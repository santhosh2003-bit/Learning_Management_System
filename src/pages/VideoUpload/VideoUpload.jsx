import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";

const UploadVideo = () => {
  const [thumbnailPreview, setThumbnailPreview] = useState(null); // Preview for thumbnail
  const [videoPreview, setVideoPreview] = useState(null); // Preview for video
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    branch: "",
    thumbnail: null,
    video: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file" && e.target.files && e.target.files[0]) {
      if (name === "thumbnail") {
        const imageThumbNail = URL.createObjectURL(e.target.files[0]);
        setThumbnailPreview(imageThumbNail);
        setFormData({
          ...formData,
          thumbnail: e.target.files[0],
        });
      } else if (name === "video") {
        const videoThumbNail = URL.createObjectURL(e.target.files[0]);

        setVideoPreview(videoThumbNail);
        setFormData({
          ...formData,
          video: e.target.files[0],
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      // axios.post(URL,{formData},{withCredentials:true})
      // Here you would implement the actual upload logic
      // For now, just logging the form data and showing success
      localStorage.setItem("course", JSON.stringify(formData));
      setSuccess("Course created");
    } catch (error) {
      console.log(error);
      setError("Error submitting form");
    } finally {
      setLoading(false);
      setFormData({
        title: "",
        description: "",
        thumbnail: null,
        video: null,
        branch: "",
      });
      setThumbnailPreview(null);
      setVideoPreview(null);
    }
  };

  // Function to clear file selection
  const clearFileSelection = (type) => {
    if (type === "thumbnail") {
      setThumbnailPreview(null);
      setFormData({
        ...formData,
        thumbnail: null,
      });
    } else if (type === "video") {
      setVideoPreview(null);
      setFormData({
        ...formData,
        video: null,
      });
    }
  };

  return (
    <>
      <Sidebar />
      <div className="content md:ml-72 p-2 mt-4 font-nunito">
        <h1 className="font-bold text-2xl mb-4">Upload Video</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <form className="md:w-1/2 w-full" onSubmit={handleSubmit}>
          <input
            className="input w-full p-2 mb-4 border rounded"
            type="text"
            placeholder="Content Name"
            value={formData.title}
            onChange={handleInputChange}
            required
            name="title"
          />
          <textarea
            className="input w-full p-2 mb-4 border rounded"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            required
            name="description"
          />
          <select
            className="input w-full p-2 mb-4 border rounded"
            value={formData.branch}
            onChange={handleInputChange}
            required
            name="branch"
          >
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="AIML">AIML</option>
          </select>

          {/* Thumbnail Input */}
          <div className="flex flex-col w-full py-5">
            <label htmlFor="thumbnail" className="font-bold text-gray-700 pb-2">
              Please Select a Thumbnail
            </label>

            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="thumbnail-dropzone"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 relative overflow-hidden"
              >
                {thumbnailPreview ? (
                  <>
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail Preview"
                      className="absolute inset-0 w-full h-full object-contain p-2"
                    />
                    <div className="absolute top-2 right-2 z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          clearFileSelection("thumbnail");
                        }}
                        className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG, or GIF
                    </p>
                  </div>
                )}
                <input
                  id="thumbnail-dropzone"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleInputChange}
                  name="thumbnail"
                  required
                />
              </label>
            </div>
          </div>

          {/* Video Input */}
          <div className="flex flex-col w-full py-5">
            <label htmlFor="video" className="font-bold text-gray-700 pb-2">
              Please Select a Video
            </label>

            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="video-dropzone"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 relative overflow-hidden"
              >
                {videoPreview ? (
                  <>
                    <video
                      src={videoPreview}
                      controls
                      className="absolute inset-0 w-full h-full object-contain p-2"
                    />
                    <div className="absolute top-2 right-2 z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          clearFileSelection("video");
                        }}
                        className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">MP4</p>
                  </div>
                )}
                <input
                  id="video-dropzone"
                  type="file"
                  className="hidden"
                  accept="video/*"
                  onChange={handleInputChange}
                  name="video"
                  required
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-gray-800 text-white p-2 rounded hover:bg-gray-700"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UploadVideo;

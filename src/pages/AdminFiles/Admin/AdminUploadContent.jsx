import React, { useState } from "react";
import {
  FileText,
  FileImage,
  BookOpen,
  Heading,
  ChevronLeft,
  ChevronRight,
  X,
  Upload,
  CheckCircle,
  AlertCircle,
  Star,
  Sparkles,
} from "lucide-react";

const AdminUploadContent = () => {
  const [videoName, setVideoName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [step, setStep] = useState(0);
  const [branchError, setBranchError] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setBranchError("");
    if (branch.includes(value)) {
      setBranchError("Already Existing Branch");
      setTimeout(() => setBranchError(""), 3000);
    } else {
      setBranch([...branch, value]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      videoName,
      description,
      course,
      semester,
      branch,
      thumbnail,
    });
  };

  const handleDeletion = (individualBranch) => {
    setBranch(
      branch.filter((removeBranch) => removeBranch !== individualBranch)
    );
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setThumbnailPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const stepTitles = ["Course Details", "Content Information", "Media Upload"];
  const stepIcons = [BookOpen, FileText, Upload];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <main className="flex items-center justify-center min-h-screen relative z-10">
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-2xl border border-white/20 relative overflow-hidden">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-purple-50/30 pointer-events-none"></div>

          {/* Floating sparkles */}
          <div className="absolute top-4 right-4">
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>
          <div className="absolute bottom-4 left-4">
            <Star className="w-4 h-4 text-indigo-400 animate-bounce" />
          </div>

          <div className="relative z-10">
            {/* Enhanced Step Indicator */}
            <div className="flex justify-center mb-10">
              <div className="flex items-center space-x-8">
                {[0, 1, 2].map((stepIndex) => {
                  const Icon = stepIcons[stepIndex];
                  return (
                    <React.Fragment key={stepIndex}>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 transform ${
                            step >= stepIndex
                              ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white scale-110 shadow-lg"
                              : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                          } ${
                            step === stepIndex
                              ? "ring-4 ring-purple-200 animate-pulse"
                              : ""
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs mt-2 font-medium text-gray-600">
                          {stepTitles[stepIndex]}
                        </span>
                      </div>
                      {stepIndex < 2 && (
                        <div
                          className={`w-16 h-1 rounded-full transition-all duration-500 ${
                            step > stepIndex
                              ? "bg-gradient-to-r from-purple-500 to-indigo-600"
                              : "bg-gray-300"
                          }`}
                        ></div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Upload Course Content
              </h1>
              <p className="text-gray-600">
                Create and share educational content with ease
              </p>
            </div>

            {/* Error Display */}
            {branchError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center space-x-3 animate-pulse">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-red-700 font-medium">{branchError}</span>
              </div>
            )}

            <div className="space-y-6">
              {/* Step 0: Course Details */}
              {step === 0 && (
                <div className="space-y-6">
                  {/* Program */}
                  <div className="group">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <div className="p-2 bg-purple-100 rounded-lg mr-3 group-hover:bg-purple-200 transition-colors">
                        <BookOpen className="w-4 h-4 text-purple-600" />
                      </div>
                      Program
                    </label>
                    <select
                      className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-purple-300"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      required
                    >
                      <option value="">Select a Program</option>
                      <option value="Btech">B.Tech</option>
                      <option value="Mtech">M.Tech</option>
                      <option value="MBA">MBA</option>
                    </select>
                  </div>
                  <div className="group">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <div className="p-2 bg-cyan-100 rounded-lg mr-3 group-hover:bg-cyan-200 transition-colors">
                        <BookOpen className="w-4 h-4 text-cyan-600" />
                      </div>
                      Branch
                    </label>

                    {/* Selected Branches */}
                    {branch.length > 0 && (
                      <div className="flex flex-wrap gap-3 mb-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
                        {branch.map((individualBranch, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md border border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                          >
                            <span className="text-sm font-medium text-purple-700">
                              {individualBranch}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDeletion(individualBranch)}
                              className="p-1 hover:bg-red-100 rounded-full transition-colors"
                            >
                              <X className="w-3 h-3 text-red-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <select
                      className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-cyan-100 focus:border-cyan-400 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-cyan-300"
                      onChange={handleChange}
                      value=""
                    >
                      <option value="">Add a branch</option>
                      <option value="CSE">Computer Science Engineering</option>
                      <option value="ECE">Electronics & Communication</option>
                      <option value="EEE">Electrical & Electronics</option>
                      <option value="MECH">Mechanical Engineering</option>
                      <option value="CIVIL">Civil Engineering</option>
                      <option value="IT">Information Technology</option>
                    </select>
                  </div>

                  {/* Semester */}
                  <div className="group">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <div className="p-2 bg-indigo-100 rounded-lg mr-3 group-hover:bg-indigo-200 transition-colors">
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                      </div>
                      Semester
                    </label>
                    <select
                      className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-indigo-300"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      required
                    >
                      <option value="">Select a semester</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <option key={sem} value={sem}>
                          Semester {sem}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Branch */}
                </div>
              )}

              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div className="space-y-6">
                  {/* Video Name */}
                  <div className="group">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <div className="p-2 bg-emerald-100 rounded-lg mr-3 group-hover:bg-emerald-200 transition-colors">
                        <Heading className="w-4 h-4 text-emerald-600" />
                      </div>
                      Video Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-emerald-300"
                      value={videoName}
                      onChange={(e) => setVideoName(e.target.value)}
                      placeholder="Enter an engaging video title..."
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="group">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <div className="p-2 bg-amber-100 rounded-lg mr-3 group-hover:bg-amber-200 transition-colors">
                        <FileText className="w-4 h-4 text-amber-600" />
                      </div>
                      Video Description
                    </label>
                    <textarea
                      rows={5}
                      className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-amber-100 focus:border-amber-400 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-amber-300 resize-none"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe what students will learn from this video..."
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Media Upload */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="group">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <div className="p-2 bg-rose-100 rounded-lg mr-3 group-hover:bg-rose-200 transition-colors">
                        <FileImage className="w-4 h-4 text-rose-600" />
                      </div>
                      Upload Thumbnail
                    </label>

                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="hidden"
                        id="thumbnail-upload"
                        required
                      />
                      <label
                        htmlFor="thumbnail-upload"
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 hover:from-rose-50 hover:to-pink-50 hover:border-rose-300 transition-all duration-300 group"
                      >
                        {thumbnailPreview ? (
                          <div className="relative w-full h-full">
                            <img
                              src={thumbnailPreview}
                              alt="Thumbnail preview"
                              className="w-full h-full object-cover rounded-2xl"
                            />
                            <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-white font-medium">
                                Click to change
                              </span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-12 h-12 text-gray-400 group-hover:text-rose-500 transition-colors mb-4" />
                            <p className="text-lg font-medium text-gray-600 group-hover:text-rose-600 transition-colors">
                              Click to upload thumbnail
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              PNG, JPG or GIF up to 10MB
                            </p>
                          </>
                        )}
                      </label>
                    </div>

                    {thumbnail && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-green-700 font-medium">
                          Selected: {thumbnail.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 font-medium"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </button>
                )}

                <div className="ml-auto">
                  {step < 2 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={
                        (step === 0 &&
                          (!course || !semester || branch.length === 0)) ||
                        (step === 1 && (!videoName || !description))
                      }
                      className="flex items-center px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!thumbnail}
                      className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      Submit Content
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminUploadContent;

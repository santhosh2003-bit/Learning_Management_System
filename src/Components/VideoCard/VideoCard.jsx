import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { FileText, Pause, Play, CheckCircle, Clock } from "lucide-react";

const VideoCard = ({ video }) => {
  const videoRef = useRef(null);
  const [watchingVideo, setWatchingVideo] = useState(null);
  const [currentTrackVideos, setCurrentTrackVideos] = useState([]);
  const [lastPlayedVideoName, setLastPlayedVideoName] = useState("");
  const [lastrecordedseconds, setlastrecordedSeconds] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideo = (videoUrl, id) => {
    setWatchingVideo(videoUrl);
    setVideoEnded(false); // Reset videoEnded state when selecting a new video
  };

  // Load saved video details on component mount
  useEffect(() => {
    try {
      const savedVideoDetails = localStorage.getItem("video_details");
      if (savedVideoDetails) {
        setCurrentTrackVideos(JSON.parse(savedVideoDetails));
      } else {
        setCurrentTrackVideos([]);
      }
    } catch (error) {
      console.error("Error loading video details:", error);
      setCurrentTrackVideos([]);
    }
  }, []);

  useEffect(() => {
    try {
      const lastVideoname = localStorage.getItem("lastPlayedVideo");
      const savedVideoDetails = localStorage.getItem("video_details");

      if (lastVideoname && savedVideoDetails) {
        const parsedVideoDetails = JSON.parse(savedVideoDetails);
        setWatchingVideo(lastVideoname);

        const isExistingtrack = parsedVideoDetails.find(
          (existing_video) => existing_video.video_name === lastVideoname
        );

        if (isExistingtrack) {
          const skipSeconds = isExistingtrack.seconds;
          setlastrecordedSeconds(skipSeconds);
        } else {
          setlastrecordedSeconds(0);
        }
      } else {
        setWatchingVideo(null);
        setlastrecordedSeconds(0);
      }
    } catch (error) {
      console.error("Error loading last played video:", error);
      setWatchingVideo(null);
      setlastrecordedSeconds(0);
    }
  }, []);

  const handleStart = () => {
    if (videoRef.current) {
      const video_name = videoRef.current.props.url;
      const seconds = videoRef.current.getCurrentTime();
      if (lastrecordedseconds > 0) {
        videoRef.current.seekTo(lastrecordedseconds, "seconds");
      }
      if (seconds > 0) {
        try {
          const existingArrayTrack = currentTrackVideos.findIndex(
            (track_name) => track_name.video_name === video_name
          );

          let updatedTracks = [...currentTrackVideos];

          if (existingArrayTrack === -1) {
            // this is when the video is new to the storage
            updatedTracks = [
              ...currentTrackVideos,
              {
                video_name: video_name,
                seconds: seconds,
                status: "watching",
                lastWatching: true,
              },
            ];
          } else {
            updatedTracks[existingArrayTrack] = {
              ...updatedTracks[existingArrayTrack],
              seconds: seconds,
              status: "watching",
              lastWatching: true,
            };
          }

          setCurrentTrackVideos(updatedTracks);
          localStorage.setItem("video_details", JSON.stringify(updatedTracks));
          localStorage.setItem("lastPlayedVideo", video_name);
          setLastPlayedVideoName(video_name);
        } catch (error) {
          console.error("Error in handleStart:", error);
        }
      }
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      const video_name = videoRef.current.props.url;
      const seconds = videoRef.current.getCurrentTime();

      if (seconds > 0) {
        try {
          let updateArray = [...currentTrackVideos];
          const x = updateArray.findIndex(
            (requiredVideo) => requiredVideo.video_name === video_name
          );

          if (x !== -1) {
            updateArray[x] = {
              ...updateArray[x],
              status: "paused",
              lastWatching: true,
              seconds: seconds,
            };

            // Update other videos to set lastWatching to false
            updateArray = updateArray.map((item, index) =>
              index !== x ? { ...item, lastWatching: false } : item
            );

            setCurrentTrackVideos(updateArray);
            setLastPlayedVideoName(video_name);
            localStorage.setItem("lastPlayedVideo", video_name);
            localStorage.setItem("video_details", JSON.stringify(updateArray));
          } else {
            // Handle case when video is not in trackVideos yet
            const newTrack = {
              video_name: video_name,
              seconds: seconds,
              status: "paused",
              lastWatching: true,
            };

            const newArray = [...updateArray, newTrack];
            setCurrentTrackVideos(newArray);
            setLastPlayedVideoName(video_name);
            localStorage.setItem("lastPlayedVideo", video_name);
            localStorage.setItem("video_details", JSON.stringify(newArray));
          }
        } catch (error) {
          console.error("Error in handlePause:", error);
        }
      }
    }
  };

  const handleEnded = () => {
    if (videoRef.current) {
      const video_name = videoRef.current.props.url;
      const seconds = videoRef.current.getCurrentTime();

      try {
        let toUpdateArray = [...currentTrackVideos];
        const index = toUpdateArray.findIndex(
          (ended_video) => ended_video.video_name === video_name
        );

        if (index !== -1) {
          toUpdateArray[index] = {
            ...toUpdateArray[index],
            status: "ended",
            lastWatching: true,
            seconds: seconds,
          };

          // Update other videos to set lastWatching to false
          toUpdateArray = toUpdateArray.map((item, i) =>
            i !== index ? { ...item, lastWatching: false } : item
          );
        } else {
          // Add new entry if not found
          toUpdateArray.push({
            video_name: video_name,
            seconds: seconds,
            status: "ended",
            lastWatching: true,
          });
        }

        setCurrentTrackVideos(toUpdateArray);
        localStorage.setItem("video_details", JSON.stringify(toUpdateArray));
        setVideoEnded(true);
      } catch (error) {
        console.error("Error in handleEnded:", error);
      }
    }
  };

  // Function to get video status
  const getVideoStatus = (videoUrl) => {
    const videoData = currentTrackVideos.find(
      (track) => track.video_name === videoUrl
    );
    if (!videoData) return null;
    return videoData.status;
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto font-nunito">
      {/* Container layout - Stack on mobile, side by side on tablets and up */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Video Player Section - Left side */}
        <div className="lg:col-span-8 order-2 lg:order-1">
          <div className="w-full">
            {watchingVideo ? (
              <div className="w-full">
                <div className="w-full aspect-w-16 aspect-h-9 bg-black rounded-xl overflow-hidden shadow-lg">
                  <ReactPlayer
                    url={watchingVideo}
                    ref={videoRef}
                    width="100%"
                    height="100%"
                    style={{ aspectRatio: "16/9" }}
                    controls
                    onStart={handleStart}
                    onPause={handlePause}
                    onEnded={handleEnded}
                  />
                </div>

                <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold text-white">
                    {video.title}
                  </h2>
                  <p className="text-sm mt-2 text-gray-300 leading-relaxed">
                    {video.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4 bg-gray-700 p-3 rounded-lg">
                    <p className="text-sm flex items-center">
                      <span className="font-semibold text-gray-300 mr-1">
                        Branch:
                      </span>{" "}
                      <span className="text-white">{video.branch}</span>
                    </p>
                    <p className="text-sm flex items-center">
                      <span className="font-semibold text-gray-300 mr-1">
                        Instructor:
                      </span>{" "}
                      <span className="text-white">{video.instructor}</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-64 md:h-80 flex flex-col items-center justify-center bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                <Play size={48} className="text-gray-400 mb-4" />
                <p className="text-gray-300 text-base px-4 text-center">
                  Select a video from the course content to begin
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Course Content Section - Right side */}
        <div className="lg:col-span-4 order-1 lg:order-2">
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 h-full max-h-screen overflow-hidden">
            <h2 className="text-lg font-bold p-4 border-b border-gray-700 text-white bg-gray-900 rounded-t-xl sticky top-0 z-10">
              Course Content
            </h2>

            <div
              className="p-2 overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 60px)" }}
            >
              {video.sections.map((section, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-base font-semibold p-2 bg-gray-700 rounded-lg mb-2 text-white sticky top-0">
                    {section.sectionTitle}
                  </h3>

                  <div className="space-y-1 text-white">
                    {section.videos.map((section_video) => {
                      const videoStatus = getVideoStatus(
                        section_video.video_url
                      );
                      const isCurrentlyWatching =
                        watchingVideo === section_video.video_url;
                      return (
                        <div key={section_video._id} className="flex flex-col">
                          {section_video.type === "video" ? (
                            <button
                              className={`text-left py-2 px-3 rounded-lg transition-colors flex items-start ${
                                isCurrentlyWatching
                                  ? "bg-blue-900 text-white"
                                  : videoStatus === "ended"
                                  ? "bg-gray-700 hover:bg-gray-600"
                                  : videoStatus === "paused"
                                  ? "bg-gray-700 hover:bg-gray-600"
                                  : "bg-gray-700 hover:bg-gray-600"
                              }`}
                              onClick={() =>
                                handleVideo(
                                  section_video.video_url,
                                  section_video._id
                                )
                              }
                            >
                              <div className="flex-shrink-0 mr-2 mt-1">
                                {isCurrentlyWatching ? (
                                  <Play size={16} className="text-blue-300" />
                                ) : videoStatus === "ended" ? (
                                  <CheckCircle
                                    size={16}
                                    className="text-green-400"
                                  />
                                ) : videoStatus === "paused" ? (
                                  <Pause
                                    size={16}
                                    className="text-yellow-400"
                                  />
                                ) : (
                                  <Play size={16} className="text-gray-400" />
                                )}
                              </div>
                              <div className="flex-1">
                                <span className="text-xs sm:text-sm font-medium block">
                                  {section_video.title}
                                </span>
                                <div className="flex flex-wrap items-center mt-1 gap-1">
                                  <span className="text-xs text-gray-400 flex items-center">
                                    <Clock size={12} className="mr-1" />
                                    {section_video.duration}
                                  </span>
                                  {videoStatus === "ended" && (
                                    <span className="text-xs text-green-400 ml-2">
                                      Completed
                                    </span>
                                  )}
                                  {videoStatus === "paused" &&
                                    !isCurrentlyWatching && (
                                      <span className="text-xs text-yellow-400 ml-2">
                                        In progress
                                      </span>
                                    )}
                                </div>
                              </div>
                            </button>
                          ) : (
                            <Link
                              to={`/test/${section_video._id}`}
                              className="flex items-start py-2 px-3 rounded-lg bg-indigo-800 hover:bg-indigo-700 transition-colors text-white"
                            >
                              <FileText
                                size={16}
                                className="flex-shrink-0 mr-2 mt-1"
                              />
                              <div className="flex-1">
                                <span className="text-xs sm:text-sm font-medium block">
                                  {section_video.title}
                                </span>
                                <span className="text-xs text-gray-300">
                                  Assessment
                                </span>
                              </div>
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

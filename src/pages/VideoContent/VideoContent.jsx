// import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import VideoCard from "../../Components/VideoCard/VideoCard";
import Sidebar from "../../Components/Sidebar/Sidebar";

const coursesData = [
  {
    _id: "c1",
    title: "Introduction to Python",
    description:
      "Learn Python programming from scratch with hands-on examples and projects.",
    subject: "Python",
    branch: "CSE",
    instructor: "Prof. Sarah Johnson",
    progress: 75,
    totalVideos: 8,
    completedVideos: 6,
    thumbnail: "/course.jpg",
    courseRating: 4.6,
    totalRatings: 13450,
    studentsEnrolled: 50234,
    lastUpdated: "April 2025",
    totalVideoDuration: "7.5 hours",
    sections: [
      {
        sectionTitle: "Getting Started",
        videos: [
          {
            _id: "1",
            title: "Getting Started with Python",
            duration: "45:20",
            status: "available",
            video_url: "/Random.mp4",
            type: "video",
          },
          {
            _id: "2",
            title: "Variables & Data Types",
            duration: "38:15",
            status: "available",
            video_url: "/Course.mp4",
            type: "video",
          },
          {
            _id: "3",
            title: "Assignment 1",
            type: "test",
          },
        ],
      },
    ],
  },
  {
    _id: "c2",
    title: "Machine Learning Basics",
    description:
      "Understand core Machine Learning concepts, algorithms and practical implementations.",
    subject: "AIML",
    branch: "AIML",
    instructor: "Dr. Michael Chen",
    progress: 30,
    totalVideos: 10,
    completedVideos: 3,
    thumbnail: "/course.jpg",
    courseRating: 4.7,
    totalRatings: 18640,
    studentsEnrolled: 65890,
    lastUpdated: "May 2025",
    totalVideoDuration: "10 hours",
    sections: [
      {
        sectionTitle: "Introduction to ML",
        videos: [
          {
            _id: "1",
            title: "What is Machine Learning?",
            duration: "52:10",
            status: "available",
            // video_url: "/Random.mp4",
            type: "video",
          },
          {
            _id: "2",
            title: "Supervised Learning Algorithms",
            duration: "65:00",
            status: "upcoming",
            // video_url: "/Course.mp4",
            type: "video",
          },
        ],
      },
    ],
  },
  {
    _id: "c3",
    title: "Data Structures & Algorithms",
    description:
      "Master fundamental data structures and algorithms used in computer science.",
    subject: "DSA",
    branch: "CSE",
    instructor: "Prof. David Miller",
    progress: 0,
    totalVideos: 12,
    completedVideos: 0,
    thumbnail: "/course.jpg",
    courseRating: 4.8,
    totalRatings: 20100,
    studentsEnrolled: 88410,
    lastUpdated: "March 2025",
    totalVideoDuration: "15 hours",
    sections: [
      {
        sectionTitle: "Core DSA Topics",
        videos: [
          {
            _id: "1",
            title: "Arrays and Their Applications",
            duration: "41:30",
            status: "upcoming",
            // video_url: "/Random.mp4",
            type: "video",
          },
          {
            _id: "2",
            title: "Linked Lists Implementation",
            duration: "47:20",
            status: "upcoming",
            // video_url: "/Course.mp4",
            type: "video",
          },
        ],
      },
    ],
  },
  {
    _id: "c4",
    title: "Web Development Fundamentals",
    description:
      "Learn HTML, CSS and JavaScript to build modern, responsive websites.",
    subject: "Web",
    branch: "Web",
    instructor: "Prof. Jessica Williams",
    progress: 50,
    totalVideos: 8,
    completedVideos: 4,
    thumbnail: "/course.jpg",
    courseRating: 4.5,
    totalRatings: 17420,
    studentsEnrolled: 73980,
    lastUpdated: "February 2025",
    totalVideoDuration: "9 hours",
    sections: [
      {
        sectionTitle: "Frontend Basics",
        videos: [
          {
            _id: "1",
            title: "HTML Structure and Elements",
            duration: "35:45",
            status: "available",
            // video_url: "/Random.mp4",
            type: "video",
          },
          {
            _id: "2",
            title: "CSS Styling Techniques",
            duration: "42:30",
            status: "available",
            // video_url: "/Course.mp4",
            type: "video",
          },
        ],
      },
    ],
  },
  {
    _id: "c5",
    title: "Advanced AI Concepts",
    description:
      "Explore cutting-edge AI technologies including neural networks and deep learning.",
    subject: "AIML",
    branch: "AIML",
    instructor: "Dr. Sophia Rodriguez",
    progress: 15,
    totalVideos: 10,
    completedVideos: 1.5,
    thumbnail: "/course.jpg",
    courseRating: 4.9,
    totalRatings: 21900,
    studentsEnrolled: 90250,
    lastUpdated: "May 2025",
    totalVideoDuration: "11.5 hours",
    sections: [
      {
        sectionTitle: "Deep Learning Basics",
        videos: [
          {
            _id: "1",
            title: "Neural Networks Introduction",
            duration: "58:20",
            status: "available",
            // video_url: "/Random.mp4",
          },
          {
            _id: "2",
            title: "Building Your First AI Model",
            duration: "67:15",
            status: "upcoming",
            // video_url: "/Course.mp4",
          },
        ],
      },
    ],
  },
];

const UploadedContent = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const { id } = useParams(); // course id
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Simulate API call with dummy data for testing
        // Comment out the axios call and use dummy data
        // const response = await axios.get('/faculty/uploaded-videos', {
        //   headers: { Authorization: token }
        // });
        // setVideos(response.data);

        // Use dummy data instead
        setTimeout(() => {
          const findCourses = coursesData.filter((course) => course._id === id);
          setVideos(findCourses);
          // setVideos(coursesData);
          setLoading(false);
        }, 1000); // Simulate network delay
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch videos");
        setLoading(false);
      }
    };
    fetchVideos();
  }, [token, id]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      setRole(role);
    }
  }, []);
  // const handleUpdate = (videoId) => {
  //   navigate(`/upload-video?videoId=${videoId}`);
  // };

  // const handleDelete = async (videoId) => {
  //   try {
  //     // Simulate API call with dummy data for testing
  //     // Comment out the axios call and update state directly
  //     // await axios.delete(`/faculty/delete-video/${videoId}`, {
  //     //   headers: { Authorization: token }
  //     // });

  //     // Update state directly with dummy data
  //     setVideos(videos.filter(video => video._id !== videoId));
  //     alert('Video deleted successfully');
  //   } catch (err) {
  //     alert(err.response?.data?.message || 'Failed to delete video');
  //   }
  // };

  return (
    <>
      <div className="content">
        <h1 className="text-2xl font-bold ">Uploaded Content</h1>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && videos.length === 0 && (
          <p style={{ color: "#555" }}>
            No videos uploaded yet. Start by uploading content!
          </p>
        )}
        <div className="flex flex-wrap gap-x-10 md:flex-row flex-col ml-64">
          {!loading &&
            !error &&
            videos.length > 0 &&
            videos.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
                role={role}
                // onUpdate={role==='faculty' && (handleUpdate)}
                // onDelete={role==='faculty' && (handleDelete)}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default UploadedContent;

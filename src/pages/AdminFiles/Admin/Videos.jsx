import Sidebar from "../../../Components/Sidebar/Sidebar";

const dummyVideos = [
  {
    id: 1,
    title: "React for Beginners",
    instructor: "John Doe",
    description:
      "An introductory course to React.js and modern frontend development.",
  },
  {
    id: 2,
    title: "Advanced Node.js",
    instructor: "Jane Smith",
    description:
      "Learn advanced concepts of Node.js, Express, and backend architecture.",
  },
  {
    id: 3,
    title: "Data Structures in Python",
    instructor: "Alice Johnson",
    description: "Master fundamental data structures and algorithms in Python.",
  },
];

const Videos = () => {

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 md:ml-64 lg:ml-64">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 md:mb-6">
            Courses
          </h1>

          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {dummyVideos.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow p-4 md:p-6 space-y-3 md:space-y-4 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-lg md:text-xl font-semibold text-indigo-700">
                  {course.title}
                </h2>
                <p className="text-gray-600 text-xs md:text-sm">
                  Instructor: {course.instructor}
                </p>
                <p className="text-gray-700 text-xs md:text-sm">
                  {course.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mt-3 md:mt-4">
                  <button className="px-3 md:px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
                    View
                  </button>
                  <button className="px-3 md:px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors">
                    Accept
                  </button>
                  <button className="px-3 md:px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Videos;
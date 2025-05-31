
import Sidebar from '../../../Components/Sidebar/Sidebar';

const facultyMembers = [
  { id: 1, name: 'Dr. Sarah Lee', subject: 'Machine Learning' },
  { id: 2, name: 'Prof. John Doe', subject: 'Web Development' },
  { id: 3, name: 'Dr. Anna Smith', subject: 'Cyber Security' },
  { id: 4, name: 'Mr. Mark Wilson', subject: 'Data Science' },
];

const AdminFaculty = () => {

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 md:ml-64 lg:ml-64">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 md:mb-6">
            Faculty Directory
          </h1>

          <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
            {facultyMembers.map((faculty) => (
              <div
                key={faculty.id}
                className="bg-white rounded-lg shadow p-4 md:p-6 hover:shadow-md transition-shadow"
              >
                <h2 className="text-lg md:text-xl font-semibold text-indigo-700 break-words">
                  {faculty.name}
                </h2>
                <p className="text-gray-600 text-sm md:text-base mt-1">
                  Subject: {faculty.subject}
                </p>

                <div className="mt-4 flex justify-end">
                  <button className="px-3 md:px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors">
                    View Profile
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

export default AdminFaculty;
import React, { useState } from 'react';
import Sidebar from '../../../Components/Sidebar/Sidebar';

const students = [
  { id: 1, name: 'Alice Brown', course: 'React', progress: 80 },
  { id: 2, name: 'Bob Smith', course: 'Node.js', progress: 45 },
  { id: 3, name: 'Charlie Johnson', course: 'Python', progress: 90 },
  { id: 4, name: 'Diana Lee', course: 'Data Structures', progress: 60 },
];

// Choose a color based on progress %
const getProgressColor = (progress) => {
  if (progress >= 80) return 'bg-green-500';
  if (progress >= 60) return 'bg-yellow-500';
  return 'bg-red-500';
};

const User = () => {

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 md:ml-64 lg:ml-64">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 md:mb-6">
            Student Progress
          </h1>

          <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-white rounded-lg shadow p-4 md:p-6 hover:shadow-md transition-shadow"
              >
                <h2 className="text-lg md:text-xl font-semibold text-indigo-700 break-words">
                  {student.name}
                </h2>
                <p className="text-gray-600 text-sm md:text-base mt-1">
                  Course: {student.course}
                </p>

                <div className="mt-3 md:mt-4">
                  <div className="h-3 md:h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getProgressColor(
                        student.progress
                      )} flex items-center justify-end text-xs text-white pr-2 rounded-full transition-all duration-300`}
                      style={{ width: `${student.progress}%` }}
                    >
                      <span className="text-xs font-medium">
                        {student.progress}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button className="px-3 md:px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors">
                    View Details
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

export default User;
import Sidebar from "../../../Components/Sidebar/Sidebar";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 md:ml-64 lg:ml-64">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 ">
            Welcome to the Admin Dashboard
          </h1>
          <p className="mt-4 text-sm md:text-base text-gray-600">
            Use the sidebar to navigate through the different options.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
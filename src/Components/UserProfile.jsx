import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Ui/Loader"; // Assuming you have a LoadingSpinner component

const Profile = () => {
  const { userData, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please log in to view your profile.");
    }
  }, [isAuthenticated]);

  if (isLoading || loading) return <LoadingSpinner size="large" />;

  if (!isAuthenticated) {
    return (
      <div className="text-center py-4">
        <p>You must be logged in to access your profile.</p>
        <Link to="/login" className="text-blue-600">
          Log In
        </Link>
      </div>
    );
  }

  // If the user data is available, display it
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
            <p className="text-gray-600">Manage your account details</p>
          </div>

          {/* User Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <p className="text-lg text-gray-800">{userData.userName}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <p className="text-lg text-gray-800">{userData.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <p className="text-lg text-gray-800">{userData.role}</p>
            </div>

            {/* Add more user info sections as needed */}
            {userData.profilePicture && (
              <div className="flex justify-center">
                <img
                  src={userData.profilePicture}
                  alt="Profile"
                  className="rounded-full h-32 w-32 object-cover"
                />
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/edit-profile"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaSignInAlt, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router"; // changed to 'react-router-dom'
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuth();
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState("");
  const [newName, setNewName] = useState("");

  const UpdateProfile = async () => {
    try {
      const updates = {};
      if (newName.trim() !== "") updates.displayName = newName;
      if (newProfilePic.trim() !== "") updates.photoURL = newProfilePic;

      if (Object.keys(updates).length === 0) {
        toast("No changes to update.");
        return;
      }

      await updateProfile(user, updates);
      window.location.reload();
      toast("Profile Updated Successfully!");
    } catch (err) {
      console.error(err);
      toast("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      {user ? (
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 w-full max-w-6xl">
          {/* Left image section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img 
              src={user.photoURL}
              alt="Profile Illustration"
              className="w-full max-w-sm"
            />
          </div>

          {/* Right profile info section */}
          <div className="card w-full md:w-1/2 bg-base-100 shadow-xl py-6 px-4 md:px-6">
            <div className="card-body">
              {/* Profile avatar and name */}
              <div className="flex flex-col items-center mb-6">
                <div className="avatar">
                  <div className="w-24 sm:w-28 md:w-32 rounded-full bg-primary text-primary-content flex items-center justify-center">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="profilePic"
                        className="rounded-full h-full w-full object-cover"
                      />
                    ) : (
                      <FaUserAlt className="text-white text-4xl rounded-full h-full w-full object-cover p-4" /> // Display profile icon if no photo URL
                    )}
                  </div>
                </div>
                <h2 className="card-title mt-4 text-center text-2xl sm:text-3xl">
                  {user.displayName || "User Profile"}
                </h2>
                {user.displayName && (
                  <p className="text-md sm:text-lg text-gray-500">
                    
                  </p>
                )}
              </div>

              {/* Info cards */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-base-200 rounded-lg">
                  <FaUser className="text-primary text-lg sm:text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-base font-medium">
                      {user.displayName || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-base-200 rounded-lg">
                  <FaEnvelope className="text-primary text-lg sm:text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-base font-medium">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Edit fields */}
              {editMenuOpen && (
                <div className="mt-6">
                  <div className="divider">Update Profile</div>

                  <div className="mb-4">
                    <label className="label text-sm font-medium">
                      Profile Picture URL
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="https://your-image-link.com"
                      value={newProfilePic}
                      onChange={(e) => setNewProfilePic(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="label text-sm font-medium">Name</label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="New name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Button */}
              <div className="card-actions justify-end mt-6">
                <button
                  className="btn btn-primary w-full sm:w-auto"
                  onClick={() => {
                    if (editMenuOpen) {
                      UpdateProfile();
                      setEditMenuOpen(false);
                    } else {
                      setEditMenuOpen(true);
                    }
                  }}
                >
                  {editMenuOpen ? "Update Profile" : "Edit Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Not logged in
        <div className="card w-full max-w-md bg-base-100 shadow-xl text-center p-6">
          <FaSignInAlt size={48} className="text-primary mb-4 mx-auto" />
          <h2 className="card-title text-xl mb-2">Please Log In</h2>
          <p className="text-sm text-gray-600">
            You need to be logged in to view this page.
          </p>
          <div className="card-actions mt-6 justify-center">
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

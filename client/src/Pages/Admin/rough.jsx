import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Users = () => {
  const { userData } = useSelector((state) => state.admin.users);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  // Handle edit button click
  const handleEdit = (user) => {
    console.log(user._id)
    setEditingUserId(user._id);
    setEditedUser({ ...user });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  // Handle save button click
  const handleSave = () => {
    console.log('Updated user:', editedUser);
    // Dispatch update action here, e.g., dispatch(updateUser(editedUser))
    setEditingUserId(null);
  };

  // Handle cancel button click
  const handleCancel = () => {
    setEditingUserId(null);
    setEditedUser({});
  };

  // Handle delete button click
  const handleDelete = (userId) => {
    console.log('Delete user with ID:', userId);
    // Implement delete logic here
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Admin User Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Profile</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Admin</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={user.profilePicture}
                    alt={user.username}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {editingUserId === user._id ? (
                    <input
                      type="text"
                      name="username"
                      value={editedUser.username}
                      onChange={handleInputChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {editingUserId === user._id ? (
                    <input
                      type="email"
                      name="email"
                      value={editedUser.email}
                      onChange={handleInputChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {editingUserId === user._id ? (
                    <select
                      name="is_Admin"
                      value={editedUser.is_Admin}
                      onChange={handleInputChange}
                      className="border rounded px-2 py-1 w-full"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  ) : user.is_Admin ? (
                    'Yes'
                  ) : (
                    'No'
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {editingUserId === user._id ? (
                    <>
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

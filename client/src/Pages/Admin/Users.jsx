import { useSelector, useDispatch } from "react-redux";
import { updatingUser, deletingUser,userCreated } from '../../redux/admin/adminSlice';
import { useState } from "react";
import axios from 'axios';

const Users = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.admin.users) || { userData: [] };
    const [editingUserid, setEditingUserid] = useState(null);
    const [editedUser, setEditedUser] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen,setIsCreateModalOpen] = useState(false)
    const [newUser,setNewUser] = useState({username:"",email:""})
    const handleEdit = (user) => {
        setEditingUserid(user._id);
        setEditedUser({ ...user });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSave = async () => {
        const emailExist = userData.some((user) => user.email === editedUser.email && user._id !== editedUser._id);
        const usernameExists = userData.some((user) => user.username === editedUser.username && user._id !== editedUser._id);

        if (emailExist) {
            setError("Email is already in use.");
            setIsModalOpen(true); 
            return;
        }

        if (usernameExists) {
            setError("Username is already in use.");
            setIsModalOpen(true); 
            return;
        }

        try {
            const response = await axios.put('http://localhost:3000/api/admin/update', editedUser);
            dispatch(updatingUser(response.data.updatedUser));
            setEditingUserid(null); 
            setIsModalOpen(false);
            setError("");
        } catch (err) {
            setError("Failed to update user.");
            setIsModalOpen(true);
        }
    };

    const handleCancel = () => {
        setEditingUserid(null);
        setEditedUser({});
        setError("");
        setIsModalOpen(false);
    };

    const handleDelete = async (userId) => {
        await axios.delete(`http://localhost:3000/api/admin/delete/${userId}`).then((res) => dispatch(deletingUser(res.data.updatedUsers))).catch((err) => console.log(err));
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setError("");
    };

    const filteredUsers = userData?.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleNewUserInputChange =(e)=>{
        const {name,value} = e.target
        setNewUser((prev)=>({...prev,[name]:value}))
    }
    const handleCreateUser = async()=>{
        setError('')
        const userExist = userData.some((user)=>user.username === newUser.username || user.email === newUser.email)
        if(userExist){
            setError("User details already exists")
        }else{
        await axios.post('http://localhost:3000/api/admin/createuser',newUser).then((res)=>dispatch(userCreated(res.data.rest))).catch((err)=>console.log(err))
        setError('')
        setIsCreateModalOpen(false);
        
        }
    }
    return (
        <div className="bg-black min-h-screen">
            <div className="container mx-auto px-6 py-10 bg-black">
                <h2 className="text-4xl font-extrabold text-center text-white mb-10">
                    Admin User Management
                </h2>
                
                {/* Modal for error messages */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-md shadow-lg w-96">
                            <h3 className="text-xl text-red-500 font-semibold">Error</h3>
                            <p className="text-red-600">{error}</p>
                            <div className="mt-4 text-right">
                                <button
                                    onClick={closeModal}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Create User Modal */}
                {isCreateModalOpen && (
                        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                                <h3 className="text-2xl text-green-600 font-semibold mb-4">Create New User</h3>
                                <div className="space-y-4">
                                    <input
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                        value={newUser.username}
                                        onChange={handleNewUserInputChange}
                                        className="border border-gray-300 focus:ring-green-500 focus:border-green-500 block w-full rounded-lg sm:text-sm shadow-sm p-3"
                                    />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        value={newUser.email}
                                        onChange={handleNewUserInputChange}
                                        className="border border-gray-300 focus:ring-green-500 focus:border-green-500 block w-full rounded-lg sm:text-sm shadow-sm p-3"
                                    />
                                </div>
                                <div className="mt-6 flex justify-end space-x-4">
                                    <button
                                        onClick={handleCreateUser}
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all duration-200"
                                    >
                                        Create
                                    </button>
                                    <button
                                        onClick={() => setIsCreateModalOpen(false)}
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                
                           
                            { error &&
                            <div className="flex items-center mt-3 bg-white p-3 rounded-lg shadow-sm max-w-xs mx-auto border border-red-300 relative">
                            <h3 className="text-sm text-red-500 font-semibold mr-2">Error</h3>
                            
                            <span className="ml-3 text-sm text-red-600">{error}</span>
                            
                            <span
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-black text-xl font-bold cursor-pointer hover:text-red-600 transition-colors duration-200"
                            >
                                &times;
                            </span>
                        </div>
                        
                        
                            }
                            </div>
                        </div>
                    )}



                <div className="flex justify-end mb-6 gap-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md transition-colors duration-200" onClick={()=>setIsCreateModalOpen(true)}>
                        Create New User
                    </button>
                    <input
                        type="text"
                        placeholder="Search by username or email..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="border border-gray-300 rounded-md px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                    />
                </div>

                <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                    <table className="min-w-full border-collapse border border-gray-200">
                        <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                            <tr>
                                <th className="border border-gray-200 px-6 py-3 text-left text-sm font-medium">Profile</th>
                                <th className="border border-gray-200 px-6 py-3 text-left text-sm font-medium">Username</th>
                                <th className="border border-gray-200 px-6 py-3 text-left text-sm font-medium">Email</th>
                                <th className="border border-gray-200 px-6 py-3 text-left text-sm font-medium">Joined On</th>
                                <th className="border border-gray-200 px-6 py-3 text-left text-sm font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers?.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                                >
                                    <td className="border border-gray-200 px-6 py-4">
                                        <img
                                            className="w-12 h-12 rounded-full mx-auto"
                                            src={user.profilePicture}
                                            alt="Profile"
                                        />
                                    </td>
                                    <td className="border border-gray-200 px-6 py-4">
                                        {editingUserid === user._id ? (
                                            <input
                                                name="username"
                                                type="text"
                                                value={editedUser.username || ""}
                                                onChange={handleInputChange}
                                                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm shadow-sm"
                                            />
                                        ) : (
                                            user.username
                                        )}
                                    </td>
                                    <td className="border border-gray-200 px-6 py-4">
                                        {editingUserid === user._id ? (
                                            <input
                                                name="email"
                                                type="email"
                                                value={editedUser.email || ""}
                                                onChange={handleInputChange}
                                                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm shadow-sm"
                                            />
                                        ) : (
                                            user.email
                                        )}
                                    </td>
                                    <td className="border border-gray-200 px-6 py-4 text-center">
                                        {user.createdAt.slice(0, 10).split('-').reverse().join('-')}
                                    </td>
                                    <td className="border border-gray-200 px-6 py-4">
                                        <div className="flex space-x-3">
                                            {editingUserid === user._id ? (
                                                <>
                                                    <button
                                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md transition-colors duration-200"
                                                        onClick={handleSave}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-md transition-colors duration-200"
                                                        onClick={handleCancel}
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md transition-colors duration-200"
                                                        onClick={() => handleEdit(user)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md transition-colors duration-200"
                                                        onClick={() => handleDelete(user._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;

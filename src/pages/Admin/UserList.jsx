import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import Message from "../../components/message";

const UserList = () => {
  const { data: users, refetch, isloading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);

  const [ediatbleUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);
  const deleteHandler = async (id) => {
    if (window.confirm("are you sure want to delete")) {
      try {
        await deleteUser(id);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };
  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    const userToUpdate = users.find((user) => user._id === id);

    try {
      await updateUser({
        userId: id,
        username: ediatbleUserName,
        email: editableUserEmail,
        isAdmin: userToUpdate.isAdmin, // Preserve the isAdmin status
      });
      setEditableUserId(null);
      refetch();
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  return (
    <div className="p-4 h-screen">
      <h1 className="text-2xl font-semibold mb-4">Users List</h1>

      {isloading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row text-white">
          {/* <Admin menu/> */}
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Admin</th>
                <th className="px-4 py-2 text-left">Delete User</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 py-2">{user._id}</td>
                    <td className="px-4 py-2">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={ediatbleUserName}
                            onChange={(e) =>
                              setEditableUserName(e.target.value)
                            }
                            className="w-full p-2 border rounded-lg text-gray-800"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          {user.username}{" "}
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                          >
                            <FaEdit className="ml-[1rem]" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editableUserEmail}
                            onChange={(e) =>
                              setEditableUserEmail(e.target.value)
                            }
                            className="w-full p-2 border rounded-lg  text-gray-800"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.name, user.email)
                            }
                          >
                            <FaEdit className="ml-[1rem]" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {user.isAdmin ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {!user.isAdmin && (
                        <div className="flex">
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;

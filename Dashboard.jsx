import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../services/userService";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await getUsers();

    const data = res.data.map((user) => {
      const names = user.name.split(" ");

      return {
        id: user.id,
        firstName: names[0],
        lastName: names.slice(1).join(" "),
        email: user.email,
        department: user.company.name,
      };
    });

    setUsers(data);
  };

  const handleSave = async (user) => {
    if (selectedUser) {
      await updateUser(selectedUser.id, user);

      setUsers(
        users.map((u) =>
          u.id === selectedUser.id
            ? { ...user, id: selectedUser.id }
            : u
        )
      );

      setSelectedUser(null);
    } else {
      const res = await addUser(user);

      setUsers([
        ...users,
        {
          ...user,
          id: users.length + 1,
        },
      ]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await deleteUser(id);

    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="container">
      <h1>User Management Dashboard</h1>

      <UserForm
        selectedUser={selectedUser}
        onSave={handleSave}
        onCancel={() => setSelectedUser(null)}
      />

      <table>

        <thead>

          <tr>

            <th>ID</th>

            <th>First Name</th>

            <th>Last Name</th>

            <th>Email</th>

            <th>Department</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user.id}>

              <td>{user.id}</td>

              <td>{user.firstName}</td>

              <td>{user.lastName}</td>

              <td>{user.email}</td>

              <td>{user.department}</td>

              <td>

                <button
                  onClick={() => setSelectedUser(user)}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>
    </div>
  );
}

export default Dashboard;

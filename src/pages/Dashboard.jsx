import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();

      const formatted = res.data.map((user) => {
        const names = user.name.split(" ");

        return {
          id: user.id,
          firstName: names[0],
          lastName: names.slice(1).join(" "),
          email: user.email,
          department: user.company.name,
        };
      });

      setUsers(formatted);
    } catch (err) {
      alert("Failed to fetch users");
    }
  };

  return (
    <div className="container">
      <h1>User Management Dashboard</h1>

      <table>

        <thead>

          <tr>

            <th>ID</th>

            <th>First Name</th>

            <th>Last Name</th>

            <th>Email</th>

            <th>Department</th>

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

            </tr>

          ))}

        </tbody>

      </table>
    </div>
  );
}

export default Dashboard;

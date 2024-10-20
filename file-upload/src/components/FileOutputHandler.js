import React, { useEffect, useState } from "react";
import axios from "axios";

function FileOutputHandler() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Submitted Users</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <img
              src={`http://localhost:3001${user.picture}`}
              alt={user.name}
              width="100"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileOutputHandler;

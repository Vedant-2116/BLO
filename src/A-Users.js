import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const AUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // Holds the user being edited
  const [editFormData, setEditFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    role: ''
  });

  useEffect(() => {
    // Fetch user details from the backend
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch users from backend API
      const response = await fetch('http://localhost:5001/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (userId) => {
    // Find the user being edited
    const userToEdit = users.find(user => user._id === userId);
    setEditingUser(userToEdit);

    // Populate the edit form data
    setEditFormData({
      fullName: userToEdit.fullName,
      email: userToEdit.email,
      username: userToEdit.username,
      role: userToEdit.role
    });
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/users/${userId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('User deleted successfully');
        // Refresh the user list after deleting user
        fetchUsers();
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditFormChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setEditFormData({
      ...editFormData,
      [fieldName]: fieldValue
    });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5001/api/users/${editingUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });
      if (response.ok) {
        console.log('User data updated successfully');
        // Refresh the user list after updating user data
        fetchUsers();
      } else {
        console.error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
    // Once successful, reset editingUser and editFormData states
    setEditingUser(null);
    setEditFormData({
      fullName: '',
      email: '',
      username: '',
      role: ''
    });
  };

  return (
    <div>
      <h1>Users</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleEdit(user._id)}>
                    <FontAwesomeIcon icon={faUserEdit} />
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(user._id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editingUser && (
        <form onSubmit={handleEditFormSubmit}>
          <TextField
            name="fullName"
            label="Full Name"
            value={editFormData.fullName}
            onChange={handleEditFormChange}
          />
          <TextField
            name="email"
            label="Email"
            value={editFormData.email}
            onChange={handleEditFormChange}
          />
          <TextField
            name="username"
            label="Username"
            value={editFormData.username}
            onChange={handleEditFormChange}
          />
          <FormControl>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={editFormData.role}
              onChange={handleEditFormChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit">Submit</Button>
        </form>
      )}
    </div>
  );
};

export default AUsers;

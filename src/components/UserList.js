// UserList.js
import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import UserForm from './UserForm';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../actions/userActions';

const UserList = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const handleEdit = user => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleDelete = userId => {
    dispatch(deleteUser(userId));
  };

  return (
    <div className='m-3'>
      <Button className='my-4' onClick={() => setShowForm(true)}>Add User</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>DOB</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.users?.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.dob}</td>
              <td>{user.address}</td>
              <td>
                <Button className='me-2' onClick={() => handleEdit(user)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <UserForm
        show={showForm}
        handleClose={() => {
          setShowForm(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />
    </div>
  );
};

export default UserList;

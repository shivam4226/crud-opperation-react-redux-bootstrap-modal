import React from 'react';
import "../App.css"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../actions/userActions';
import { Modal, Button, Form } from 'react-bootstrap';

const UserForm = ({ show, handleClose, user }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    mobile: Yup.string().required('Mobile is required'),
    dob: Yup.date().required('Date of Birth is required'),
    address: Yup.string().required('Address is required'),
  });

  const initialValues = {
    name: user ? user.name : '',
    email: user ? user.email : '',
    mobile: user ? user.mobile : '',
    dob: user ? user.dob : '',
    address: user ? user.address : '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,  // Add this line
    onSubmit: values => {
      if (user) {
        dispatch(updateUser({ id: user.id, updatedUser: values }));
      } else {
        const newUser = { ...values, id: Date.now() };
        dispatch(addUser(newUser));
      }
      handleClose();
      formik.resetForm();
    },
  });

  return (
    <Modal show={show} onHide={handleClose} onClick={() => {formik.resetForm()}}>
      <Modal.Header closeButton>
        <Modal.Title>{user ? 'Edit User' : 'Add User'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          {/* Name */}
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
            )}
          </Form.Group>

          {/* Email */}
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </Form.Group>

          {/* Mobile */}
          <Form.Group controlId="mobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <div className="error">{formik.errors.mobile}</div>
            )}
          </Form.Group>

          {/* Date of Birth */}
          <Form.Group controlId="dob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formik.values.dob}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.dob && formik.errors.dob && (
              <div className="error">{formik.errors.dob}</div>
            )}
          </Form.Group>

          {/* Address */}
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address && (
              <div className="error">{formik.errors.address}</div>
            )}
          </Form.Group>

          <div className='float-end'>
            <Button variant="primary" type="submit" className='me-2'>
              {user ? 'Update' : 'Add'}
            </Button>
            <Button variant="secondary" onClick={() => {
              handleClose();
              formik.resetForm();
            }}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserForm;

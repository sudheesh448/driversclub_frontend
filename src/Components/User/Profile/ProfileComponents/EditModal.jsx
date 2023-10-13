import React, { useState } from 'react';

function EditModal({ isOpen, onRequestClose, userDetails, onSave }) {
  const [editedDetails, setEditedDetails] = useState({ ...userDetails });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(editedDetails);
    onRequestClose();
  };

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`}>
      <div className="modal-content">
        <h2>Edit User Details</h2>
        <form onSubmit={handleSubmit}>
          {/* Edit user details form */}
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedDetails.name}
            onChange={handleChange}
          />
          {/* Add other fields for editing */}
          <button type="submit">Save</button>
        </form>
        <button onClick={onRequestClose}>Close</button>
      </div>
    </div>
  );
}

export default EditModal;

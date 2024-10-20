import React, { useState } from "react";
import axios from "axios";

function FileInputHandler() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState(null);
  const [submittedUser, setSubmittedUser] = useState(null);

  const handlePictureChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !picture) {
      console.log("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("picture", picture);

    try {
      const response = await axios.post(
        "http://localhost:3001/submit",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSubmittedUser(response.data.user);
      setName("");
      setEmail("");
      setPicture(null);
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <div className="App">
      <h1>Submit Your Information</h1>

      {/* Form to submit name, email, and picture */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input type="file" onChange={handlePictureChange} required />
        <button type="submit">Submit</button>
      </form>

      {/* Display submitted user info */}
      {submittedUser && (
        <div>
          <h2>Submitted User:</h2>
          <p>Name: {submittedUser.name}</p>
          <p>Email: {submittedUser.email}</p>
          <img
            src={`http://localhost:3001${submittedUser.picture}`}
            alt={submittedUser.name}
            width="300"
          />
        </div>
      )}
    </div>
  );
}

export default FileInputHandler;

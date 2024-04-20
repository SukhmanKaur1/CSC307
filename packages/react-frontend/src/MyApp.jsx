// src/MyApp.js

import React, { useState, useEffect } from 'react';
import Table from './Table';
import Form from './Form';

function MyApp() {
  const [characters, setCharacters] = useState([]);

  // Function to fetch users from the backend
  function fetchUsers() {
    return fetch('http://localhost:8000/users')
      .then((res) => res.json());
  }

  // Function to remove a character from the list
  function removeOneCharacter(index) {
    const updatedCharacters = characters.filter((_, i) => i !== index);
    setCharacters(updatedCharacters);
  }

  // Function to update the list with a new character
  function updateList(person) { 
    postUser(person)
      .then(() => fetchUsers())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      })
  }

  // Function to post a new user to the backend
  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  // Effect hook to fetch users when the component mounts
  useEffect(() => {
    fetchUsers()
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;

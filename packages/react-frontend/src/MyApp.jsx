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
  function removeOneCharacter(id) {
  const url = `http://localhost:8000/users/${id}`; // Construct the URL
  console.log('DELETE URL:', url); // Log the constructed URL

  fetch(url, {
    method: 'DELETE',
  })
    .then((res) => {
      if (res.ok) {
        // Successful delete (204 status code)
        const updatedCharacters = characters.filter((character) => character.id !== id);
        setCharacters(updatedCharacters);
      } else if (res.status === 404) {
        // User not found
        throw new Error('User not found');
      } else {
        // Handle other error cases
        throw new Error('Failed to delete user');
      }
    })
    .catch((error) => {
      console.log(error);
    });
}  



  // Function to update the list with a new character
  function updateList(person) { 
    postUser(person)
      .then((res) => {
        if (res.status === 201) { // Check for 201 status code
          return fetchUsers();
        } else {
          throw new Error('Failed to create user');
        }
      })
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      })
  }

  // Function to post a new user to the backend
  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
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
        removeCharacter={removeOneCharacter} // Pass the removeOneCharacter function to the Table component
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;

import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";


function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const updatedCharacters = characters.filter((_, i) => i !== index);
    setCharacters(updatedCharacters);
  }
 
  function updateList(person) {
    setCharacters([...characters, person]);
  }

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

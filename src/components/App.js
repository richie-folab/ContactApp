import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./CardDetail";
import DeleteContact from "./DeleteContact";
import EditContact from "./EditContact";

import { uuid } from "uuidv4";
import api from "../api/contacts";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const addContactHandler = async (contact) => {
    //Add new contact to previous list of contacts
    const request = {
      id: uuid(),
      ...contact,
    };

    const response = await api.post("/contacts", request);

    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);

    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactLisit = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactLisit);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);

    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });

      setSearchResult(newContactList);
    } else {
      setSearchResult(contacts);
    }
  };

  //Retrieve record on initial render
  useEffect(() => {
    api.get("/contacts").then((response) => {
      setContacts(response.data);
    });

    //getAllContacts();
  }, []);

  //Store in Local storage upon the change of the state, contacts
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={searchTerm.length < 1 ? contacts : searchResult}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />
          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />
          <Route path="/contact/:id" component={ContactDetail} />

          {/* <Route exact path="/delete/:id" component={ContactDelete} /> */}
          <Route
            path="/delete/:id"
            exact
            render={(props) => (
              <DeleteContact
                {...props}
                // contacts={contact}
                getContactId={removeContactHandler}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

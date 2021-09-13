import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./CardDetail";
import ContactDelete from "./ContactDelete";
import { uuid } from "uuidv4";
import api from "../api/contacts";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  // //Retrieve Contacts from API
  // const retrieveContacts = async () => {
  //   // try {
  //   const response = api.get("/contacts");

  //   console.log("response", response.data);

  //   return response.data;
  //   // } catch (error) {
  //   //   console.log("error", error);
  //   // }

  //   // const response = await api.get("/contacts");

  //   // console.log("response", response.data);

  //   // return response.data;

  //   // // await api.get("/contacts").then((response) => {
  //   // //   console.log("response", response.data);

  //   // //   return response.data;
  //   // // });
  // };

  const addContactHandler = (contact) => {
    //Add new contact to previous list of contacts
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactLisit = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactLisit);
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
                contacts={contacts}
                getContactId={removeContactHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />

          <Route path="/contact/:id" component={ContactDetail} />

          {/* <Route exact path="/delete/:id" component={ContactDelete} /> */}
          <Route
            path="/delete/:id"
            exact
            render={(props) => (
              <ContactDelete
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

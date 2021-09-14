import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const inputElement = useRef("");
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  const renderedContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        key={contact.id}
        contact={contact}
        clickHandler={deleteContactHandler}
      />
    );
  });

  const getSearchTerm = () => {
    props.searchKeyword(inputElement.current.value);
  };

  return (
    <div className="main">
      <br />
      <h2>
        Contact List
        <Link to="/add">
          <div style={{ float: "right" }}>
            <button className="ui button blue right">Add Contact</button>
          </div>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input" style={{ width: "100%" }}>
          <input
            ref={inputElement}
            type="text"
            placeholder="Search Contact"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderedContactList.length > 0
          ? renderedContactList
          : "No contact available"}
      </div>
    </div>
  );
};

export default ContactList;

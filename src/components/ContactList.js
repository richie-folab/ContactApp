import React from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };
  console.log("props", props);
  const renderedContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        key={contact.id}
        contact={contact}
        clickHandler={deleteContactHandler}
      />
    );
  });

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
        <div className="ui icon input">
          <input type="text" placeholder="Search Contact" className="prompt" />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">{renderedContactList}</div>
    </div>
  );
};

export default ContactList;

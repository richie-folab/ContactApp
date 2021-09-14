import React from "react";
// import { Link } from "react-router-dom";
import user from "../images/user.jpeg";

const DeleteContact = (props) => {
  const { id, name, email } = props.location.state.contact;

  const onDeleteContact = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to delete")) {
      props.getContactId(id);
      props.history.push("/");
    }
  };

  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="descripion">{email}</div>
        </div>
      </div>
      <div className="center-div" style={{ textAlign: "center" }}>
        {/* <Link to="/"> */}
        <button
          className="ui button blue center"
          onClick={(e) => onDeleteContact(id)}
        >
          Delete Contact
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default DeleteContact;

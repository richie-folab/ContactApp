import React from "react";

class EditContact extends React.Component {
  constructor(props) {
    super(props);

    const { id, email, name } = props.location.state.contact;
    this.state = { id, name, email };
  }

  edit = (e) => {
    e.preventDefault();

    if (this.state.name === "" || this.state.email === "") {
      alert("All the fields are mandatory");
      return;
    }

    //Call the callback function of the parent component
    this.props.updateContactHandler(this.state);
    this.setState({ name: "", email: "" });

    //programmatically redirect to home page
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="ui main">
        <h2>Edit Contact</h2>
        <div className="ui form">
          <form className="ui form" onSubmit={this.edit}>
            <div className="ui field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <div className="ui field">
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
            <button className="ui button blue">Update</button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditContact;

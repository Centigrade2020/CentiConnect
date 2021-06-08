import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  state = {
    usernames: ["dharunvs", "dharundds", "hrithik69"],
    searchTerm: " ",
  };

  editSearchTerm = (e) => {
    this.setState({
      searchTerm: e.target.value.trim === "" ? " " : e.target.value,
    });
    var a = e.target.value.trim();
    var b = a.trim();
    console.log(b);
  };

  dynamicSearch = () => {
    return (
      <ul>
        {this.state.usernames
          .filter((name) =>
            name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
          )
          .map((name) => (
            <li key={name}>{name}</li>
          ))}
      </ul>
    );
  };

  render() {
    return (
      <div className="Search">
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.editSearchTerm}
          placeholder="Search"
        />
        <div>{this.dynamicSearch()}</div>
      </div>
    );
  }
}

export default SearchBar;

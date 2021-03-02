import { useEffect, useState } from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function apiGetUsers() {
  return fetch("https://api.github.com/users?per_page=5").then((data) =>
    data.json()
  );
}

function apiGetUserByNickname(nickname) {
  return fetch(`https://api.github.com/users/${nickname}`).then((data) =>
    data.json()
  );
}

function Home() {
  const data = [
    { id: 1, name: "Jose" },
    { id: 2, name: "Mirian" }
  ];
  let [users, setUsers] = useState(data);

  useEffect(() => {
    let mounted = true;
    apiGetUsers().then((items) => {
      if (mounted) {
        setUsers(items);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div className="App">
      <h2>Top Five Github Users</h2>
      <h4>Tab the username see more information</h4>

      {users.map((item) => (
        <Link
          to={{ pathname: `/user/${item.login}`, query: {} }}
          className={"btn btn-primary"}
          key={item.id}
          params={{ testvalue: "hello" }}
        >
          {item.login}
        </Link>
      ))}
    </div>
  );
}

function UserProfile(props) {
  const nickname = props.match.params.nickname;

  const [user, setUser] = useState({});
  useEffect(() => {
    let mounted = true;
    apiGetUserByNickname(nickname).then((data) => {
      if (mounted) {
        setUser(data);
      }
    });
    return () => (mounted = false);
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Image
            roundedCircle
            style={{ width: "100%" }}
            src="https://rapidapi-prod-apis.s3.amazonaws.com/109e9fba-8ff5-45af-8e31-95f392c88bd0_medium"
          />
        </div>
        <div className="col-8">
          <h3>{user.name}</h3>
          <p>{user.location}</p>
        </div>
      </div>
    </div>
  );
}

const App = () => {
  const [isHome, setIsHome] = useState(false);

  return (
    <Router>
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="d-flex bd-highlight">
            <div className="p-2 flex-fill bd-highlight">
              <Link
                to="/"
                style={(styleLinkHeader, { display: !isHome ? "" : "none" })}
              >
                &#8249; Back
              </Link>
            </div>
            <div className="p-2 flex-fill justify-content-center">
              <span style={styleLinkHeader}>Home</span>
            </div>
          </div>
        </nav>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/user/:nickname" component={UserProfile} />
      </div>
    </Router>
  );
};

const styleLinkHeader = {
  color: "#fff"
};
export default App;

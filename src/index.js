import React, { Component, StrictMode } from "react";
import ReactDOM from "react-dom/client";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

const Image = ({ picture, name }) => <img src={picture.medium} alt={name.first} id='image' />;

const Name = ({ name }) => <h2>{name.title} {name.first} {name.last}</h2>;

const Email = ({ email }) => <p><span>{email}</span></p>;

const UserName = ({ login }) => <p><span>{login.username}</span></p>;

const Age = ({ age }) => <p>{age.age}</p>;

const Phone = ({ phone }) => <p><span>{phone}</span></p>;

const Address = ({ location }) => {
  const {street, city, state, country} = location;
  return (
    <p><span>{street.number} {street.name}, {city}, {state}, {country}</span></p>
  )
}
const Button = () => <button onClick={() => window.location.reload(true)}>Next User</button>
class RandomUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loading: false,
    };
  }

  componentDidMount() {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          users: response.results,
          loading: true,
        });
      });
  }

  render() {
    let { users, loading } = this.state;

    if (!loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <main>
          <section>
            {users.map((user) => (
              <div>
                <div>
                  <Image picture={user.picture} name={user.name} />
                </div>
                <div>
                  <Name name={user.name} />
                  <Age age={user.dob} />
                  <UserName login={user.login} />
                  <Email email={user.email} />
                  <Phone phone={user.phone} />
                  <Address location={user.location} />
                  <div>
                    <Button />
                  </div>
                </div>
              </div>
            ))}
          </section>
        </main>
      );
    }
  }
}
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <StrictMode>
    <RandomUsers />
  </StrictMode>
);

import React, { Component, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import './index.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

const Image = ({ picture, name }) => <img src={picture.medium} alt={name.first} id='image' className="object-top rounded-full mx-auto"/>;

const Name = ({ name }) => <h2 className="text-center text-3xl">{name.title} {name.first} {name.last}</h2>;

const Email = ({ email }) => <p className="flex flex-wrap align-items-center py-4">Email: <span> {email}</span></p>;

const UserName = ({ login }) => <p className="flex align-items-center gap-3 py-4 pb-2">Username: <span>{login.username}</span></p>;

const Age = ({ age }) => <p className="text-center text-2xl"> Age: {age.age}</p>;

const Phone = ({ phone }) => <p className="flex align-items-center gap-3 py-4 pb-2">Phone No:  <span>{phone}</span></p>;

const Address = ({ location }) => {
  const {street, city, state, country} = location;
  return (
    <p className="py-4">Address: <span>{street.number} {street.name}, {city}, {state}, {country}</span></p>
  )
}
const Button = () => <button className="" onClick={() => window.location.reload(true)}>Next User</button>
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
          <section className="max-w-full max-h-screen bg-blue-500 flex justify-center items-center py-20">
            {users.map((user) => (
              <div className="sm:w-67 bg-red-300 py-8 px-12 max-w-md">
                <div>
                  <Image picture={user.picture} name={user.name} />
                </div>
                <div className="pt-3">
                  <Name name={user.name} />
                  <Age age={user.dob} />
                  <UserName login={user.login} />
                  <Email email={user.email} />
                  <Phone phone={user.phone} />
                  <Address location={user.location} />
                  <div className="py-3 text-center bg-purple-300 rounded-3xl">
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

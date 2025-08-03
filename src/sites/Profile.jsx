import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {

  const [user, setUser] = useState(null)

  const loadProfile = async () => {

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post("https://192.168.1.88:3000/account/profile", { withCredentials: true }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      setUser(response.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return <div>
    <h1>Login: {user?.login}</h1>
    <p>Credentials: {user?.firstName} {user?.lastName}</p>
    <p>birthday: {user?.birthDate}</p>
    <p>email: {user?.email}</p>
    <p>phone number: {user?.phoneNumber}</p>
  </div>;
};

export default Profile;

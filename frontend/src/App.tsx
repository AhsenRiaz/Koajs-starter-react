import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      const finalResult = result.data;
      console.log("FINAL_RESULT", finalResult.username);
      setUser(finalResult);
    } catch (err) {}
  };

  const handleDelete = async (id: number) => {
    setSuccess(false);
    setError(false);
   
    try {
      console.log("accesstoken>>>" , user.accessToken)
      await axios.delete("http://localhost:5000/api/users/"+id, {
        method: "DELETE",
        headers: {
          authorization:"Bearer " + user.accessToken,
        },
      });
      setSuccess(true)
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="container">
      {user ? (
        <div className="home">
          <span>
            Welcome to the <b>{user.isAdmin ? "admin" : "user"}</b> dashboard{" "}
            <b>{user.username}</b>.
          </span>
          <span>Delete Users:</span>
          <button className="deleteButton" onClick={() => handleDelete(1)}>
            Delete John
          </button>
          <button className="deleteButton" onClick={() => handleDelete(2)}>
            Delete Jane
          </button>
          <h1>Login success</h1>
          {error && (
            <span className="error">
              You are not allowed to delete this user!
            </span>
          )}
          {success && (
            <span className="success">
              User has been deleted successfully...
            </span>
          )}
        </div>
      ) : (
        <div className="login" onSubmit={handleSubmit}>
          <form>
            <span className="formTitle">Lama Login</span>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submitButton">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;

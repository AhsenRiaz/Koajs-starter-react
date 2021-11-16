import React, { useEffect, useState } from "react";
import "./App.css";

type ItemsArray = {
    name : string
};

function App() {
  const [message, setMessage] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [items , setItems] = useState<ItemsArray[]>([])
  
  const addPost = async () => {
    try {
      const api = "http://localhost:5000/add";
      const returnedData = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: task,
        }),
      });
      setTask("");
      const data = await returnedData.json();
      setItems(data.data)
      console.log(data)
      
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const api = "http://localhost:5000/";
        const data = await (await fetch(api)).json();
        setMessage(data.message);
        addPost()
      } catch (err) {
        console.log("err", err);
      }

    })();
  }, []);

  useEffect(() => {

  },[addPost])

  return (
    <div className="app">
      <h1>Hello Koa</h1>
      <h3>{message}</h3>
      {items.map((arr) => {
        return (
          <h5>{arr.name}</h5>
        )
      })}
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button style={{width:"5rem" , marginLeft:"2rem", height:"2rem"}} disabled={task.length < 2} onClick={addPost}>Hey</button>
    </div>
  );
}

export default App;

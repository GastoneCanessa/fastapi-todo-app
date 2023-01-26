import { useState, useEffect } from "react";
import Script from 'next/script'

export default function About() {

  var setBody = "";
  var data = ''
  // const res = []
  const res = useState("");

  const handleCreate = () => {

    console.log({setBody});

    console.log({res});


    fetch('http://0.0.0.0:4000/open_ai/insert/' ,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"insert":setBody}),
    })

    .then(response =>response.json())
    .then(response => response.output)
    .then(response => {data=response})
    .then(response => {
      var x =document.getElementById("input").value
      document.getElementById("input").value = `${x}\n\n# ${setBody}\n\n${data}`
      document.getElementById("input2").value = ``
    })

}

  return (
    <div className="bod">
    <div className="card">
    <h2><b>Playground</b></h2>
    <form className="form">
      <div className="mb-4">
      <textarea rows="4" cols="50"
        id="input"
        type="text"
      ></textarea>
      <textarea rows="4" cols="50"
        type="text"
        id="input2"

        placeholder="Type something"
        onChange={(e) => setBody=e.target.value}
      ></textarea>

    </div>
    </form>
    <div className="button">
      <button className="button-b" type="button" onClick={handleCreate}>
        <b>Submit</b>
      </button>
    </div>
    </div>
  </div>
  );
}

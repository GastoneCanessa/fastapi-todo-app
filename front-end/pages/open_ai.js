import { useState, useEffect } from "react";
import Script from 'next/script'

const renderPosts = (data, setBody) => {
  let inputValue = document.getElementById("input").value;
  document.getElementById("input").value = `${inputValue}\n\n# ${setBody}\n\n${data}`
  document.getElementById("input2").value = ``
}

const insertData = async (setBody, res) => {
  console.log({ setBody });
  console.log({ res });
  const jsonResponse = await fetchData(setBody);
  const { output } = jsonResponse;
  let data = output;
  renderPosts(data, setBody);
}

const fetchData = async (setBody) => {
  try {
    const response = await fetch('http://127.0.0.1:4000/open_ai/insert/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "insert": setBody }),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}


export default function () {

  const handleCreate = () => {
    fetchData()
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

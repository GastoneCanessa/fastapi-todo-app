import { useState, useEffect } from "react";
import Script from 'next/script'

const renderPosts = (data, prompt) => {
  let inputValue = document.getElementById("input").value;
  document.getElementById("input").value = `${inputValue}\n\n# ${prompt}\n\n${data}`
  document.getElementById("input2").value = ``
}

const insertData = async (prompt, res) => {
  console.log({ prompt });
  console.log({ res });
  const jsonResponse = await fetchData(prompt);
  const { output } = jsonResponse;
  let data = output;
  renderPosts(data, prompt);
}

const fetchData = async (prompt) => {
  console.log(`fetch - body: ${JSON.stringify(prompt)}`)
  try {
    const response = await fetch('http://127.0.0.1:4000/open_ai/insert/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "insert": prompt }),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}

export default function () {

  let prompt = ""

  const handleCreate = () => {
    fetchData(prompt)
  }

  return (
    <div className="bod">
      <div className="card">
        <h2>
          OpenAI Codex demo
        </h2>
        <form className="form">
          <div className="mb-4">
            <label className="textarea_label">Code block:</label>
            <textarea rows="4" cols="50" type="text" class="prompt_textarea" placeholder="Type something" onChange={(e) => prompt = e.target.value}
            ></textarea>
          </div>
        </form>
        <div className="button">
          <button className="button-b" type="button" onClick={handleCreate}>
            <b>Submit</b>
          </button>
        </div>


        <div className="ouput">
          <h2>Output</h2>
          <pre class="outputCode">
            ...
          </pre>
        </div>
      </div>
    </div>
  );
}

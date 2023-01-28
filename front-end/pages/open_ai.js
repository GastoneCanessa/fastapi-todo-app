import { useState, useEffect } from "react";
import Script from 'next/script'

const fetchHeaderJSON = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

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
  const payload = { "insert": prompt }
  try {
    const response = await fetch('/api/open_ai', {
      method: 'POST',
      headers: fetchHeaderJSON,
      body: JSON.stringify(payload),
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
            <textarea rows="4" cols="50" type="text" className="prompt_textarea" placeholder="def your_function(): # ..." onChange={(e) => prompt = e.target.value}
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
          <pre className="outputCode">
            ...
          </pre>
        </div>
      </div>
    </div>
  );
}

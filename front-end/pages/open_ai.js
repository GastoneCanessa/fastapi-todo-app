import { useState, useEffect } from "react"

const fetchHeaderJSON = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const fetchData = async (prompt) => {
  console.log(`fetch - body: ${JSON.stringify(prompt)}`)
  const payload = { "prompt": prompt }
  try {
    const resp = await fetch('/api/open_ai', {
      method: 'POST',
      headers: fetchHeaderJSON,
      body: JSON.stringify(payload),
    })
    let out = await resp.json()
    out = out.output
    return out
  } catch (err) {
    console.error(err)
  }
}

export default function () {

  let prompt = ""
  const [output, setOutput] = useState(null)

  const handleCreate = async () => {
    const out = await fetchData(prompt)
    setOutput(out)
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
            {output}
          </pre>
        </div>
      </div>
    </div>
  )
}

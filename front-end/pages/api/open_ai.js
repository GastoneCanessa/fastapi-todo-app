const fetchData = async (prompt) => {
  console.log(`fetch - prompt: ${JSON.stringify(prompt)}`)
  try {
    const response = await fetch('http://127.0.0.1:4000/open_ai/insert/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ insert: prompt }),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}

export default async function handler(req, res) {
  const params = req.body
  const prompt = params.prompt
  const respData = await fetchData(prompt)
  console.log("respData:", respData)
  const data = {
    output: respData.output
  }
  res.status(200).json(data)
}

function fetchFlask(url, method, content) {
  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  })
    .then((res) => {
      return res.json();
    })
    .then((text) => {
      console.log(text);
      return text;
    });
}

export default fetchFlask;

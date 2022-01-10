function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  //   Client.checkForName(formText);
  console.log("::: Form Submitted :::");
  if (Client.checkForName(formText)) {
    fetch("http://localhost:8080/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({
        url: formText,
      }),
    })
      // .then((res) => res.json())
      .then((res) => {
        console.log("RESPONSE, WAITING TO PARSE...", res);
        return res.json();
      })
      .then((data) => {
        console.log("DATA PARSED...");
        document.getElementById("results").innerHTML = data.subjectivity;
        console.log(data);
        console.log(data.status.code);
        console.log(formText);
        if (data.status.code === "212") {
          alert("Please validate your input URL");
        }
      })
      .catch((e) => {
        console.log("OH NO! ERROR!", e);
      });
  } else {
    if (formText === "") {
      alert("Text field can't be empty. Please type in a value.");
    } else {
      alert("Please type a valid URL");
    }
  }
}

export { handleSubmit };

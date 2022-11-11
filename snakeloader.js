//
// SnakeLoader - Silasss 2021
//
function downloadScript(url, execute) {
  fetch(url)
    .then((response) => response.text())
    .then((responseText) => {
      eval(responseText + execute)
    }).catch(function (err) {
      alert("Error: Script couldn't be downloaded.\n\n" + err)
    });
}

// Load stylesheet
var snakeloader_style = document.createElement("style");
snakeloader_style.innerHTML = `#snakeloader-overlay {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(100, 100, 100, 0.3);
  display:flex;
  align-items:center;
  justify-content: center;
  z-index: 500000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
#snakeloader-box {
  padding: 15px;
  position: fixed;
  background-color: #FFF;
  display:flex;
  align-items:center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #AAA;
}
#snakeloader-select {
  margin: 5px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: white;
  color: black;
}
#snakeloader-download {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 5px;
  border: none;
  border-radius: 5px;
  color: black;
  background-color: #CCC;
}
#snakeloader-download:hover {
  cursor: pointer;
}
#snakeloader-download:active {
  padding: 3.5px;
}
#snakeloader-text {
  font-size: 1.5em;
  margin: 5px;
  text-align: center;
  color: black;
}
.snakeloader-option {
  background-color: white;
  color: black;
}
`;
document.getElementsByTagName("head")[0].appendChild(snakeloader_style);
// Load UI
var htmlUI = `
<div id="snakeloader-overlay">
  <div id="snakeloader-box">
    <span id="snakeloader-text">AnyLoader</span>
    <select id="snakeloader-select">
    </select>
    <button id="snakeloader-download">Download</button>
  </div>
</div>
`
// Append UI
document.body.insertAdjacentHTML('beforeend', htmlUI);
var mainUIElement = document.getElementById("snakeloader-overlay")
var selectElement = document.getElementById("snakeloader-select")
var downloadElement = document.getElementById("snakeloader-download")

// Fancy stuff
downloadElement.onclick = function () {
  downloadScript(selectElement.value, selectElement.options[selectElement.selectedIndex].getAttribute("execute"))
  mainUIElement.remove()
}

fetch("https://raw.githubusercontent.com/doot-doot-maker/AnyLoader/main/mods.json", {cache: "no-store"})
  .then((response) => response.json())
  .then((responseJSON) => {
    responseJSON.programs.forEach(function (program) {
      var option = document.createElement("option");
      option.innerText = program.name;
      option.value = program.url;
      option.setAttribute("execute", program.execute)
      selectElement.appendChild(option);
    })
  });

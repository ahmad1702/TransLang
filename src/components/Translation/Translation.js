import React, { useEffect, useRef } from "react";
// import "./Translation.scss";
import DlineChart2 from "../DLineChart2/DlineChart2";

export default function Translation() {
  
  const treeModule = useRef(null);
  const goToTreeModule = () =>
    window.scrollTo({ top: treeModule.current.offsetTop, behavior: "smooth" });
  let langFull = [];
  let langAbr = [];
  let drop1 = document.getElementById("myDropdown1");
  let drop2 = document.getElementById("myDropdown2");

  // Get Request that will return the languages available to use
  // Also Update the dropdowns with these available languages
  const getRequest = () => {
    var xhr = new XMLHttpRequest();
    xhr.onload = (data) => {
      let d = JSON.parse(xhr.response);
      // This gets the number of languages available
      const len = Object.keys(d).length;

      // Declaration of a Current Language value
      let currLang = "";
      let currLangAbr = "";
      // The first dropdown that is the language to be translated from
      let drop1 = document.getElementById("myDropdown1");

      // Creates a dropdown list of all the api-compatible languages, using the get request
      for (let i = 0; i < len; i++) {
        // Gets the Current Language of this iteration by parsing the json
        currLang = d[i]["name"];

        /* Saves the current languages abreviation for later use in the post request,
         in which the api needs to recieve an abbreviation of the language requested */
        currLangAbr = d[i]["code"];

        // Displays it to the console for testing Purposes
        console.log(currLang);
        // Appending a new <option> Element to the dropdown
        let aLang = document.createElement("option");
        aLang.href = "#";
        // The value of this new element is going to be its abbreviation for future reference
        aLang.value = currLangAbr;
        // Converting the current language string to a text node so that it can be addded to the option element
        let newLang = document.createTextNode(currLang);
        // Adds the text of the current language to the new option element
        aLang.appendChild(newLang);
        // Adds the option element to the dropdown
        drop1.appendChild(aLang);
      }

      // The second dropdown that is the language to be translated from
      let drop2 = document.getElementById("myDropdown2");
      // Declaration of the second variable
      let currLangAbr2;

      // Same as the first for loop, but just for the second dropdown
      for (let i = 0; i < len; i++) {
        // Gets the Current Language of this iteration by parsing the json
        currLang = d[i]["name"];

        /* Saves the current languages abreviation for later use in the post request,
         in which the api needs to recieve an abbreviation of the language requested */
        currLangAbr = d[i]["code"];
        // Displays it to the console for testing Purposes
        console.log(currLang);

        // Appending a new <option> Element to the dropdown
        let aLang = document.createElement("option");
        aLang.href = "#";
        // The value of this new element is going to be its abbreviation for future reference
        aLang.value = currLangAbr;
        // Converting the current language string to a text node so that it can be addded to the option element
        let newLang = document.createTextNode(currLang);

        // Adds the text of the current language to the new option element
        aLang.appendChild(newLang);
        // Adds the option element to the dropdown
        drop2.appendChild(aLang);
      }
      // This is to make spanish the default language of the second dropdown.
      drop2.value = "es";
    };
    xhr.open("GET", "https://libretranslate.com/languages");
    xhr.send();
  };
  // Calls the get request automatically
  getRequest();

  // The User's Input Text to be translated
  const userInput = document.getElementById("userInput");

  // The area in which the new translated text should be appended to
  let resultArea = document.getElementById("resultArea");

  async function postAwait() {
    let resultArea = document.getElementById("resultArea");
    let userInput = document.getElementById("userInput");

    resultArea.style.display = "none";
    // Shows a loading spinner while it waits for the api
    const loader = document.getElementById("loader");
    loader.style.display = "block";
    // When the loading bar spins, the resultArea should be empty
    //   resultArea.setAttribute("placeholder", "");
    if (userInput.value === "") {
      // If the input is emptry, alert the user
      alert("Please enter a valid input.");
    } else {
      // Else, Do the Post Request

      // Gets the Value of the Dropdown, Telling us the language to be translated
      const e = document.getElementById("myDropdown1");
      const currInputLang = e.options[e.selectedIndex].value;

      // Gets the value of the second dropdown, telling us the language to translate to
      const f = document.getElementById("myDropdown2");
      const curOutputLang = f.options[f.selectedIndex].value;

      // Gets the Text to be translated
      const userText = userInput.value;

      // Executes the Post Request
      const res = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        body: JSON.stringify({
          q: userText,
          source: currInputLang,
          target: curOutputLang,
          format: "text",
        }),
        headers: { "Content-Type": "application/json" },
      });
      // Hides the loading circle
      loader.style.display = "none";
      // Saves the response from the api
      let apiResult = await res.json();
      // Sets the bottom text area to the new translated text
      resultArea.style.display = "block";
      resultArea.innerHTML = apiResult["translatedText"];
      console.log(apiResult["translatedText"]);
    }
  }
  // useEffect(() => {
  //   const areainput = document.getElementById("userInput");
  //   areainput.addEventListener("keydown", handleEnter);
  // })
  //   function handleEnter(event) {
  //     if (event.key === "enter") {
  //       console.log("enter was pressed");
  //       // Creates a post request
  //       // postAwait();

  //       /* Makes it so that the enter doesnt start a new line,
  //                 for user experience */
  //       event.preventDefault();
  //     }
  //   };
    
    useEffect(() => {
      const areainput = document.getElementById("userInput");
      //   This allows the user to submit using the 'Enter' Key
      areainput.addEventListener("keydown", function (t) {
        if (t.code === "Enter") {
          // Creates a post request
          postAwait();

          /* Makes it so that the enter doesnt start a new line,
          for user experience */
          t.preventDefault();
        }
      });
    });
  return (
    <div className="Translation">
      <div>
        <div className="heading">
          {/* <img src="../../../resources/assets/img/lab_5/globe.svg" alt="" style="height: 50px; width: auto;"> */}
          <div className="logotitle" style={{ display: "flex" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon"
              viewBox="0 0 512 512"
            >
              <title>Globe</title>
              <path d="M340.75 344.49c5.91-20.7 9.82-44.75 11.31-67.84a4.41 4.41 0 00-4.46-4.65h-71.06a4.43 4.43 0 00-4.47 4.39v55.3a4.44 4.44 0 004.14 4.38 273.51 273.51 0 0159 11.39 4.45 4.45 0 005.54-2.97zM323.58 377.31a260.05 260.05 0 00-46.6-9.09 4.42 4.42 0 00-4.91 4.29v65.24a4.47 4.47 0 006.76 3.7c15.9-9.27 29-24.84 40.84-45.43 1.94-3.36 4.89-9.15 6.67-12.69a4.29 4.29 0 00-2.76-6.02zM235.29 368.4a256.85 256.85 0 00-46.56 8.82c-2.64.76-3.75 4.4-2.55 6.79 1.79 3.56 4 8.11 5.89 11.51 13 23 26.84 37.5 41.24 45.93a4.47 4.47 0 006.76-3.7v-65.27a4.16 4.16 0 00-4.78-4.08zM235.6 272h-71.06a4.41 4.41 0 00-4.46 4.64c1.48 23.06 5.37 47.16 11.26 67.84a4.46 4.46 0 005.59 3 272.2 272.2 0 0159-11.36 4.44 4.44 0 004.15-4.38V276.4a4.43 4.43 0 00-4.48-4.4zM277 143.78a235.8 235.8 0 0046.5-9.14 4.3 4.3 0 002.76-6c-1.79-3.57-4.27-8.68-6.17-12.09-12.29-22-26.14-37.35-41.24-46a4.48 4.48 0 00-6.76 3.7v65.23a4.43 4.43 0 004.91 4.3zM276.54 240h71.06a4.39 4.39 0 004.46-4.58c-1.48-22.77-5.27-47.8-11.16-68.22a4.46 4.46 0 00-5.59-2.95c-19 5.74-38.79 10.43-59.09 12a4.4 4.4 0 00-4.15 4.32v55.11a4.4 4.4 0 004.47 4.32zM233.31 70.56c-15.42 8.57-29.17 24.43-41.47 46.37-1.91 3.41-4.19 8.11-6 11.67a4.31 4.31 0 002.76 6 225.42 225.42 0 0046.54 9.17 4.43 4.43 0 004.91-4.29V74.26a4.49 4.49 0 00-6.74-3.7zM235.92 176.26c-20.3-1.55-40.11-6.24-59.09-12a4.46 4.46 0 00-5.59 2.95c-5.89 20.42-9.68 45.45-11.16 68.22a4.39 4.39 0 004.46 4.58h71.06a4.4 4.4 0 004.47-4.34v-55.09a4.4 4.4 0 00-4.15-4.32z" />
              <path d="M414.39 97.61A224 224 0 1097.61 414.39 224 224 0 10414.39 97.61zM176.6 430.85a219.08 219.08 0 01-12.48-19.66c-2-3.69-4.84-9.26-6.73-13.13a7.29 7.29 0 00-10.31-3.16c-4.3 2.41-10 5.72-14.13 8.43a147.29 147.29 0 01-23.57-22.43 248.83 248.83 0 0130.41-18.36c1.86-1 2.77-2.14 2.18-4.18a374.8 374.8 0 01-14.09-82.17 4.36 4.36 0 00-4.3-4.17H66.84a2 2 0 01-2-1.7A98.28 98.28 0 0164 256a96.27 96.27 0 01.86-14.29 2 2 0 012-1.7h56.74c2.29 0 4.17-1.32 4.29-3.63a372.71 372.71 0 0114-81.83 4.36 4.36 0 00-2.19-5.11 260.63 260.63 0 01-29.84-17.9 169.82 169.82 0 0123.14-22.8c4.08 2.68 9.4 5.71 13.66 8.11a7.89 7.89 0 0011-3.42c1.88-3.87 4-8.18 6.06-11.88a221.93 221.93 0 0112.54-19.91A185 185 0 01256 64c28.94 0 55.9 7 80.53 18.46a202.23 202.23 0 0112 19c2.59 4.66 5.34 10.37 7.66 15.32a4.29 4.29 0 005.92 1.94c5.38-2.91 11.21-6.26 16.34-9.63a171.36 171.36 0 0123.2 23 244.89 244.89 0 01-29.06 17.31 4.35 4.35 0 00-2.18 5.12 348.68 348.68 0 0113.85 81.4 4.33 4.33 0 004.3 4.12l56.62-.07a2 2 0 012 1.7 117.46 117.46 0 010 28.62 2 2 0 01-2 1.72h-56.67a4.35 4.35 0 00-4.3 4.17 367.4 367.4 0 01-13.87 81.3 4.45 4.45 0 002.19 5.19c5 2.59 10.57 5.48 15.37 8.42s9.55 6.08 14.13 9.34a172.73 172.73 0 01-23 22.93c-2.44-1.61-5.34-3.44-7.84-4.94-1.72-1-4.89-2.77-6.65-3.76-3.82-2.14-7.88-.54-9.79 3.4s-4.83 9.59-6.87 13.25a212.42 212.42 0 01-12.35 19.53C310.91 442.37 284.94 448 256 448s-54.77-5.63-79.4-17.15z" />
            </svg>
            <h1 style={{ margin: 0, fontWeight: 800 }}>TransLang</h1>
          </div>
          <div className="nav">
            <button
              type="button"
              className="treeRedirect"
              onClick={goToTreeModule}
            >
              Language Tree Module
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ionicon"
                viewBox="0 0 512 512"
              >
                <title>Arrow Down Circle</title>
                <path d="M256 464c114.87 0 208-93.13 208-208S370.87 48 256 48 48 141.13 48 256s93.13 208 208 208zm-91.36-212.65a16 16 0 0122.63-.09L240 303.58V170a16 16 0 0132 0v133.58l52.73-52.32A16 16 0 11347.27 274l-80 79.39a16 16 0 01-22.54 0l-80-79.39a16 16 0 01-.09-22.65z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="box-container">
          <div className="box">
            <div className="top">
              <div className="top-section">
                <div className="dropSelect">
                  <select id="myDropdown1" className="dropSelectMain" />
                </div>
                <button
                  type="button"
                  className="translateButton"
                  onClick={postAwait}
                >
                  Translate
                </button>
              </div>
              <textarea
                id="userInput"
                placeholder="Enter the text you wish to translate... 🤔"
                defaultValue={""}
                
                tabIndex="0"
              />
            </div>
            <div className="bottom">
              <div className="top-section">
                <div className="dropSelect">
                  {/* <button onclick="dropdown2()" class="dropbtn1">
            Dropdown <i class="fa-solid fa-angle-down"></i>
          </button>
          <div id="myDropdown2" class="dropdown1-content">
            <a href="#home">English</a>
            <a href="#about">Spanish</a>
            <a href="#contact">Portugese</a>
          </div> */}
                  <select id="myDropdown2" className="dropSelectMain" />
                </div>
              </div>
              <svg
                className="spinner"
                id="loader"
                width="65px"
                height="65px"
                viewBox="0 0 66 66"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="path"
                  fill="none"
                  strokeWidth={6}
                  strokeLinecap="round"
                  cx={33}
                  cy={33}
                  r={30}
                />
              </svg>
              <textarea
                id="resultArea"
                placeholder="Translation Station 🚂"
                defaultValue={""}
              />
              {/* <p id="resultText"></p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="thiscontainer" ref={treeModule}>
        <DlineChart2 />
      </div>
    </div>
  );
}

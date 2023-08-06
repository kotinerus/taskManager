const btnImportant = document.querySelectorAll(".btn_important");
const btnNewTask = document.querySelector(".btn_add");
const rowTask = document.querySelector(".main_container_flex_row_tasks_col");
const colDate = document.querySelector(".col_date");
const valueOf = new Date().getHours();
const nazwaWydarzenia = document.querySelector("#nazwaWydarzenia");
const dataWydarzenia = document.querySelector("#dataWydarzenia");
const godzinaWydarzenia = document.querySelector("#godzinaWydarzenia");
const kolorWydarzenia = document.querySelector("#kolorWydarzenia");
const btnImportantForm = document.querySelector(".btn_important_form");

let events = [];
let isImportant = 0;

btnImportantForm.addEventListener("click", function (e) {
  const element = e.currentTarget.firstChild;

  if (element.getAttribute("fill") == "currentColor") {
    element.setAttribute("fill", "red");
    element.setAttribute("value", 1);
    isImportant = element.getAttribute("value");
  } else {
    element.setAttribute("fill", "currentColor");
    element.setAttribute("value", 0);
    isImportant = element.getAttribute("value");
  }
});
const clearForm = () => {
  nazwaWydarzenia.value = "";
  dataWydarzenia.value = "";
  godzinaWydarzenia.value = "";
  btnImportantForm.firstChild.setAttribute("fill", "currentColor");
  isImportant = 0;
};

// DATE AND TIME
// colDate.innerHTML = `<h1>${
//   new Date().getHours().toLocaleString().length != 2 ? 0 : ""
// }${new Date().getHours()}:${
//   new Date().getMinutes().toLocaleString().length != 2 ? 0 : ""
// }${new Date().getMinutes()}</h1>`;

// const setTime = () => {
//   document.querySelector(".col_date").innerHTML = "";
//   const divBasicDate = document.createElement("div");
//   divBasicDate.innerHTML = `<h1>${
//     new Date().getHours().toLocaleString().length != 2 ? 0 : ""
//   }${new Date().getHours()}:${
//     new Date().getMinutes().toLocaleString().length != 2 ? 0 : ""
//   }${new Date().getMinutes()}</h1>`;
//   document.querySelector(".col_date").appendChild(divBasicDate);
// };
// setInterval(setTime, 1000);

class Event {
  constructor(nazwa, data, godzina, wazne) {
    this.nazwa = nazwa;
    this.data = data;
    this.godzina = godzina;
    this.wazne = wazne;
    if (this._checkValues()) return;
    this._newElementConstructor();
    this._addElementsToLocalStorage();
  }

  _checkValues() {
    if (this.nazwa == "" || this.data == "") {
      return true;
    } else {
      return false;
    }
  }

  _newElementConstructor() {
    const newElement = document.createElement("div");
    newElement.className =
      "dynamicEventsRow rounded-3  align-items-center g-1 m-1";
    //prettier-ignore
    newElement.innerHTML = `
    <div class="col-1  btn_important ">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="${isImportant==1? 'red':'curentColor'}" class="bi bi-exclamation-diamond" viewBox="0 0 16 16">
        <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"/>
        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
      </svg>
    </div>
    <div class="col-4 item text-center"><h3>${this.nazwa}</h3></div>
    <div class="col-5 item text-center"><h3>${this.data}${this.godzina != "" ? "," : ""} ${this.godzina}</h3></div>     
    <div class="col-1 btn btn_done">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
      </svg>
    </div>
    `;
    this._elementRender(newElement);
    this._addingButtonsFunctionality(newElement);
  }
  _elementRender(element) {
    rowTask.appendChild(element);
  }
  // Adding buttons functionality
  _addingButtonsFunctionality(element) {
    // this._importantButton(element);
    this._doneButton(element);
    this._questionButton(element);
  }

  //IMPORTANT BUTTON
  // _importantButton(element) {
  //   element
  //     .querySelector(".btn_important")
  //     .addEventListener("click", function () {
  //       this.querySelector("svg").getAttribute("fill") == "currentColor"
  //         ? this.querySelector("svg").setAttribute("fill", "red")
  //         : this.querySelector("svg").setAttribute("fill", "currentColor");
  //     });
  // }

  _swappingColorsOfSvg(color) {
    console.log(this.querySelector("svg").setAttribute("fill", color));
  }
  //DONE BUTTON
  _doneButton(element) {
    const elementBase = element.querySelector(".btn_done");
    elementBase.addEventListener("mouseenter", function () {
      this.querySelector("svg").setAttribute("fill", "rgb(129, 245, 66)");
    });

    elementBase.addEventListener("mouseleave", function () {
      this.querySelector("svg").setAttribute("fill", "currentColor");
    });
    elementBase.addEventListener("click", function (e) {
      element.remove();
    });
  }
  _questionButton(element) {
    const elementBase = element.querySelector(".btn_question");
    elementBase.addEventListener("mouseenter", function () {
      this.querySelector("svg").setAttribute("fill", "rgb(245, 245, 66)");
    });

    elementBase.addEventListener("mouseleave", function () {
      this.querySelector("svg").setAttribute("fill", "currentColor");
    });
  }
  _addElementsToLocalStorage() {
    events.push(this);

    const jsonArray = JSON.stringify(events);

    localStorage.setItem("eventsList", JSON.stringify(events)); // Why it's adding empty object?
  }
}

//Ading new event

btnNewTask.addEventListener("click", function (e) {
  // Tworzenie nowego elementu
  const event = new Event(
    nazwaWydarzenia.value,
    dataWydarzenia.value,
    godzinaWydarzenia.value,
    isImportant
  );
  console.log(isImportant);
  clearForm();
});
addingEventsFromLocalStorage();
function addingEventsFromLocalStorage() {
  const eventsList = JSON.parse(localStorage.getItem("eventsList"));

  if (!eventsList || events == null) return;
  eventsList.forEach((event) => {
    const newEvent = new Event(event["nazwa"], event["data"], event["godzina"]);
    //prettier-ignore
  });
}

const btnImportant = document.querySelector(".btn_important_form");
const btnNewTask = document.querySelector(".btn_add");
const rowTask = document.querySelector("#taskContainer");
// const colDate = document.querySelector(".col_date");
// const valueOf = new Date().getHours();
const nazwaWydarzenia = document.querySelector("#nazwaWydarzenia");
const dataWydarzenia = document.querySelector("#dataWydarzenia");
const godzinaWydarzenia = document.querySelector("#godzinaWydarzenia");

// const kolorWydarzenia = document.querySelector("#kolorWydarzenia");
const elementOne = document.querySelector(".bi-exclamation-diamond");
const btnNewEvent = document.querySelector(".addNewEventBtn");
const formDiv = document.querySelector(".main_container_flex_row");
const deleteBox = document.querySelector(".delete_check");
const btnNo = document.querySelector(".btn_no");
const btnYes = document.querySelector(".btn_yes");

let events = [];
let opened = false
btnNewEvent.addEventListener("click", function (e) {
opened? formDiv.style.display = "none": formDiv.style.display = "flex";
opened = !opened
});

btnImportant.addEventListener("click", function (e) {
  // const element = e.currentTarget.svg;

  if (elementOne.getAttribute("fill") == "#e6d5ec") {
    elementOne.setAttribute("fill", "red");
    e.currentTarget.setAttribute("value", 1);
  } else {
    elementOne.setAttribute("fill", "#e6d5ec");
    e.currentTarget.setAttribute("value", 0);
  }
});
const clearForm = () => {
  nazwaWydarzenia.value = "";
  dataWydarzenia.value = "2023-07-11";
  godzinaWydarzenia.value = "12:00";
  elementOne.setAttribute("fill", "#e6d5ec");
  btnImportant.setAttribute("value", 0);
};

class Event {
  constructor(nazwa, data, godzina, id, important) {
    this.nazwa = nazwa;
    this.data = data;
    this.godzina = godzina;
    this.id = id;
    this.important = important;

    if (this._checkValues()) {
      alert("Incomplete information has been entered");
      return;
    }
    this._newElementConstructor();
    events.push(this);
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
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="${this.important==1? 'red':'#e6d5ec'}" value=${this.important} class="bi bi-exclamation-diamond" viewBox="0 0 16 16">
        <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"/>
        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
      </svg>
    </div>
    <div class="col-4 item text-center"><h3>${this.nazwa}</h3></div>
    <div class="col-5 item text-center"><h3>${this.data}${this.godzina != "" ? "," : ""} ${this.godzina}</h3></div>     
    <div class="col-1 btn btn_done">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill='#e6d5ec'; value=${this.id} class="bi bi-check-lg" viewBox="0 0 16 16">
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
  }

  _addElementsToLocalStorage() {
    localStorage.setItem("eventsList", JSON.stringify(events)); // Why it's adding empty object?
  }
  //DONE BUTTON
  _doneButton(element) {
    const elementBase = element.querySelector(".btn_done");
    elementBase.addEventListener("mouseenter", function () {
      this.querySelector("svg").setAttribute("fill", "rgb(129, 245, 66)");
    });

    elementBase.addEventListener("mouseleave", function () {
      this.querySelector("svg").setAttribute("fill", "#e6d5ec");
    });
    elementBase.addEventListener("click", function (e) {
      deleteBox.style.display = "flex";
      rowTask.style.opacity = 0.3;
      const messageBox = document.querySelector(".delete_check_message");
      const name = this.parentNode
        .getElementsByTagName("div")[1]
        .innerHTML.slice(4, -5);

      messageBox.innerHTML = `<h3>Do you want to delete ${name}</h3>`;
      btnNo.addEventListener("click", function (e) {
        deleteBox.style.display = "none";
        rowTask.style.opacity = 1;
      });
      btnYes.addEventListener("click", function (e) {
        element.remove();
        events.pop(e.target.getAttribute("value"));
        localStorage.setItem("eventsList", JSON.stringify(events));
        deleteBox.style.display = "none";
        rowTask.style.opacity = 1;
      });
    });
  }
}

//Ading new event
btnNewTask.addEventListener("click", function (e) {
  const event = new Event(
    nazwaWydarzenia.value,
    dataWydarzenia.value,
    godzinaWydarzenia.value,
    events.length,
    parseInt(btnImportant.getAttribute("value"))
  );

  clearForm();
  formDiv.style.display = "none";
});
addingEventsFromLocalStorage();

function addingEventsFromLocalStorage() {
  const eventsList = JSON.parse(localStorage.getItem("eventsList"));
  if (!eventsList || events == null) return;

  eventsList.forEach((event) => {
    const newEvent = new Event(
      event["nazwa"],
      event["data"],
      event["godzina"],
      event["id"],
      event["important"]
    );
  });
}

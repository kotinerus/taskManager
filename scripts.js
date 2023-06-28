const btnImportant = document.querySelectorAll(".btn_important");
const btnNewTask = document.querySelector(".btn_upload_new_task");
const rowTask = document.querySelector(".row_task");

//MBU
// rowTask.addEventListener("mouseenter", function () {
//   console.log("WORKS");
// });

// btnImportant.forEach((element) =>
//   element.addEventListener("click", function (e) {
//     if (this.querySelector("svg").getAttribute("fill") == "currentColor") {
//       this.querySelector("svg").setAttribute("fill", "red");
//     } else {
//       this.querySelector("svg").setAttribute("fill", "currentColor");
//     }
//   })
// );
//MBU

btnNewTask.addEventListener("click", function (e) {
  // Tworzenie nowego elementu
  const newElement = document.createElement("div");
  newElement.className = "row_task col-md";
  newElement.innerHTML = `
    <section class="rounded task flex-column p-2 m-2">
        <div class="row justify-content-center align-items-center g-2">
            <div class="col-1 btn btn_important m-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-exclamation-diamond" viewBox="0 0 16 16">
                    <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"/>
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                </svg>
            </div>
            <div class="col-sm-3 m-1"><h3>Nazwa</h3></div>
            <div class="col-sm-2 m-1"><h3>Termin</h3></div>
            <div class="col-sm-1 m-1"><img class="btn_important1" src="./svgs/check-lg.svg"></div>
            <div class="col-sm-1 m-1"><img class="btn_important1" src="./svgs/question-lg.svg"></div>
            <div class="col-sm-1 m-1"><img class="btn_important1" src="./svgs/arrow-down-square.svg"></div>
            <div class="col-sm-1 m-1"><img class="btn_important1" src="./svgs/arrow-up-square.svg"></div>
        </div>
    </section>
`;

  // Dodawanie funkcjonalności przycisków

  //IMPORTANT BUTTON
  newElement
    .querySelector(".btn_important")
    .addEventListener("click", function () {
      if (this.querySelector("svg").getAttribute("fill") == "currentColor") {
        this.querySelector("svg").setAttribute("fill", "red");
      } else {
        this.querySelector("svg").setAttribute("fill", "currentColor");
      }
    });

  //DONE BUTTON

  // Dodawanie obiektu do  tablicy
  document.querySelector(".row_task").appendChild(newElement);
});

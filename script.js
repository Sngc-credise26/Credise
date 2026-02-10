const API_URL =
"https://script.google.com/macros/s/AKfycby18gcJ4UJuO0CbQvDRSTJ3ukFCFAncFYiYHU_HlrxbPrPDwhFAtSpttmQc3C6PlZRH/exec";

fetch(API_URL)
.then(res => res.json())
.then(events => {
  const grid = document.getElementById("eventGrid");
  grid.innerHTML = "";

  events.forEach(ev => {

    const contentPoints = ev.content
      ? ev.content.split("\n").map(p => `<li>${p}</li>`).join("")
      : "";

    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <img src="${ev.img || 'event1.jpg'}">
      <h3>${ev.name}</h3>
      ${ev.desc ? `<p class="event-desc">${ev.desc}</p>` : ""}
      <ul class="event-points">${contentPoints}</ul>
      <button onclick="openRegister('${ev.name}')">Register</button>
    `;

    grid.appendChild(card);
  });
})
.catch(() => {
  eventGrid.innerHTML = "<p>Unable to load events</p>";
});

function openRegister(eventName){
  eventInput.value = eventName;
  eventTitle.innerText = eventName + " Registration";
  register.style.display = "block";
  window.scrollTo({ top: register.offsetTop, behavior: "smooth" });
}

form.onsubmit = e => {
  e.preventDefault();

  const btn = form.querySelector("button");
  btn.classList.add("loading");
  btn.innerText = "Submitting...";

  fetch(API_URL, {
    method: "POST",
    body: new FormData(form)
  })
  .then(r => r.text())
  .then(res => {
    if(res === "DUPLICATE") {
      show("Already Registered", false);
    } 
    else {
      show(`Batch Code: ${res}`, true);
      form.reset();
    }
  })
  .catch(()=>{
    show("Network Error ❌ Try again", false);
  })
  .finally(()=>{
    btn.classList.remove("loading");
    btn.innerText = "Submit";
  });
};

function show(batchCode){
  popup.innerHTML = `
    <h3>Registered Successfully</h3>
    <p>We warmly welcome you to CREDISE on 11-01-2026</p>
    <p class="batch"> ${batchCode}</p>
    <button onclick="closePopup()">OK</button>
  `;
  popup.style.display = "block";
}

function closePopup(){
  popup.style.display = "none";
}


document.addEventListener("DOMContentLoaded", () => {
  const team = document.getElementById("teamSelect");
  if (team) team.style.display = "block";
});

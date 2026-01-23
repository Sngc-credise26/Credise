const API_URL="https://script.google.com/macros/s/AKfycbwgd-_7eBaY1NpKcK6xf963jfrE5y3A2L62x0c-hCUyd_gIj0xxBPbRW9iGFr0UwpuV/exec";

fetch(API_URL)
.then(res => res.json())
.then(events => {
  const grid = document.getElementById("eventGrid");
  grid.innerHTML = "";
  events.forEach(ev => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <img src="${ev.img || 'event1.jpg'}">
      <div class="event-date">LIVE</div>
      <h3>${ev.name}</h3>
      <p>${ev.desc || ''}<br>${ev.content || ''}</p>
      <p><b>Contact:</b> ${ev.contact || ''}</p>
      <button onclick="openRegister('${ev.name}')">Register</button>
    `;
    grid.appendChild(card);
  });
})
.catch(()=>eventGrid.innerHTML="<p>Unable to load events</p>");

function openRegister(eventName){
  eventInput.value = eventName;
  eventTitle.innerText = eventName + " Registration";
  register.style.display="block";
  window.scrollTo({top:register.offsetTop,behavior:"smooth"});
}

form.onsubmit=e=>{
  e.preventDefault();
  fetch(API_URL,{method:"POST",body:new FormData(form)})
  .then(r=>r.text())
  .then(res=>{
    if(res==="DUPLICATE") show("Already Registered",false);
    else show("Registration Successful",true);
  });
};

function show(msg,ok){
  popup.innerText=msg;
  popup.style.background=ok?"#16a34a":"#dc2626";
  popup.style.display="block";
  setTimeout(()=>popup.style.display="none",3000);
}

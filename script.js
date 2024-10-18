var inputBox = document.getElementById("input-box");
var listContainer = document.getElementById("list-container");
var doneTask = document.querySelector(".done");
var pendingTask = document.querySelector(".pending");
var emojiTask = document.querySelector(".emoji");

function addTask() {
    if(inputBox.value.trim() === '') {
        alert("You must write something !!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
    calculateTask();
}

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
    saveData();
    calculateTask();
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

function calculateTask() {
    let doneCount = 0;
    let pendingCount = 0;

    document.querySelectorAll("#list-container li").forEach((li) => {
        if(li.classList.contains("checked")) {
            doneCount++;
        }
        else {
            pendingCount++;
        }
    })

    if(doneCount === pendingCount) {
        emojiTask.innerHTML = "😁" + "Average";
        emojiTask.style.color = "black";
    }
    else if(doneCount > pendingCount) {
        emojiTask.innerHTML = "😎" + "Good";
        emojiTask.style.color = "Green";
    }
    else if(doneCount < pendingCount){
        emojiTask.innerHTML = "😒" + "Poor";
        emojiTask.style.color = "red";
    }

    doneTask.innerHTML = doneCount;
    pendingTask.innerHTML = pendingCount;

}

showTask();
calculateTask();
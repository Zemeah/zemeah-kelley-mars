// CREATE FOOTER
const footer = document.createElement("footer");
document.body.appendChild(footer);

// GET CURRENT YEAR
const today = new Date();
const thisYear = today.getFullYear();

// ADD COPYRIGHT & TEXT
const footerElement = document.querySelector("footer");
const copyright = document.createElement("p");
copyright.innerHTML = `&copy; Zemeah Kelley ${thisYear}`;
footerElement.appendChild(copyright);

// SKILLS ARRAY
const skills = [
    "JavaScript",
    "HTML",
    "CSS",
    "Git",
    "GitHub",
    "DOM Manipulation",
    "Responsive Design",
    "Flexbox"
];

// SELECT SKILLS SECTION LIST
const skillsSection = document.querySelector("#skills");
const skillsList = skillsSection.querySelector("ul");

//ADD SKILLS TO LIST
for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

// select message form
const messageForm =document.querySelector('form[name="leave_message"]');

// add event listener to submit button
messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

 // store input values   
    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    console.log(usersName, usersEmail, usersMessage);

// select messages section, ul, and add new list item
    const messageSection = document.querySelector("#messages");
    const messageList = messageSection.querySelector("ul")
    const newMessage = document.createElement("li");

// set inner HTML
    newMessage.innerHTML = `
    <a href="mailto:${usersEmail}">${usersName}</a>
    <span> ${usersMessage} </span>
    `;

// create remove button
    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.type = "button";

// add event listner to the remove button
    removeButton.addEventListener("click", (event) => {
        const entry = event.target.parentNode;
        entry.remove();
    });

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    event.target.reset();
});

fetch("https://api.github.com/users/Zemeah/repos")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let repositories = data;
        console.log(repositories);

        let projectSection = document.getElementById("projects");
        let projectList = projectSection.querySelector("ul");
        
        for (let i = 0; i < repositories.length; i++) {
           
           if (repositories[i].fork === true) {
            continue;
           }

            let project = document.createElement("li");
           
            let projectName = document.createElement("h3");
            projectName.innerText = repositories[i].name;

            let projectDescription = document.createElement("p");
            projectDescription.innerText = repositories[i].description || "No description available.";

            let projectLink = document.createElement("a");
            projectLink.innerText = "View on GitHub";
            projectLink.href = repositories[i].html_url;
            projectLink.target = "_blank";

            project.appendChild(projectName);
            project.appendChild(projectDescription);
            project.appendChild(projectLink);
            projectList.appendChild(project);
        }
    })
    .catch(function(error) {
        console.error("There was an error fetching the repositories:", error);
    });
    


const searchForm = document.getElementById("github-form");
const searchInput = document.getElementById("search");
const userList = document.getElementById("user-list");
const reposList = document.getElementById("repos-list");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(searchInput.value);
  fetch(`https://api.github.com/search/users?q=${searchInput.value}`)
    .then((res) => res.json())
    .then((data) => {
      const users = data.items;
      // console.log(users);
      users.forEach((user) => {
        let li = document.createElement("li");
        li.innerHTML = `
        <h2>${user.login}</h2>
        <img src="${user.avatar_url}">
        <p>Profile: <a href="${user.html_url}" target="blank">${user.html_url}</a></p>
        `;
        userList.appendChild(li);
        li.addEventListener("click", () => showUserRepos(user));
      });
    });

  //Function to show user repos
  function showUserRepos(user) {
    fetch(`https://api.github.com/users/${user.login}/repos`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`${user.login} has no repos`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        reposList.innerHTML = `
        <h3>Repositories:</h3>
        <ul>
          ${data
            .map(
              (repo) =>
                `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
            )
            .join("")}
        </ul>
        `;
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

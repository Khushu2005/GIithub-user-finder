
let usernameinp = document.querySelector(".usernameinp");
let search = document.querySelector(".search");
let card = document.querySelector(".card");
function userprofile(username) {
    return fetch(`https://api.github.com/users/${username}`).then(raw => {
       if (!raw.ok) {
                
                return {
                    name: "Not Found",
                    login: username,
                    bio: null,
                    location: null,
                    avatar_url: "https://cdn-icons-png.flaticon.com/512/149/149071.png", // default image
                    followers: 0,
                    following: 0
                };
            }
        return raw.json();

    })
}

function getuserrepos(username) {
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then(raw => {
        if (!raw.ok) return [];
        return raw.json();
    });
}

function decoration(details, repo) {
    let html = `<div class="flex items-center space-x-6">
      <img src="${details.avatar_url}" alt="Profile" class="w-24 h-24 rounded-full border-2 border-gray-700">
      <div>
        <h2 class="text-2xl font-bold">${details.name ? details.name : "null"}</h2>
        <p class="text-gray-400">@${details.login}</p>
        <p class="mt-2 text-gray-300">${details.bio ? details.bio : ""}</p>
        <p class="text-gray-400 mt-1">📍${details.location}</p>
        <div class="mt-2 text-sm text-gray-400 space-x-4">
          <span><strong class="text-white">Follower:</strong> ${details.followers}</span>
          <span><strong class="text-white">Following:</strong> ${details.following}</span>
        </div>
      </div>
    </div>

    <!-- Repositories Section -->
    
    <div>
      <h3 class="text-xl font-semibold mb-4">Popular repositories</h3>
      <div class="grid md:grid-cols-2 gap-4">`
    for (let i = 0; i < 3 && i < repo.length; i++) {
        html += `
      <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 ${i === 2 ? 'md:col-span-2' : ''}">
        <div class="flex justify-between items-center">
          <div>
            <h4 class="text-blue-400 font-bold">${repo[i].name}</h4>
            <p class="text-gray-400 text-sm mt-1">${repo[i].description || 'No description'}</p>
          </div>
          <span class="text-xs text-gray-400 border border-gray-600 px-2 py-0.5 rounded-full">${repo[i].language || 'N/A'}</span>
        </div>
      </div>
    `;
    }



    html += `</div></div>`;
    card.innerHTML = html;

}

search.addEventListener("click", function () {
    let username = usernameinp.value.trim();
    if (username.length > 0) {
        userprofile(username).then(data => {
            getuserrepos(username).then(repo => {
                decoration(data, repo);

            });
        })
    }
    else alert("Invalid Input");})



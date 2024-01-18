// Get DOM elements
const btn = document.getElementById('search');
const input = document.getElementById('input');
const userHeader = document.getElementById('userHeader');
const repos = document.getElementById('repos');
const paginationParent = document.querySelector('.pagination');

// Default username value
let username = 'developersrinu';

// Event listener for input changes
input.addEventListener('input', function () {
    // Update username when input changes
    username = input.value;
    console.log(username);
});

// Event listener for search button click
btn.addEventListener('click', function (event) {
    // Prevent default form submission behavior
    event.preventDefault();
    // Fetch user data when search button is clicked
    fetchData(username);
});

// Function to fetch user data
function fetchData(username) {
    // API request to get user data
    fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            // Update user header HTML with fetched data
            userHeader.innerHTML = `
        <div id ="userDiv">
            <div>
                <div class="logo">
                    <img src="${data.avatar_url}" alt="">
                </div>
                <div class="" style ="margin:7px"}> user id :${data.login}</div>
                <a class="" style="margin: 7px; cursor: pointer;" href="${data.html_url}">${data.html_url}</a>
            </div>
            <div class="info">
                <div class="name">${data.name}</div>
                <div class="bio">${data.bio}</div>
                <div class="location">Location: ${data.location}</div>
                <div class="media">Twitter: ${
                    data.twitter_username
                        ? data.twitter_username
                        : 'This user does not have a Twitter account.'
                }</div>
                <div class="bio" style="color: black;">total repositories: ${data.public_repos}</div>
            </div>
        </div>`;

            // Fetch repositories after fetching user data
            fetchRepos(username);
        });
}

// Function to fetch user repositories
function fetchRepos(username, perPage = 10, page = 1) {
    // GitHub personal access token for API authentication


    // Validate username before making the request
    if (!username) {
        console.error('Invalid username');
        return;
    }

    // API request to get user repositories
    fetch(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`)
        .then((res) => {
            // Check if the response is successful
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);

            // Clear previous content in the repositories section
            repos.innerHTML = '';

            // Iterate over fetched repositories and create HTML elements
            for (let i = 0; i < data.length; i++) {
                const repoDiv = createRepoDiv(data[i]);
                repos.appendChild(repoDiv);
            }
        })
        .catch((error) => {
            // Log an error if there's an issue fetching repositories
            console.error('Error fetching repositories:', error);
        });
}

// Function to create HTML elements for a repository
function createRepoDiv(repoData) {
    const repoDiv = document.createElement('div');
    repoDiv.className = 'repo';
    repoDiv.innerHTML = `
        <div class='repo-h'>
            <div class="repo-name">${repoData.name}</div>
            <div class="repo-desc">${repoData.created_at}</div>
        </div>
        <div class="repo-desc">${repoData.description || 'This repo has no description'}</div>
        <div class="repo-tools">
            <div class="btn btn-dark">javascript</div>
            <div class="btn btn-dark">html</div>
            <div class="btn btn-dark">css</div>
        </div>
    `;
    return repoDiv;
}

// Event listener for pagination clicks
paginationParent.addEventListener('click', function (event) {
    // Check if the clicked element is an anchor tag
    if (event.target.tagName === 'A') {
        // Extract the page number from the clicked anchor
        const pageNumber = Number(event.target.textContent);
        if (pageNumber) {
            // Fetch repositories for the clicked page number
            fetchRepos(username, 10, pageNumber);
        }
    }
});

// Initial fetchData call with default username
fetchData(username);



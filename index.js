// Get DOM elements
const btn = document.getElementById('search');
const input = document.getElementById('input');
const userHeader = document.getElementById('userHeader');
const repos = document.getElementById('repos');
const paginationParent = document.querySelector('.pagination');
const loader = document.querySelector('.loader');
loader.style.display = 'none';

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
    // Fetch user data when the search button is clicked
    fetchData(username);
});

// Function to fetch user data
function fetchData(username) {
    // API request to get user data
    loader.style.display = 'block';
    fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            loader.style.display = 'none';

            // Update user header HTML with fetched data
            userHeader.innerHTML = `
        <div id="userDiv">
            <div>
                <div class="logo">
                    <img src="${data.avatar_url}" alt="">
                </div>
                <div class="" style="margin:7px"}> user id :${data.login}</div>
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
        })
        .catch((error) => {
            // Log an error if there's an issue fetching user data
            console.error('Error fetching user data:', error);
            loader.style.display = 'none';
        });
}

// Function to fetch user repositories
function fetchRepos(username, perPage = 10, page = 1) {
    // Validate username before making the request
    if (!username) {
        console.error('Invalid username');
        return;
    }

    // API request to get user repositories
    loader.style.display = 'block';
    fetch(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`)
        .then((res) => {
            // Check if the response is successful
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            
            if(data.length<7){
                alert('this user has no repos')
            }
            console.log(data);
            loader.style.display = 'none';
         

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
            loader.style.display = 'none';
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



































// // Get DOM elements
// const btn = document.getElementById('search');
// const input = document.getElementById('input');
// const userHeader = document.getElementById('userHeader');
// const repos = document.getElementById('repos');
// const paginationParent = document.querySelector('.pagination');
// const loader = document.querySelector('.loader')
// loader.style.display = 'none'

// // Default username value
// let username = 'developersrinu';

// // Event listener for input changes
// input.addEventListener('input', function () {
//     // Update username when input changes
//     username = input.value;
//     console.log(username);
// });

// // Event listener for search button click
// btn.addEventListener('click', function (event) {
//     // Prevent default form submission behavior
//     event.preventDefault();
//     // Fetch user data when search button is clicked
//     fetchData(username);
// });

// // Function to fetch user data
// function fetchData(username) {
//     // API request to get user data
//     fetch(`https://api.github.com/users/${username}`)
//         loader.style.display = 'block'
//         .then((res) => res.json())
//         .then((data) => {
//             console.log(data);
//             loader.style.display = 'none'

//             // Update user header HTML with fetched data
//             userHeader.innerHTML = `
//         <div id ="userDiv">
//             <div>
//                 <div class="logo">
//                     <img src="${data.avatar_url}" alt="">
//                 </div>
//                 <div class="" style ="margin:7px"}> user id :${data.login}</div>
//                 <a class="" style="margin: 7px; cursor: pointer;" href="${data.html_url}">${data.html_url}</a>
//             </div>
//             <div class="info">
//                 <div class="name">${data.name}</div>
//                 <div class="bio">${data.bio}</div>
//                 <div class="location">Location: ${data.location}</div>
//                 <div class="media">Twitter: ${
//                     data.twitter_username
//                         ? data.twitter_username
//                         : 'This user does not have a Twitter account.'
//                 }</div>
//                 <div class="bio" style="color: black;">total repositories: ${data.public_repos}</div>
//             </div>
//         </div>`;

//             // Fetch repositories after fetching user data
//             fetchRepos(username);
//         });
// }

// // Function to fetch user repositories
// function fetchRepos(username, perPage = 10, page = 1) {
//     // GitHub personal access token for API authentication


//     // Validate username before making the request
//     if (!username) {
//         console.error('Invalid username');
//         return;
//     }

//     // API request to get user repositories
//     fetch(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`)
//          loader.style.display = 'block'
//         .then((res) => {
//             // Check if the response is successful
//             if (!res.ok) {
//                 throw new Error(`HTTP error! Status: ${res.status}`);
//             }
//             return res.json();
//         })
//         .then((data) => {
//             console.log(data);
//             loader.style.display = 'none'

//             // Clear previous content in the repositories section
//             repos.innerHTML = '';

//             // Iterate over fetched repositories and create HTML elements
//             for (let i = 0; i < data.length; i++) {
//                 const repoDiv = createRepoDiv(data[i]);
//                 repos.appendChild(repoDiv);
//             }
//         })
//         .catch((error) => {
//             // Log an error if there's an issue fetching repositories
//             console.error('Error fetching repositories:', error);
//             loader.style.display = 'none'
//         });
// }

// // Function to create HTML elements for a repository
// function createRepoDiv(repoData) {
//     const repoDiv = document.createElement('div');
//     repoDiv.className = 'repo';
//     repoDiv.innerHTML = `
//         <div class='repo-h'>
//             <div class="repo-name">${repoData.name}</div>
//             <div class="repo-desc">${repoData.created_at}</div>
//         </div>
//         <div class="repo-desc">${repoData.description || 'This repo has no description'}</div>
//         <div class="repo-tools">
//             <div class="btn btn-dark">javascript</div>
//             <div class="btn btn-dark">html</div>
//             <div class="btn btn-dark">css</div>
//         </div>
//     `;
//     return repoDiv;
// }

// // Event listener for pagination clicks
// paginationParent.addEventListener('click', function (event) {
//     // Check if the clicked element is an anchor tag
//     if (event.target.tagName === 'A') {
//         // Extract the page number from the clicked anchor
//         const pageNumber = Number(event.target.textContent);
//         if (pageNumber) {
//             // Fetch repositories for the clicked page number
//             fetchRepos(username, 10, pageNumber);
//         }
//     }
// });

// // Initial fetchData call with default username
// fetchData(username);



// // Get DOM elements
// const btn = document.getElementById('search');
// const input = document.getElementById('input');
// const input2 = document.getElementById('input2');
// const userHeader = document.getElementById('userHeader');
// const repos = document.getElementById('repos');
// const paginationParent = document.querySelector('.pagination');
// const loader = document.querySelector('.loader');
// const  search2 = document.getElementById('search2')
// loader.style.display = 'none';

// // Default username value
// let username = 'developersrinu';

// // Event listener for input changes
// input.addEventListener('input', function () {
//     // Update username when input changes
//     username = input.value;
//     console.log(username);
// });

// input2.addEventListener('input', function () {
//     // Update username when input changes
//     const repoName = input2.value;
//     console.log(repoName);
//     // Fetch repositories based on the search query
//     searchRepos(repoName);
// });

// // Event listener for search button click
// btn.addEventListener('click', function (event) {
//     // Prevent default form submission behavior
//     event.preventDefault();
//     // Fetch user data when search button is clicked
//     fetchData(username);
// });

// // Function to show loader
// function showLoader() {
//     loader.style.display = 'block';
// }

// // Function to hide loader
// function hideLoader() {
//     loader.style.display = 'none';
// }

// // Function to fetch user data
// function fetchData(username) {
//     // Show loader before making the API request
//     showLoader();

//     // API request to get user data
//     fetch(`https://api.github.com/users/${username}`)
//         .then((res) => res.json())
//         .then((data) => {
//             console.log(data);

//             // Hide loader after fetching data
//             hideLoader();

//             // Update user header HTML with fetched data
//             userHeader.innerHTML = `
//                 <div id="userDiv">
//                     <div>
//                         <div class="logo">
//                             <img src="${data.avatar_url}" alt="">
//                         </div>
//                         <div class="" style ="margin:7px"}> user id :${data.login}</div>
//                         <a class="" style="margin: 7px; cursor: pointer;" href="${data.html_url}">${data.html_url}</a>
//                     </div>
//                     <div class="info">
//                         <div class="name">${data.name}</div>
//                         <div class="bio">${data.bio}</div>
//                         <div class="location">Location: ${data.location}</div>
//                         <div class="media">Twitter: ${
//                             data.twitter_username
//                                 ? data.twitter_username
//                                 : 'This user does not have a Twitter account.'
//                         }</div>
//                         <div class="bio" style="color: black;">total repositories: ${data.public_repos}</div>
//                     </div>
//                 </div>`;

//             // Fetch repositories after fetching user data
//             fetchRepos(username);
//         })
//         .catch((error) => {
//             // Log an error if there's an issue fetching user data
//             console.error('Error fetching user data:', error);

//             // Hide loader in case of an error
//             hideLoader();
//         });
// }

// // Function to fetch user repositories based on search query
// function searchRepos(repoName) {
//     // Check if repoName is not empty
//     if (repoName.trim() !== '') {
//         // Fetch repositories based on the search query
//         fetchRepos(username, 10, 1, repoName);
//     } else {
//         // If the search query is empty, fetch all repositories
//         fetchRepos(username);
//     }
// }

// // Function to fetch user repositories
// function fetchRepos(username, perPage = 10, page = 1, repoName = '') {
//     // Show loader before making the API request
//     showLoader();

//     // GitHub personal access token for API authentication

//     // Validate username before making the request
//     if (!username) {
//         console.error('Invalid username');
//         hideLoader(); // Hide loader in case of an error
//         return;
//     }

//     // Construct API URL based on search query
//     const apiUrl = repoName
//         ? `https://api.github.com/users/${username}/repos?q=${repoName}&per_page=${perPage}&page=${page}`
//         : `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;

//     // API request to get user repositories
//     fetch(apiUrl)
//         .then((res) => {
//             // Check if the response is successful
//             if (!res.ok) {
//                 throw new Error(`HTTP error! Status: ${res.status}`);
//             }
//             return res.json();
//         })
//         .then((data) => {
//             console.log(data);

//             // Hide loader after fetching repositories
//             hideLoader();

//             // Clear previous content in the repositories section
//             repos.innerHTML = '';

//             // Iterate over fetched repositories and create HTML elements
//             for (let i = 0; i < data.length; i++) {
//                 const repoDiv = createRepoDiv(data[i]);
//                 repos.appendChild(repoDiv);
//             }
//         })
//         .catch((error) => {
//             // Log an error if there's an issue fetching repositories
//             console.error('Error fetching repositories:', error);

//             // Hide loader in case of an error
//             hideLoader();
//         });
// }

// // Function to create HTML elements for a repository
// function createRepoDiv(repoData) {
//     const repoDiv = document.createElement('div');
//     repoDiv.className = 'repo';
//     repoDiv.innerHTML = `
//         <div class='repo-h'>
//             <div class="repo-name">${repoData.name}</div>
//             <div class="repo-desc">${repoData.created_at}</div>
//         </div>
//         <div class="repo-desc">${repoData.description || 'This repo has no description'}</div>
//         <div class="repo-tools">
//             <div class="btn btn-dark">javascript</div>
//             <div class="btn btn-dark">html</div>
//             <div class="btn btn-dark">css</div>
//         </div>
//     `;
//     return repoDiv;
// }

// // Event listener for pagination clicks
// paginationParent.addEventListener('click', function (event) {
//     // Check if the clicked element is an anchor tag
//     if (event.target.tagName === 'A') {
//         // Extract the page number from the clicked anchor
//         const pageNumber = Number(event.target.textContent);
//         if (pageNumber) {
//             // Fetch repositories for the clicked page number
//             fetchRepos(username, 10, pageNumber);
//         }
//     }
// });

// // Initial fetchData call with default username
// fetchData(username);




// // Get DOM elements
// const btn = document.getElementById('search');
// const input = document.getElementById('input');
// const input2 = document.getElementById('input2');
// const searchBtn2 = document.getElementById('search2');
// const userHeader = document.getElementById('userHeader');
// const repos = document.getElementById('repos');
// const paginationParent = document.querySelector('.pagination');
// const loader = document.querySelector('.loader');
// loader.style.display = 'none';

// // Default username value
// let username = 'developersrinu';

// // Event listener for input changes
// input.addEventListener('input', function () {
//     // Update username when input changes
//     username = input.value;
//     console.log(username);
// });

// input2.addEventListener('input', function () {
//     // Update username when input changes
//     const repoName = input2.value;
//     console.log(repoName);
//     // Fetch repositories based on the search query
//     searchRepos(repoName);
// });

// // Event listener for search button click
// btn.addEventListener('click', function (event) {
//     // Prevent default form submission behavior
//     event.preventDefault();
//     // Fetch user data when search button is clicked
//     fetchData(username);
// });

// // Event listener for search2 button click
// searchBtn2.addEventListener('click', function (event) {
//     // Prevent default form submission behavior
//     event.preventDefault();
//     // Fetch user data when search button is clicked
//     fetchData(username);
//     // Fetch repositories based on the search query from input2
//     searchRepos(input2.value);
// });

// // Function to show loader
// function showLoader() {
//     loader.style.display = 'block';
// }

// // Function to hide loader
// function hideLoader() {
//     loader.style.display = 'none';
// }

// // Function to fetch user data
// function fetchData(username) {
//     // Show loader before making the API request
//     showLoader();

//     // API request to get user data
//     fetch(`https://api.github.com/users/${username}`)
//         .then((res) => res.json())
//         .then((data) => {
//             console.log(data);

//             // Hide loader after fetching data
//             hideLoader();

//             // Update user header HTML with fetched data
//             userHeader.innerHTML = `
//                 <div id="userDiv">
//                     <div>
//                         <div class="logo">
//                             <img src="${data.avatar_url}" alt="">
//                         </div>
//                         <div class="" style ="margin:7px"}> user id :${data.login}</div>
//                         <a class="" style="margin: 7px; cursor: pointer;" href="${data.html_url}">${data.html_url}</a>
//                     </div>
//                     <div class="info">
//                         <div class="name">${data.name}</div>
//                         <div class="bio">${data.bio}</div>
//                         <div class="location">Location: ${data.location}</div>
//                         <div class="media">Twitter: ${
//                             data.twitter_username
//                                 ? data.twitter_username
//                                 : 'This user does not have a Twitter account.'
//                         }</div>
//                         <div class="bio" style="color: black;">total repositories: ${data.public_repos}</div>
//                     </div>
//                 </div>`;

//             // Fetch repositories after fetching user data
//             fetchRepos(username);
//         })
//         .catch((error) => {
//             // Log an error if there's an issue fetching user data
//             console.error('Error fetching user data:', error);

//             // Hide loader in case of an error
//             hideLoader();
//         });
// }

// // Function to fetch user repositories based on search query
// function searchRepos(repoName) {
//     // Check if repoName is not empty
//     if (repoName.trim() !== '') {
//         // Fetch repositories based on the search query
//         fetchRepos(username, 10, 1, repoName);
//     } else {
//         // If the search query is empty, fetch all repositories
//         fetchRepos(username);
//     }
// }

// // Function to fetch user repositories
// function fetchRepos(username, perPage = 10, page = 1, repoName = '') {
//     // Show loader before making the API request
//     showLoader();

//     // GitHub personal access token for API authentication

//     // Validate username before making the request
//     if (!username) {
//         console.error('Invalid username');
//         hideLoader(); // Hide loader in case of an error
//         return;
//     }

//     // Construct API URL based on search query
//     const apiUrl = repoName
//         ? `https://api.github.com/users/${username}/repos?q=${repoName}&per_page=${perPage}&page=${page}`
//         : `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;

//     // API request to get user repositories
//     fetch(apiUrl)
//         .then((res) => {
//             // Check if the response is successful
//             if (!res.ok) {
//                 throw new Error(`HTTP error! Status: ${res.status}`);
//             }
//             return res.json();
//         })
//         .then((data) => {
//             console.log(data);

//             // Hide loader after fetching repositories
//             hideLoader();

//             // Clear previous content in the repositories section
//             repos.innerHTML = '';

//             // Iterate over fetched repositories and create HTML elements
//             for (let i = 0; i < data.length; i++) {
//                 const repoDiv = createRepoDiv(data[i]);
//                 repos.appendChild(repoDiv);
//             }
//         })
//         .catch((error) => {
//             // Log an error if there's an issue fetching repositories
//             console.error('Error fetching repositories:', error);

//             // Hide loader in case of an error
//             hideLoader();
//         });
// }

// // Function to create HTML elements for a repository
// function createRepoDiv(repoData) {
//     const repoDiv = document.createElement('div');
//     repoDiv.className = 'repo';
//     repoDiv.innerHTML = `
//         <div class='repo-h'>
//             <div class="repo-name">${repoData.name}</div>
//             <div class="repo-desc">${repoData.created_at}</div>
//         </div>
//         <div class="repo-desc">${repoData.description || 'This repo has no description'}</div>
//         <div class="repo-tools">
//             <div class="btn btn-dark">javascript</div>
//             <div class="btn btn-dark">html</div>
//             <div class="btn btn-dark">css</div>
//         </div>
//     `;
//     return repoDiv;
// }

// // Event listener for pagination clicks
// paginationParent.addEventListener('click', function (event) {
//     // Check if the clicked element is an anchor tag
//     if (event.target.tagName === 'A') {
//         // Extract the page number from the clicked anchor
//         const pageNumber = Number(event.target.textContent);
//         if (pageNumber) {
//             // Fetch repositories for the clicked page number
//             fetchRepos(username, 10, pageNumber);
//         }
//     }
// });

// // Initial fetchData call with default username
// fetchData(username);

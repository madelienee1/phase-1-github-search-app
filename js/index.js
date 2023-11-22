document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('github-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const userInput = document.getElementById('search').value;
        searchUsers(userInput);
    });
});

async function searchUsers(username) {
    try {
        const octokit = new Octokit({
            auth: 'YOUR-TOKEN' // Replace 'YOUR-TOKEN' with your personal GitHub token
        });

        const response = await octokit.request('GET /search/users', {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'X-GitHub-Api-Version': '2022-11-28'
            },
            q: username
        });

        displayResults(response.data);

        function displayResults(data) {
            const userList = document.getElementById('user-list');
            userList.innerHTML = '';

            data.items.forEach(function (user) {
                const userElement = document.createElement('li');
                userElement.innerHTML = `Username: ${user.login} - URL: ${user.html_url}`;
                userElement.addEventListener('click', function () {
                    fetchUserRepos(user.login);
                });
                userList.appendChild(userElement);
            });
        }

        async function fetchUserRepos(username) {
            try {
                // ... similar to searchUsers but using 'GET /users/:username/repos' endpoint ...
                const response = await octokit.request('GET /users/:username/repos', {
                    // ... appropriate headers ...
                    username: username
                });

                displayRepos(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        function displayRepos(repos) {
            const reposList = document.getElementById('repos-list');
            reposList.innerHTML = '';

            repos.forEach(function (repo) {
                const repoElement = document.createElement('li');
                repoElement.innerHTML = `Repo: ${repo.name} - URL: ${repo.html_url}`;
                reposList.appendChild(repoElement);
            });
        }

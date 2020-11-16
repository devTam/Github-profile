// API CALL
const apiCall = async () => {
  // REPLACE WITH YOUR GITHUB PERSONAL ACCESS TOKEN
  const token = 'bb01dd0e2941ca79f1a3d3acd128a47c1a71fcb2';

  const myHeaders = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  }

  const raw = JSON.stringify({ "query": "query { viewer { avatarUrl email name login bio followers {totalCount} following {totalCount} starredRepositories {totalCount } repositories(last: 20) { totalCount nodes {name,stargazerCount,description,updatedAt, forkCount, primaryLanguage { name } }}}}" });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  let githubResults;
  try {
    const fetchData = await fetch("https://api.github.com/graphql", requestOptions);
    const result = await fetchData.json();
    githubResults = result.data.viewer;
    if (githubResults) {
      updateUI(githubResults);
      // REMOVE PRELOADER ONLY AFTER UI IS LOADED
      const loader = document.getElementById('loader');
      loader.classList.add('hidden')
    }
  } catch (error) {
    console.log(error)
  }


}

apiCall();

function updateUI(APIData) {

  function setHeader(results) {
    const { avatarUrl } = results;
    const profileImage = document.getElementById('profile-image-desktop');
    const profileImageMobile = document.getElementById('profile-image-mobile');
    profileImage.src = avatarUrl;
    profileImageMobile.src = avatarUrl;
  }

  function setProfileSidebar(results) {
    const { avatarUrl, name, login, bio, followers, following, starredRepositories, email, repositories } = results;

    // SET PROFILE SIDEBAR IMAGE
    const sidebarImage = document.getElementById('sidebar-image');
    sidebarImage.src = avatarUrl;

    // SET PROFILE SIDEBAR NAME AND USERNAME
    const profileName = document.getElementById('profile-name');
    const profileUsername = document.getElementById('profile-username');
    profileName.innerText = name;
    profileUsername.innerText = login;

    // SET PROFILE SIDEBAR BIO
    const profileBio = document.getElementById('profile-bio');
    profileBio.innerText = bio

    // SET FOLLOWERS COUNT
    const followersContainer = document.getElementById('followers');
    followersContainer.innerText = followers.totalCount;

    // SET FOLLOWING COUNT
    const followingContainer = document.getElementById('following');
    followingContainer.innerText = following.totalCount

    // SET STARS COUNT
    const starsContainer = document.getElementById('stars');
    starsContainer.innerText = starredRepositories.totalCount;

    // SET PROFILE EMAIL
    const profileEmail = document.getElementById('profile-email');
    if(email) {
      profileEmail.innerText = email;
    }else {
      const emailContainer = document.querySelector('.email');
      emailContainer.style.display = 'none'
    }

    // SET NUMBER OF REPOS
    const repoCount = document.getElementById('repo-count')
    repoCount.innerText = repositories.totalCount;

  }

  //   FORMAT DATE
  function formatDate(date) {
    const rawDate = new Date(date);
    const day = rawDate.getDate();
    var monthNumber = rawDate.getMonth()
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    const month = monthNames[monthNumber];
    const formattedDate = `${month} ${day}`
    return formattedDate;

  }

  function setMainContent(results) {
    const repos = results.repositories.nodes;
    let markup = '';
    const repoList = document.getElementById('repo-list');

    repos.forEach(repo => {
      const { name, description, primaryLanguage, forkCount, stargazerCount, updatedAt } = repo;

      markup += `
      <li class="repo-list-item">
                <div class="list-item-left">
                  <h3 class="repo-name">
                    <a href="">${name}</a>
                  </h3>

                  <div class="repo-description">
                    <p>
                      ${description ? description : ''}
                    </p>
                  </div>

                  <div class="repo-details">
                    <span class="primary-language">
                      <span class="language-color" id="language-color"></span>
                      <span class="language">${primaryLanguage.name}</span>
                    </span>

                    <a href="" class="forks stars">
                    <svg aria-label="star" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                      ${stargazerCount}
                    </a>

                    <a href="" class="forks">
                      <svg
                        aria-label="fork"
                        class="octicon octicon-repo-forked"
                        viewBox="0 0 16 16"
                        version="1.1"
                        width="16"
                        height="16"
                        role="img"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        ></path>
                      </svg>
                      ${forkCount}
                    </a>

                    <span>Updated on</span>
                    <span class="formated-time">${formatDate(updatedAt)}</span>
                  </div>
                </div>

                <div class="list-item-right">
                  <form>
                    <button class="star-btn btn">
                      <svg
                        class="octicon octicon-star mr-1"
                        viewBox="0 0 16 16"
                        version="1.1"
                        width="16"
                        height="16"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                        ></path>
                      </svg>
                      Star
                    </button>
                  </form>
                </div>
              </li>
      
      `
      repoList.innerHTML = markup
    })
    setLanguageColor();
    setStarsAndForks();
    setDescription();

  }

  setHeader(APIData);
  setProfileSidebar(APIData)
  setMainContent(APIData);

}

// SET LANGUAGE COLOR
function setLanguageColor() {

  const colorElements = document.querySelectorAll('.language-color');
  colorElements.forEach(el => {

    if (el.nextSibling.nextSibling.innerText === 'HTML') {
      el.classList.add('html')
    }
    if (el.nextSibling.nextSibling.innerText === 'CSS') {
      el.classList.add('css');
    }
    if (el.nextSibling.nextSibling.innerText === 'JavaScript') {
      el.classList.add('javascript');
    }
    if (el.nextSibling.nextSibling.innerText === 'TypeScript') {
      el.classList.add('typescript');
    }
  })
}

function setStarsAndForks() {
  const Elements = document.querySelectorAll('.forks');
  Elements.forEach(el => {
    toggleElements(el);
  })
}

function setDescription() {
  const Elements = document.querySelectorAll('.repo-description');
  Elements.forEach(el => {
    toggleElements(el);
  })
}

// SHOW ELEMENTS ONLY IF THEY HAVE A VALUE IN API
function toggleElements(el) {
  if (el.innerText == 0 || el.innerText == '') {
    el.style.display = 'none';
  }
}


// HAMBURGER NAV FUNCTIONALITY
const menu = document.getElementById('menu');
const mobileNav = document.getElementById('mobile-nav');

menu.addEventListener('click', () => {
  mobileNav.classList.toggle('show');
});


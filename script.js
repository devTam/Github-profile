// API CALL
const apiCall = () => {
  // INSERT YOUR TOKEN HERE
  const token = '4ba3641f934240b728afb084bc8119c8e07272ce';
  
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({"query":"query { viewer { avatarUrl,name, login,bio, followers {totalCount} following {totalCount} starredRepositories {totalCount } repositories(last: 20) { totalCount nodes {name,stargazerCount,description,updatedAt, forkCount, primaryLanguage { name } }}}}"});
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  let githubResults;
  
  fetch("https://api.github.com/graphql", requestOptions)
    .then(response => response.json())
    .then(result => {
        githubResults = result.data.viewer;
        setHeader(githubResults);
    })
    .catch(error => console.log('error', error));
}

apiCall();

function setHeader(results) {
  const {avatarUrl} = results;
  const profileImage = document.getElementById('profile-image-desktop');
  const profileImageMobile = document.getElementById('profile-image-mobile');
  profileImage.src = avatarUrl;
  profileImageMobile.src = avatarUrl;
}

function setProfile() {

}

function setRepo() {

}



//   format date
// const d = new Date('');
// d.getDay(): format(d.getMonth())
// const month = d.toLocalString('default', {month: 'short'})

// HAMBURGER NAV FUNCTIONALITY
const menu = document.getElementById('menu');
const mobileNav = document.getElementById('mobile-nav');

menu.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
});


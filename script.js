var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer fa3f24999b13d7c6b30c2fb1b0be25873c634e80");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"query":"query { viewer { avatarUrl,name, login,bio, followers {totalCount} following {totalCount} starredRepositories {totalCount }email twitterUsername repositories(last: 20) { totalCount nodes {name,stargazerCount,description,updatedAt, forkCount, primaryLanguage { name } }}}}"});

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
      console.log(githubResults)
  } )
  .catch(error => console.log('error', error));

//   format date
// const d = new Date('');
// d.getDay(): format(d.getMonth())
// const month = d.toLocalString('default', {month: 'short'})

// HAMBURGER NAV FUNCTIONALITY
const menu = document.getElementById('menu');
const mobileNav = document.getElementById('mobile-nav');

menu.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
})
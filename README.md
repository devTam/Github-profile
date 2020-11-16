# Github-profile

## About

A clone of the repository tab of my github profile using the github graphql API. The technology used is HTML, CSS and vanilla JavaScript

[test link!](https://github-repo-clone.netlify.app/)


## Usage

1. **Fork and clone the repo into your local machine**

2. **Just add your github personal access token to the token variable inside the script file**

[Get access token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token)

Make sure to check repo and user under scopes.

Edit the script.js file to hold your github token

    # Github GraphQL API (Public and Private)
    const token="YOUR-SECRET-TOKEN-GOES-HERE"

3. **Run live-server plugin in Vscode or use http-server command in command line**

To use http-server command make sure node is installed

```bash
node --version
```

Then run the server command in the command line

```bash
npx http-server
```

**View site on your web browser**

Go to **http://localhost:8080** to view the site



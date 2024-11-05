---
sidebar_custom_props:
  icon: "/img/components/git.svg"
---
# Git Clone Source Component

This component lets Smithy clone a repository from GitHub.

## How to use

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Git Clone in the Sources dropdown.
3. Set the URL of your repository on the right. if your repository is private, read below.

All other settings are optional.

### Cloning a private repository

If you are cloning a private repo, the URL should include your PAT token:

`https://<pat>@github.com/<your account or organization>/<repo>.git`

You can generate a PAT token on GitHub via your account settings. Read the precise
instructions [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
).

## Available Options

You can configure the GitHub Source component with the following options:

| Option Name                 | Description                                                                                                                            | Default                                                                    | Type    |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|---------|
| URL                         | Repository URL to clone                                                                                                                |                                                                            | String  |
| Revision                    | Revision to checkout. (a branch, tag, sha, ref, etc...)                                                                                |                                                                            | String  |
| Refspec                     | Refspec to fetch before checking out revision.                                                                                         |                                                                            | String  |
| Submodules                  | Initialize and fetch git submodules.                                                                                                   | "true"                                                                     | Boolean |
| Clone Depth                 | Perform a shallow clone, fetching only the most recent N commits.                                                                      | "1"                                                                        | Number  |
| SSL Verify                  | Set the `http.sslVerify` global git config. Setting this to `false` is not advised unless you are sure that you trust your git remote. | "true"                                                                     | Boolean |
| CRT File Name               | File name of mounted CRT using ssl-ca-directory workspace.                                                                             | "ca-bundle.crt"                                                            | String  |
| Sub-directory               | Subdirectory inside the `output` Workspace to clone the repo into.                                                                     | "source-code"                                                              | String  |
| Sparse Checkout Directories | Define the directory patterns to match or exclude when performing a sparse checkout.                                                   |                                                                            | String  | 
| Delete Existing             | Clean out the contents of the destination directory if it already exists before cloning.                                               | "true"                                                                     | Boolean |
| http Proxy                  | HTTP proxy server for non-SSL requests.                                                                                                |                                                                            | String  |
| https Proxy                 | HTTPS proxy server for SSL requests.                                                                                                   |                                                                            | String  |
| no Proxy                    | Opt out of proxying HTTP/HTTPS requests.                                                                                               |                                                                            | String  |
| Verbose                     | Log the commands that are executed during `git-clone`'s operation.                                                                     | "true"                                                                     | Boolean |
| git Init Image              | The image providing the git-init binary that this Task runs.                                                                           | "gcr.io/tekton-releases/github.com/tektoncd/pipeline/cmd/git-init:v0.40.2" | String  |
| User Home                   | Absolute path to the user's home directory.                                                                                            | "/home/git"                                                                | String  |
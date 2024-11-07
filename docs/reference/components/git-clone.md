---
sidebar_custom_props:
  icon: "/img/components/git-clone.svg"
title: 'Git Clone'
description: 'Source component that clones a repository for scanning'
sidebar_position: 1
---

# Git Clone

This source component lets Smithy clone a repository from GitHub, GitLab or BitBucket.

## How to use

### Open-Source

1. Add the Helm package to the pipeline settings:

```
---
# file: ./my-pipeline/kustomization.yaml
kind: Kustomization
components:
  - pkg:helm/smithy-security-oss-components/git-clone
```

2. Configure the run parameters of the component in the pipeline run file:

```
# file: ./my-pipeline/pipelinerun.yaml
---
...
spec:
  pipelineRef:
    name: go-pipeline
  params:
  - name: git-clone-url
    value: <Your Git URL>
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Git Clone in the Sources dropdown.
3. Set the URL of your repository on the right. If your repository is private,
   read [below](/docs/reference/components/git-clone#cloning-a-private-repository).

All other settings are optional.

### Cloning a private repository

If you are cloning a private repo, the URL should include your PAT token:

`https://<pat>@github.com/<your account or organization>/<repo>.git`

You can generate a PAT token on GitHub via your account settings. Read the precise
instructions [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
).

## Options

You can configure this component with the following options. The options that have a default value are optional:

| Option Name                         | Description                                                                                                                            | Default                                                                    | Type    |
|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|---------|
| **[Required]** git-clone-url        | Repository URL to clone                                                                                                                |                                                                            | String  |
| git-clone-revision                  | Revision to checkout. (a branch, tag, sha, ref, etc...)                                                                                |                                                                            | String  |
| git-clone-refspec                   | Refspec to fetch before checking out revision.                                                                                         |                                                                            | String  |
| git-clone-submodules                | Initialize and fetch git submodules.                                                                                                   | "true"                                                                     | Boolean |
| git-clone-depth                     | Perform a shallow clone, fetching only the most recent N commits.                                                                      | "1"                                                                        | Number  |
| git-clone-sslVerify                 | Set the `http.sslVerify` global git config. Setting this to `false` is not advised unless you are sure that you trust your git remote. | "true"                                                                     | Boolean |
| git-clone-crtFileName               | File name of mounted CRT using ssl-ca-directory workspace.                                                                             | "ca-bundle.crt"                                                            | String  |
| git-clone-subdirectory              | Subdirectory inside the `output` Workspace to clone the repo into.                                                                     | "source-code"                                                              | String  |
| git-clone-sparseCheckoutDirectories | Define the directory patterns to match or exclude when performing a sparse checkout.                                                   |                                                                            | String  | 
| git-clone-deleteExisting            | Clean out the contents of the destination directory if it already exists before cloning.                                               | "true"                                                                     | Boolean |
| git-clone-httpProxy                 | HTTP proxy server for non-SSL requests.                                                                                                |                                                                            | String  |
| git-clone-httpsProxy                | HTTPS proxy server for SSL requests.                                                                                                   |                                                                            | String  |
| git-clone-noProxy                   | Opt out of proxying HTTP/HTTPS requests.                                                                                               |                                                                            | String  |
| git-clone-verbose                   | Log the commands that are executed during `git-clone`'s operation.                                                                     | "true"                                                                     | Boolean |
| git-clone-gitInitImage              | The image providing the git-init binary that this Task runs.                                                                           | "gcr.io/tekton-releases/github.com/tektoncd/pipeline/cmd/git-init:v0.40.2" | String  |
| git-clone-userHome                  | Absolute path to the user's home directory.                                                                                            | "/home/git"                                                                | String  |
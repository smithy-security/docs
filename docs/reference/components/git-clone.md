---
sidebar_custom_props:
  icon: "/img/components/git-clone.svg"
title: 'Git Clone'
description: 'Source component that shallow clones a repository for scanning'
sidebar_position: 1
---

# Git Clone

This source component lets Smithy clone a repository from GitHub, GitLab or
BitBucket.

## How to use

### Open-Source

Most SAST based workflows depend on `git-clone`.
For example:

```yaml
# file ./my-workflow/workflow.yml
description: Workflow scanning with gosec
name: gosec
components:
  - component: ghcr.io/smithy-security/smithy/manifests/components/targets/git-clone:v1.3.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/gosec:v1.2.3
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/nancy:v1.2.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.1.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/reporters/json-logger:v1.0.2
```

2. Configure the run parameters of the component in the overrides file

```yaml
# file: ./my-workflow/overrides.yaml
git-clone:
  - name: "repo_url"
    type: "string"
    value: "https://github.com/0c34/govwa.git"
  - name: "reference"
    type: "string"
    value: "master"
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Git Clone in the Sources dropdown.
3. Set the URL of your repository on the right. If your repository is private,
   read [below](/docs/reference/components/git-clone#cloning-a-private-repository).

All other settings are optional.

### Cloning a private repository

**Github:**
If you want to clone a private repository you have two choices:

1. install the Smithy github application in your repository or organization, then
   git-clone receives tokens automatically. Use the Github trigger in the Smithy UI.
2. Create a private github token and set it for every repository as shown below
   `https://<pat>@github.com/<your account or organization>/<repo>.git`
   You can generate a PAT token on GitHub via your account settings. Read the
   precise
   instructions [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens). Use the Advanced Git trigger in the Smithy UI.
   **This is insecure as github tokens are longer lived than necessary**

**Gitlab:**
If you want to clone a private repository from Gitlab, currently you can only do
so via private tokens in the same way as github

**Bitbucket:**
If you want to clone a private repository from Bitbucket, currently you can only
do so via private tokens in the same way as github

## Options

You can configure this component with the following options. The options that
have a default value are optional:

| Option Name               | Description                                               | Default | Type   |
|---------------------------|-----------------------------------------------------------|---------|--------|
| **\[Required]** repo\_url | Repository URL to clone                                   | N/A     | String |
| **\[Required]** reference | Ref to clone the repository at (branch,tag or commit sha) | "main"  | String |

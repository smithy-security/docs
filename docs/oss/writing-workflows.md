---
title: 'Write your own Workflow'
description: "Build your first Smithy Workflow"
sidebar_position: 3
---

In order to write a Smithy workflow all you need to do is define the collection of components to run in order and the arguments to pass to those components.
You then supply the two files to the `smithyctl` binary and that's it!


Unless you're developing components, you don't need to clone the open source repository in order to run a workflow.

For end-user usage, you can reference components using their OCI manifests.

*Hint: If you're developing components you can reference local component.yaml files using a `file://` protocol and `smithyctl` will assemble the component itself. There are several examples of workflows using the `file://` protocol in
the [/examples folder](https://github.com/smithy-security/smithy/tree/main/examples/).
*

In this tutorial we are going to create our own self-contained workflow that uses the Smithy component registry.\
*We assume that you have installed `smithyctl` by running*

```bash
go install github.com/smithy-security/smithy/smithyctl@latest
```

## Prerequisites

Check where your smithyctl is, e.g. in `~/go/bin/smithyctl`.
You can find if smithyctl is in your path by running `smithyctl version`. If this command returns an error or `command not found` you need to find where Go installs binaries in your system. This is usually pointed to by the `GOPATH` variable which you can print by running `go env`

## TL;DR

A smithy workflow needs two files, `workflow.yaml` contains a sequence of steps
to run, `overrides.yaml` contain the arguments to each component.

1. Create a `workflow.yaml` file pointing to the components that we want to use.
2. (optional) Write an `overrides.yaml` to provide values for each component.

## Create the Workflow

Let's assume that we want to run SAST and SCA for a repository, which contains code written in Go.
Since we are scanning Go it makes sense to also enrich the results by addins a custom annotation.

### Write the workflow

We can compose this workflow by writing the following `workflow.yaml` somewhere
in our filesystem, e.g. in `$HOME/smithy-workflow.yaml`:

```yaml
---
name: my-custom-workflow
description: some user friendly description
components:
  - component: ghcr.io/smithy-security/smithy/manifests/components/targets/git-clone:v1.5.1
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/gosec:v1.4.1
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/nancy:v1.3.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.2.1
  - component: ghcr.io/smithy-security/smithy/images/components/reporters/vulnerability-logger:v0.0.1
```

In this file:

* we tell smithyctl to run a workflow named `my-custom-workflow`
* the workflow should first run a `git clone` to get the code for scanning.
* it should then scan the code with the `nancy` and `gosec` components.
* it should enrich the results by applying custom annotations
* finally it should return the results as JSON

### Edit run overrides

To run a workflow it is suggested that you use an `overrides.yaml` which binds
values to the
component variables and instructs smithyctl to override defaults with the
relevant values.
For our workflow we can use the following `overrides.yaml`:

```yaml
# $HOME/smithy-overrides.yaml

git-clone:
  - name: "repo_url"
    type: "string"
    value: "https://github.com/0c34/govwa.git"
```

In this `overrides.yaml` we provide the minimal values required to run the
components.\
Namely, a `repo_url` pointing to the repository we want to clone.
You can provide more values and customize the components more by providing the
relevant values as shown in each component documentation.

## Run the Workflow

Run the pipeline using smithyctl:

```bash
smithyctl workflow run \
  --overrides=./$HOME/smithy-iverrides.yaml \
  --build-component-images=true ./$HOME/smithy-workflow.yaml
```

You should see the workflow results in your shell.


## Modifying the Workflow and working with the Smithy Registry

Each component in Smithy is individually packaged and versioned.
This allows Smithy components to evolve individually and users to fork and customize components as needed.

A component is an OCI package with a `component.yaml` manifest pointing to an image and metadata.

Smithy uses the Github Container Registry as storage for all its manifests. You can search for components by name [here](https://github.com/orgs/smithy-security/packages?q=vuln&tab=packages&q=).

When you reference a component, be sure to grab the ["manifest"](https://github.com/smithy-security/smithy/pkgs/container/smithy%2Fmanifests%2Fcomponents%2Ftargets%2Fgit-clone) and not the ["image"](https://github.com/smithy-security/smithy/pkgs/container/smithy%2Fimages%2Fcomponents%2Ftargets%2Fgit-clone) of the component.

### Example

Assuming we want to modify our workflow above and instead of running `gosec` we want to run `semgrep`. This is easily done in 2 steps:

* Find the latest `semgrep` component version from the [registry](https://github.com/orgs/smithy-security/packages?q=git-clone&tab=packages&q=semgrep), at the time of writing that's v1.3.2
* Substitute the `gosec` component with `semgrep` in the workflow

Done and now our worklow looks like this:

```yaml
---
name: my-custom-workflow
description: some user friendly description
components:
  - component: ghcr.io/smithy-security/smithy/manifests/components/targets/git-clone:v1.5.1
  - component:  ghcr.io/smithy-security/smithy/manifests/components/scanners/semgrep:v1.3.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/nancy:v1.3.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.2.1
  - component: ghcr.io/smithy-security/smithy/images/components/reporters/vulnerability-logger:v0.0.1
```

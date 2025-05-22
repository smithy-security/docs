---
title: 'Write your own Workflow'
description: "Build your first Smithy Workflow"
sidebar_position: 3
---

There are several examples in
the [/examples folder](https://github.com/smithy-security/smithy/tree/main/examples/).

In this tutorial we are going to create our own one.\
We assume that you have already cloned the repository and you have installed
`smithyctl` by running

```bash
go install github.com/smithy-security/smithy/smithyctl@latest
```

Check where your smithyctl is, e.g. in `~/go/bin/smithyctl`.
You can find if smithyctl is in your path by running `smithyctl version`

## TL;DR

A smithy workflow needs two files, `workflow.yaml` contains a sequence of steps
to run, `overrides.yaml` contain the arguments to each component.

1. Create a `workflow.yaml` file pointing to the components that we want to use.
2. (optional) Write an `overrides.yaml` to provide values for each component.

## Create the Workflow

Let's assume that we want to run SAST and SCA for a repository, which contains
code written in Go.
Since we are scanning Go it makes sense to also enrich the results by addins a
custom annotation.

### Write the workflow

We can compose this workflow by writing the following `workflow.yaml` somewhere
in our filesystem:

```yaml
---
name: my-custom-workflow
description: some user friendly description
components:
  - component: file://components/targets/git-clone/component.yaml
  - component: file://components/scanners/gosec/component.yaml
  - component: file://components/scanners/nancy/component.yaml
  - component: file://components/enrichers/custom-annotation/component.yaml
  - component: file://components/reporters/json-logger/component.yaml

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
  --overrides=./examples/bandit/overrides.yaml \
  --build-component-images=true ./examples/bandit/workflow.yaml
```

You should see the workflow results in your shell.

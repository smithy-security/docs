---
title: "Quickstart"
description: "From zero to pipeline in under five minutes."
sidebar_position: 1
---

In this tutorial we will set up Dracon locally and run a pipeline to scan Golang repositories for vulnerabilities. Along the way we will encounter [Kubernetes](https://kubernetes.io/), [Tekton](https://tekton.dev/) and Dracon components.

## Requirements

You will need to have the following tools installed in your system:

1. [KiND](https://kind.sigs.k8s.io/docs/user/quick-start/#installation)
2. [kustomize](https://kubectl.docs.kubernetes.io/installation/kustomize/)
3. [Docker](https://docs.docker.com/engine/install/)
4. [Helm](https://helm.sh/docs/intro/install/)

## Installation

There are two main ways to run Dracon: Either you install the latest release, or you build it from the source.
For both options you'll just need to run a single command.

### Option 1: Install Latest Release

```bash
make install
```

### Option 2: Build from Source

```bash
make dev-deploy
```

And that's it! Dracon is now up and running on your cluster and you can start using it.

## Running a Pipeline

Now that Dracon is installed we can run a pipeline. Luckily, Dracon comes with a few example pipelines. Let's choose the Go pipeline: It takes a `.git` repository as an input, and then runs both [Go Nancy](https://github.com/sonatype-nexus-community/nancy) for SCA and [Gosec](https://github.com/securego/gosec) for SAST on the repository. You can deploy the pipeline as follows:

```bash
make cmd/draconctl/bin
bin/cmd/draconctl pipelines deploy ./examples/pipelines/golang-project
```

This deploys the pipeline to Dracon. You can see that the pipeline was created
by taking a look at the Tekton dashboard. You can access the dashboard by running:

```bash
kubectl -n tekton-pipelines port-forward svc/tekton-dashboard 9097:9097
# Then open your browser at http://localhost:9097
```

You should see the pipeline in the dashboard:
![Screenshot of the Tekton Dashboard showing the Dracon Go Pipeline](/img/quickstart-pipeline.png)

Then you can run an instance of the pipeline as follows:

```bash
kubectl create \
  -n dracon \
  -f ./examples/pipelines/golang-project/pipelinerun.yaml
```

And that's it! You've just run your first pipeline with Dracon. 🎉
To see the pipeline running, head to `PipelineRuns` in the Tekton dashboard. You can also [take a look at the Elastic Search dashboard that comes with Dracon to check out the vulnerabilities](/docs/how-tos/elasticsearch) that Dracon found.

To learn more, check out these resources:

- [What are pipelines?](/docs/explanation/pipelines)
- [What are components?](/docs/explanation/components)

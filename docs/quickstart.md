---
title: 'Quickstart'
description: 'From Zero to Pipeline in Under 7 Minutes'
sidebar_position: 1
---

This guide will help to quickly set up Dracon on a Kubernetes cluster and get a
pipeline running. The first step is to create a dev Kubernetes cluster to deploy Tekton.
We suggest you use KiND to provision a local test cluster
quickly. If you already have a K8s cluster then you can skip directly to the
[Deploying Dracon dependencies](#2-deploying-dracon-dependencies) section.

## Requirements

You will need to have the following tools installed in your system:

1. [KiND](https://kind.sigs.k8s.io/docs/user/quick-start/#installation)
2. [kustomize](https://kubectl.docs.kubernetes.io/installation/kustomize/)
3. [Docker](https://docs.docker.com/engine/install/)
4. [Helm](https://helm.sh/docs/intro/install/)


## Installation
### 1. Setting up a [KinD](https://kind.sigs.k8s.io/) cluster

KinD is a tool for running local Kubernetes clusters using Docker container
“nodes”. You can create a cluster with the following command:

```bash
./scripts/kind-with-registry.sh
```

### 2. Build Images
To build and publish all dependency images locally, run the following command.

```bash
make publish-containers CONTAINER_REPO=localhost:5000/ocurity/dracon DRACON_VERSION=v0.19.0
```

### 3. Deploying Dracon Dependencies

Next, you will need to deploy a bunch of dependencies that Dracon can't work without. You can do this by running the following command.

> **NOTE**: This will most likely fail the first time you run it. That's fine.
> Keep an eye on the Postgres pod. When it's running, re-run the below command.

```bash
make dev-deploy DRACON_VERSION=v0.19.0
```

This will deploy various components to your cluster, such as the Elastic Operator and the Dracon Helm package. Depending on the capabilities of your workstation this will probably
take a couple of minutes. It's the perfect time to go get a cup of coffee! 😉

```text
   )  (
  (   ) )
   ) ( (
  -------
.-\     /
'- \   /
  _______
```



### 4. Deploy Dracon Components

Next, we need to install some components. Our components can be easily installed
as follows:

```bash
helm upgrade \
  --install \
  --namespace dracon \
  --version 0.19.0 \
  dracon-oss-components \
  oci://ghcr.io/ocurity/dracon/charts/dracon-oss-components
```

And that's it! Dracon is now up and running on your cluster and you can start using it.

# Running a Pipeline

That's what we're here for. Let's run a pipeline. We can do this by
using one of the example pipelines included in the repository.

Let's choose the Go pipeline as an example. You can deploy the pipeline as follows:

```bash
make cmd/draconctl/bin
bin/cmd/draconctl pipelines deploy ./examples/pipelines/python-project
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
  -f ./examples/pipelines/python-project/pipelinerun.yaml
```

And that's it! You've just run your first pipeline with Dracon. 🎉
To see the pipeline running, head to `PipelineRuns` in the Tekton dashboard.

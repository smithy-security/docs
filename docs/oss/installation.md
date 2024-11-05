---
title: "Installation"
description: "Setup Smithy locally"
sidebar_position: 1
---
# Installation 

With this tutorial we will make sure we can use Smithy locally.

## Tools you will need

You will need to install the following tools on your system:
- [KiND](https://kind.sigs.k8s.io/docs/user/quick-start/#installation)
- [kustomize](https://kubectl.docs.kubernetes.io/installation/kustomize/)
- [Docker](https://docs.docker.com/engine/install/)
- [Helm](https://helm.sh/docs/intro/install/)
- [Go](https://go.dev/doc/install)

### Set up Smithy and its dependencies

1. Clone the Smithy [Open-Source repository](https://github.com/smithy-security/smithy) with 
```
git clone git@github.com:smithy-security/smithy.git
```
2. Set up Smithy and its dependencies by executing in the folder root:
```
make install
```

This command will:
* Spin up a Kubernetes cluster in Docker using [KinD](https://kind.sigs.k8s.io/).
* Deploy Smithy dependencies and Custom Resource Definitions (CRDs).
  Most of these dependencies are required by the example pipelines:
    * Elasticsearch
    * Kibana
    * Postgres

All the dependencies are built using smithy's current [latest release](https://github.com/smithy-security/smithy/tags).

This will take a while, so we invite you to go and grab a coffee!

```text
   )  (
  (   ) )
   ) ( (
  -------
.-\     /
'- \   /
  _______
espresso cup by @ptzianos
```

### SmithyCtl

You need the path of `smithyctl` in order to execute your pipelines. It is inside the Smithy repository root.  
If you are using linux, it is `./bin/cmd/linux/amd64/smithyctl`.  
Make a note of it, because you'll need it later.

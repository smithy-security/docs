---
title: 'Development'
description: 'Going Beyond the Basics'
sidebar_position: 2
---

### Deploy Dracon Components

The components that are used to build our pipelines are comprised out of two
pieces:

1. a wrapper around the binary of the tool that we wish to execute packaged
   into a container.
2. a Tekton Task file that describes how to execute the component.

We provide Helm packages with all our components that can be easily installed
as follows:

```bash
helm upgrade \
  --install \
  --namespace dracon \
  --version 0.8.0 \
  dracon-oss-components \
  oci://ghcr.io/ocurity/dracon/charts/dracon-oss-components
```

### Deploying a custom version of Dracon components

The first step is to build all the containers and push them to a registry
that your cluster has access to. We use `make` to package our containers. For
each component our Make will automatically generate a phony target with the
path `components/{component type}/{component name}/docker`. We have a top-level
target that creates all the component containers along with a couple of extra
containers our system uses, such as draconctl.

The following examples are using the local container registry used by the KiND
cluster, but make sure that you replace the URL with the registry URL that you
are using, if you are using something else:

```bash
make publish-component-containers CONTAINER_REPO=localhost:5000/ocurity/dracon
```

> [!NOTE]
> Notice that the repo we are using is slightly different than the
> one we pushed the images in the previous step. That's because with local
> registries the registry is exposed on a port in localhost, however inside the
> KiND cluster, that's not the case. Instead the registry's host is
> `kind-registry:5000`. This is also going to be important later when we will
> deploy the pipelines and their image repositories will also have to be set to
> this value.

> [!TIP]
> Make sure to use the `draconctl` image that you pushed in the repository

#### Using a different base image for your images

If you need your images to have a different base image then you can pass the
`BASE_IMAGE` variable to the `components` or `publish-component-containers` to
change it to whatever you need. The targets build the binaries and place them in
the `bin` directory and then other targets package them into containers with
`scratch` as the base image.

There are some components that require extra components or special treatment and
these components have their own Makefiles. In those cases you can place a
`.custom_image` file in the directory with the base image you wish to use and
that will be picked up by the Makefile and build the container.

#### Deploying your custom Dracon components Helm package

You can package your components into a Helm package by running the following
command:

```bash
export CUSTOM_DRACON_VERSION=$(make print-DRACON_VERSION)
export CUSTOM_HELM_COMPONENT_PACKAGE_NAME=
make cmd/draconctl/bin
bin/cmd/draconctl components package \
  --version ${CUSTOM_DRACON_VERSION} \
  --chart-version ${CUSTOM_DRACON_VERSION} \
  --name ${CUSTOM_HELM_COMPONENT_PACKAGE_NAME} \
  ./components
helm upgrade ${CUSTOM_HELM_COMPONENT_PACKAGE_NAME} ./${CUSTOM_HELM_COMPONENT_PACKAGE_NAME}-${CUSTOM_DRACON_VERSION}.tgz \
  --install \
  --namespace dracon
```

If your custom components are local, you need to override the component registry
you can do so with the following slightly modified helm command

```bash
helm upgrade ${CUSTOM_HELM_COMPONENT_PACKAGE_NAME} ./${CUSTOM_HELM_COMPONENT_PACKAGE_NAME}-${CUSTOM_DRACON_VERSION}.tgz \
  --install \
  --namespace dracon\
  --set container_registry=localhost:5000/ocurity/dracon
```

After changes to your components you need to redeploy, you can do so as such:

```bash
export CUSTOM_DRACON_VERSION=$(make print-DRACON_VERSION)
make publish-component-containers CONTAINER_REPO=localhost:5000/ocurity/dracon
bin/cmd/draconctl components package   --version ${CUSTOM_DRACON_VERSION}   \
  --chart-version ${CUSTOM_DRACON_VERSION}   \
  --name ${CUSTOM_HELM_COMPONENT_PACKAGE_NAME}   \
  ./components
helm upgrade ${CUSTOM_HELM_COMPONENT_PACKAGE_NAME} \
  ./${CUSTOM_HELM_COMPONENT_PACKAGE_NAME}-${CUSTOM_DRACON_VERSION}.tgz   \
  --install \
  --namespace dracon \
  --set container_registry=kind-registry:5000/ocurity/dracon
```

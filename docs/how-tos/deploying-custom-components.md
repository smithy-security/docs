# Deploying your Custom Dracon Components

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

\* Notice that the repo we are using is slightly different than the
one we pushed the images in the previous step. That's because with local
registries the registry is exposed on a port in localhost, however inside the
KiND cluster, that's not the case. Instead the registry's host is
`kind-registry:5000`. This is also going to be important later when we will
deploy the pipelines and their image repositories will also have to be set to
this value.

\*\*Make sure that you use the draconctl image that you pushed in the repository

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
  --set container_registry=kind-registry:5000/ocurity/dracon
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

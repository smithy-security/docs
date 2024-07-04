---
title: Advanced
description: Exploring the less common problems encountered during component creation.
sidebar_position: 4
---

## Custom Docker Images

All `.go` components get built using a default Docker image. If you want to use your own image, for example, because your component has custom dependencies, you can do that too.

One good example of such a component is the [producers/ossf-scorecard component](https://github.com/ocurity/dracon/tree/main/components/producers/ossf-scorecard). Let's take a closer look at it.

In the below `Dockerfile` we using a custom base image and then are further configuring that.

```docker title="dracon/components/producers/ossf-scorecard/Dockerfile"
ARG OSSF_SCORECARD_SAFETY_BASE_IMAGE
FROM gcr.io/openssf/scorecard:stable

FROM ${OSSF_SCORECARD_SAFETY_BASE_IMAGE}

COPY --from=0 /scorecard /scorecard

ENTRYPOINT ["/scorecard"]
```

In addition, a `Makefile` is placed inside the component folder, to advice Smithy on how to build the component image.

```makefile title="dracon/components/producers/ossf-scorecard/Makefile"
.PHONY: component publish

CONTAINER_REPO=
DRACON_VERSION=
OSSF_SCORECARD_SAFETY_BASE_IMAGE=$(shell test -e .custom_image && cat .custom_image || echo "alpine:latest")

DOCKER=docker

component:
	$(DOCKER) build --tag $(CONTAINER_REPO)/components/producers/ossf-scorecard:$(DRACON_VERSION) \
					--file Dockerfile \
					$$([ "${SOURCE_CODE_REPO}" != "" ] && echo "--label=org.opencontainers.image.source=${SOURCE_CODE_REPO}" ) \
					--build-arg OSSF_SCORECARD_SAFETY_BASE_IMAGE=$(OSSF_SCORECARD_SAFETY_BASE_IMAGE) ../../.. 1>&2

publish:
	$(DOCKER) push $(CONTAINER_REPO)/components/producers/ossf-scorecard:$(DRACON_VERSION) 1>&2
```

And that's it! Simply by adding these two files Smithy will now be able to build your component.

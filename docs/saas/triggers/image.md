---
sidebar_custom_props:
  icon: "/img/components/image-get.svg"
title: 'Container Image'
description: 'Container Image trigger - run workflows on any container image'
sidebar_position: 3
---

# Image trigger

This trigger is only available in the Smithy SaaS.

The Image trigger is how you set up a workflow if the target
is a container image. When you
add this
trigger to your workflow,
the [image-get target](https://docs.smithy.security/docs/reference/components/image-get)
component is added automatically behind the scenes.
The [image-get target](https://docs.smithy.security/docs/reference/components/image-get)
parameters are then populated by the image trigger with every run.

This trigger can only be launched manually for now.

## UI Settings

**Registry owner**: The URL of the registry with your images.

![Image trigger settings screenshot](/img/instructions/image-trigger-settings.png)
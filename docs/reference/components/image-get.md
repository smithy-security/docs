***

sidebar\_custom\_props:
icon: "/img/components/image-get.svg"
title: 'Image Get'
description: 'Source component that downloads a remote container image for scanning'
sidebar\_position: 1
--------------------

# Image Get

This source component lets Smithy download a remote image from any registry.

## How to use

### Open-Source

All the trivy examples depend on this target component. e.g. `examples/trivy-with-local-image`

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Image-Get in the Sources dropdown.
3. Set the URL of your image on the right. If your registry requires authentication, set the username and password on the right.

## Options

You can configure this component with the following options. The options that have a default value are optional:

| Option Name                         | Description                                                                                                                            | Default                                                                    | Type    |
|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|---------|
| **\[Required]** image        | Image to download, e.g. `ubuntu:latest` or `ghcr.io/smithy-security/smithy:v1.0.0` |N/A| String  |
| **\[Optional]** username         | Username to user for logging in to the registry if required |""| String  |
| **\[Optional]** password         | Password/Token to user for logging in to the registry if required |""| String  |

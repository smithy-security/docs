***

sidebar\_custom\_props:
icon: "/img/components/zap.svg"
title: 'ZAP'
description: 'Scanner component that runs the Open Source DAST ZAP.
sidebar\_position: 2
--------------------

# ZAP

This scanner component scans websites for vulnerabilities.
It supports both authenticated and unauthenticated scans.

## How to use with Smithy

### Open-Source

There is an example workflow in the smithy repository.
After you have cloned the repo, you can run:

```bash
$ smithyctl \
  workflow run \
    --overrides-path=./examples/zap/overrides.yaml \
    --build-component-images \
      ./examples/zap/workflow.yaml
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find ZAP in the scanners dropdown.
3. \[Optional] If you want to do an authenticated scan: Set the url where the login form is, the username and the password.
4. Set the target domain or base url

## Options

You can configure this component with the following options. :

| Option Name                           | Description                                                                                                                            | Default                                                                                                                      | Type   |
|---------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|--------|
| **\[Required]** target | Target to scan |"" | String |
| username | if it's an authenticated scan: the username |"" | String |
| password | if it's an authenticated scan: the password |"" | String |
| login\_url | if it's an authenticated scan: the url of the login form |"" | String |

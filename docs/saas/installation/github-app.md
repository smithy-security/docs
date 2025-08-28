---
title: 'Github app'
description: 'How to setup Smithy with GitHub'
sidebar_position: 2
---

# Smithy GitHub app

The GitHub app is required if you need to scan your
GitHub repositories with Smithy.
The GitHub app provides automatic events, which can trigger
Smithy workflows via the [GitHub trigger](/docs/saas/triggers/github).
This way Smithy can scan your code automatically when you update a branch,
open or update a Pull Request.

# Installation

### 1. Create the Application

You can check out [this example](https://github.com/organizations/smithy-security/settings/apps/webhook-local-dev-andrea)
application to see how it's set up.

1. Head to
   the [organisation's settings for applications](https://github.com/organizations/smithy-security/settings/apps)
   and click on `New GitHub App`.
2. Fill in the application with the following data:
    - `GitHub App name`: `Webhook Local Dev - $YourName`
    - `Homepage URL`: `https://your-instance.smithy.security`
    - `Webhook Active`: true
    - `Webhook URL`: `https://your-instance.smithy.security/api/webhooks/github`
    - `Where can this GitHub App be installed?`: it should be enabled on
      `Only on this account`
3. Subscribe to events:
    - `Pull Requests`
    - `Push`
    - `Registry Packages`

4. Customise the permissions as follows:
    - `Repository Permissions`: Enable `read` permissions on:
        - `Contents`
        - `Metadata`
        - `Pull Requests`
        - `Packages`

    - `Organisation Permissions`: Enable `read` permissions on:
        - `Organization private registries`

5. Save the configuration
6. Generate a private key:
    - click on `Private keys` in the main configuration
    - download the key
    - add the key in the same secret note that you used before for the secret on Bitwarden. You can use
      `pbcopy` or
      `xclip` for this.
7. Optional - add an image for your app
8. Head to `Install App` and install it
9. You are all set!

### 2. Ask your Smithy Admin to add the Webhook configuration to your instance

### 3. Configure Webhook Secrets

Head to the `/secrets` page on your instance and create two secrets:

- `GITHUB_APP_WEBHOOK_SECRET`: paste the secret from the Smithy app
- `GITHUB_APP_WEBHOOK_PRIVATE_KEY`: paste the private key from the Smithy app


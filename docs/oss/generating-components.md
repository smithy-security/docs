---
title: "Generating Components"
description: "Did you know you can create your own Smithy components using AI?"
sidebar_position: 4
---

# Generating Components

Smithy Security provides a variety of pre-built components for different security tools and workflows. However, you can also create your own custom components to fit your specific needs. One interesting approach to generating Smithy components is by leveraging AI tools like Cursor to help you draft the initial component definitions.

## The Prompt: Generate a Dependency Track Component with Cursor

The following prompt was used with Cursor to generate a new Smithy Security scanner component for Dependency Track:

```Text

I want you to generate a new scanner component. Please analyse the `components` folder to understand:
- What components are
- That they are built using an sdk and other helpful packages like pkg/env
- That they are configured by a component.yaml. You can explore https://github.com/smithy-security/smithy/tree/main/smithyctl to get more context about components and their config based on the docs.

Once you are done, I want you to build a new dependency-track scanner that uploads a local cyclonedx SBOM to it and then returns. This has to be built using the mentioned SDK https://github.com/smithy-security/smithy/tree/main/sdk and helper packages like https://github.com/smithy-security/pkg/tree/main.I want you to think very deeply and work on each of the following steps in isolation. DO NOT work on all of them at the same time. Always ask for approval.Assume that:
- You’ll find the input cyclonedx SBOM in the scratch workspace
- We want minimal configuration for dependency track: I.e. API token etc based on what’s needed
- You have to use GO. If there are packages to interact with cyclonedx stuff or dependency track, please use them
- Always use the shown style used to build other components
- Avoid useless comments. For the method signatures or exported things that’s fine.
- If you are working on something new and you need a dependency, run: `go mod tidy && go mod vendor && go mod edit -toolchain=none`
Steps:
- create a new scanner called dependency-track and create a go.mod with go v1.23.4 for it.
- Setup the internal/config package based on the needed config
- Setup the internal/dependency-track client code.
- Setup the internal/transformer package and: 1. Read the cyclonedx SBOM from disk; 2. Use the client to upload it to dependency-track. Do define interfaces where possible the closest to where you need them. For example, don’t define the interface to abstract the client in the client package itself. This is needed in the transformer package. I don’t expect the scanner to return any findings in this flow.
- Plug everything together in the main
- Create tools.go at the root and rely on uber’s go mock to generate mocks for the client interface. Output the mocks in the transformer_test package where the transformer code lives.
- Now start writing unit tests for the transformer package from the transformer_test package. Use the generated mocks and comply with the available styles.
- Bonus: if you can, also write unit tests for the dependency track client. Preferably using a Doer if their http client can be customised.
- Bonus: use the pkg/retry package to have a retryable http client.
- Write down the component.yaml and the README.

Again, work on each step in isolation and ask for approval.
```

Let's go through it step by step!

### Step 1: Create the Scanner and go.mod

The first step is to create a new directory for the Dependency Track scanner component and initialize a Go module with the appropriate version.

It should result in a command like:
```bash
mkdir -p components/scanners/dependency-track
cd components/scanners/dependency-track
go mod init github.com/smithy-security/smithy/components/scanners/dependency-track
go mod edit -go=1.23.4
```

### Step 2: Setup the internal/config Package

Next, we need to create the `internal/config` package to handle the configuration parameters for the Dependency Track component, such as the API token and server URL.  This package will define a struct to hold these parameters and methods to load them from environment variables or component parameters.
We expect generated code similar to this:
```go
package config
import (
    "github.com/smithy-security/pkg/env"
)
type Config struct {
    APIToken string
    ServerURL string
}
func LoadConfig() (*Config, error) {
    cfg := &Config{
        APIToken: env.GetString("DEPENDENCY_TRACK_API_TOKEN", ""),
        ServerURL: env.GetString("DEPENDENCY_TRACK_SERVER_URL", "http://localhost:8080"),
    }
    if cfg.APIToken == "" {
        return nil, fmt.Errorf("DEPENDENCY_TRACK_API_TOKEN is required")
    }
    return cfg, nil
}
```

### Step 3: Setup the internal/dependency-track Client Code

The next step is to create the `internal/dependency-track` package that will handle interactions with the Dependency Track API. This package will define a client struct and methods to upload the CycloneDX SBOM.
We expect generated code similar to this:
```go
package dependencytrack

import (
	"context"
	"encoding/base64"

	dtrack "github.com/DependencyTrack/client-go"
	"github.com/go-errors/errors"
)

// Client represents a Dependency-Track API client using the official library.
type Client struct {
	client *dtrack.Client
}

// New creates a new Dependency-Track client using the official client-go library.
func New(baseURL, apiToken string) (*Client, error) {
	if baseURL == "" {
		return nil, errors.New("base URL cannot be empty")
	}
	if apiToken == "" {
		return nil, errors.New("API token cannot be empty")
	}

	// Create client using the official library
	client, err := dtrack.NewClient(baseURL, dtrack.WithAPIKey(apiToken))
	if err != nil {
		return nil, errors.Errorf("failed to create Dependency-Track client: %w", err)
	}

	return &Client{
		client: client,
	}, nil
}

// UploadSBOM uploads a CycloneDX SBOM to Dependency-Track using the official client.
func (c *Client) UploadSBOM(ctx context.Context, sbomData []byte, projectName, projectVersion string) error {
	// Encode the SBOM data to base64 as required by the API
	encodedBOM := base64.StdEncoding.EncodeToString(sbomData)

	// Upload the BOM using the official client
	uploadToken, err := c.client.BOM.Upload(ctx, dtrack.BOMUploadRequest{
		ProjectName:    projectName,
		ProjectVersion: projectVersion,
		AutoCreate:     true, // Automatically create project if it doesn't exist
		BOM:            encodedBOM,
	})
	if err != nil {
		return errors.Errorf("failed to upload SBOM: %w", err)
	}

	// The upload token can be used to track processing status if needed
	// For now, we just return success after upload
	_ = uploadToken

	return nil
}

```
### Step 4: Setup the internal/transformer Package
The `internal/transformer` package will contain the logic to read the CycloneDX SBOM from disk and use the Dependency Track client to upload it.
We expect generated code similar to this:
```go
package transformer
import (
    "io/ioutil"
    "path/filepath"
    "github.com/smithy-security/smithy/components/scanners/dependency-track/internal/config"
    "github.com/smithy-security/smithy/components/scanners/dependency-track/internal/dependencytrack"
)
type Transformer struct {
    client *dependencytrack.Client
    sbomPath string
}
func NewTransformer(cfg *config.Config, sbomPath string) *Transformer {
    client := dependencytrack.NewClient(cfg.APIToken, cfg.ServerURL)
    return &Transformer{client: client, sbomPath: sbomPath}
}
func (t *Transformer) UploadSBOM() error {
    sbom, err := ioutil.ReadFile(t.sbomPath)
    if err != nil { return err }
    return t.client.UploadSBOM(sbom)
}
```

### Step 5: Plug Everything Together in main.go

The `main.go` file will tie everything together by loading the configuration, creating the transformer, and invoking the upload process.
We expect generated code similar to this:

```go
package main
import (
    "log"
    "path/filepath"
    "github.com/smithy-security/smithy/components/scanners/dependency-track/internal/config"
    "github.com/smithy-security/smithy/components/scanners/dependency-track/internal/transformer"
)
func main() {
    cfg, err := config.LoadConfig()
    if err != nil { log.Fatalf("failed to load config: %v", err) }
    sbomPath := filepath.Join(env.GetString("SCRATCH_WORKSPACE", "/tmp"), "sbom.cyclonedx.json")
    transformer := transformer.NewTransformer(cfg, sbomPath)
    if err := transformer.UploadSBOM(); err != nil {
        log.Fatalf("failed to upload SBOM: %v", err)
    }
    log.Println("SBOM uploaded successfully")
}
``` 

### Step 6: Create tools.go for Mocks
At this state we can likely stop and just create a component.yaml and README. However, to ensure we are following good practices(and since it's free and easy to do and a requirement for getting components merged in the registry) we should provide some unit tests. For that we need to create a `tools.go` file at the root of the component to generate mocks for the Dependency Track client using Uber's GoMock.

The `tools.go` file will include the necessary directives to generate mocks for the Dependency Track client using Uber's GoMock.
We expect generated code similar to this:

```go
// +build tools
package main
import (
    _ "github.com/golang/mock/mockgen"
)
``` 
### Step 7: Write Unit Tests for the transformer Package

Finally, we can write unit tests for the `transformer` package using the generated mocks to ensure that our upload logic works as expected.
We expect generated code similar to this:

```go
package transformer_test
import (
    "testing"
    "github.com/golang/mock/gomock"
    "github.com/smithy-security/smithy/components/scanners/dependency-track/internal/transformer"
    "github.com/smithy-security/smithy/components/scanners/dependency-track/internal/dependencytrack/mocks"
)
func TestUploadSBOM(t *testing.T) {
    ctrl := gomock.NewController(t)
    defer ctrl.Finish()
    mockClient := mocks.NewMockClient(ctrl)
    transformer := &transformer.Transformer{
        client: mockClient,
        sbomPath: "testdata/valid_sbom.json",
    }
    mockClient.EXPECT().UploadSBOM(gomock.Any()).Return(nil)
    if err := transformer.UploadSBOM(); err != nil {
        t.Fatalf("expected no error, got %v", err)
    }
}
```

### Step 8: Write the component.yaml and README

Finally, we need to create the `component.yaml` file to define the Dependency Track scanner component and a `README.md` file to document its usage.

The `component.yaml` file will define the component's metadata, parameters, and steps to execute the scanner.

```yaml
# dependency-track/component.yaml
name: dependency-track
description: "Uploads a CycloneDX SBOM to Dependency Track"
type: scanner
parameters:
  - name: api_token
    type: string
    value: "" # API token for Dependency Track
  - name: server_url
    type: string
    value: "http://localhost:8080" # Dependency Track server URL
steps:
  - name: upload-sbom
    image: components/scanners/dependency-track
    executable: /app/dependency-track
```

And we're done! By following these steps, we have successfully created a new Smithy Security scanner component for Dependency Track using AI assistance from Cursor. This component can now be used in Smithy workflows to upload CycloneDX SBOMs to a Dependency Track server.


We can and should further enhance the component by adding more features, error handling, and configuration options as needed. e.g. adding retries using the `pkg/retry` package for the HTTP client.
But this is just the beginning! As we continue to develop and improve the component, we can leverage the power of AI assistance to streamline our workflow and enhance our productivity.

*Hint:*
You can explore other components in the [Smithy Security GitHub repository](https://github.com/smithy-security/smithy/components).

You can also refer to the [Smithy Security SDK documentation](https://docs.smithy.security/) for more information on building custom components and workflows.

This component is very useful for users of Dependency Track who do not want SBOM generation from CDXGEN or other tools but already have SBOMs generated from other parts of their toolchain and just want to upload them to Dependency Track for analysis. If you want to use cdxgen to generate SBOMs and upload them to Dependency Track, you can use the existing [cdxgen component](https://github.com/smithy-security/smithy/components/tree/main/components/scanners/cdxgen).

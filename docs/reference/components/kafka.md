---
sidebar_custom_props:
  icon: "/img/components/kafka.svg"
title: 'Kafka'
description: 'Kafka reporter that publishes OCSF findings in protobuf format to a configured Kafka topic or uploads them to S3 and notifies via Kafka.'
sidebar_position: 18
---

# Kafka

Kafka reporter that publishes OCSF findings in protobuf format to a configured Kafka topic or uploads them to an S3 compatible destination and then notifies of this event on Kafka.

The component supports both secure and insecure Kafka connections, with options for TLS encryption and flexible broker discovery through either direct addresses or SRV records. It offers two reporting modes for different use cases and performance requirements.

## Reporting Modes

The component supports two distinct reporting modes:

**kafka mode:**
- Reports each individual finding as a separate Kafka message
- Provides real-time streaming of findings as they are discovered
- Suitable for scenarios requiring immediate processing of individual findings

**s3-kafka mode (default):**
- Uploads all findings as a single blob to S3
- Sends one Kafka message containing metadata about the uploaded blob
- Reduces Kafka message volume and provides efficient batch processing
- Ideal for high-volume scenarios or when findings need to be archived

## How to use

### Open-Source

1. Add the component to the workflow:

```yaml
# file ./my-workflow/workflow.yml
description: Workflow reporting to kafka
name: kafka-reporting
components:
  - component: ghcr.io/smithy-security/smithy/manifests/components/targets/git-clone:v1.3.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/gosec:v1.2.3
  - component: ghcr.io/smithy-security/smithy/manifests/components/scanners/nancy:v1.2.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/enrichers/custom-annotation:v0.1.2
  - component: ghcr.io/smithy-security/smithy/manifests/components/reporters/kafka:v0.0.4
```

2. Configure the run parameters of the component in the overrides file:

```yaml
# file: ./my-workflow/overrides.yaml
git-clone:
  - name: "repo_url"
    type: "string"
    value: "https://github.com/sqreen/go-dvwa"
  - name: "reference"
    type: "string"
    value: "master"
kafka:
  - name: "kafka_topic"
    type: "string"
    value: "smithy-findings"
  - name: "kafka_addresses"
    type: "string"
    value: "broker1:9092,broker2:9092"
  - name: "reporter_type"
    type: "string"
    value: "kafka"
```

### SaaS

1. In the Smithy UI, open the page to create a new workflow.
2. Find the Kafka component in the Reporters dropdown.
3. Fill the form on the right

## Connection Methods

The component supports two mutually exclusive connection methods:

**Direct Broker Addresses:**
```yaml
kafka_addresses: "broker1:9092,broker2:9092,broker3:9092"
kafka_broker_srv_record: ""  # Must be empty
```

**SRV Record Discovery:**
```yaml
kafka_broker_srv_record: "_kafka._tcp.example.com"
kafka_addresses: ""  # Must be empty
```

## TLS Configuration

For secure connections, enable TLS and provide file paths to the required certificates:

```yaml
kafka_tls_enabled: "true"
kafka_tls_client_cert_file_path: "/path/to/client-cert.pem"
kafka_tls_ca_file_path: "/path/to/ca-cert.pem"
kafka_tls_client_key_file_path: "/path/to/client-key.pem"
```

**Note:** The application expects certificate files to be present on the filesystem and accessible at the specified paths.

## Options

You can configure this component with the following options. The options that have a default value are optional:

| Option Name                        | Description                                                                                                               | Default                       | Type   |
|------------------------------------|---------------------------------------------------------------------------------------------------------------------------|-------------------------------|--------|
| **[Required]** kafka_topic         | Topic where messages are published                                                                                        |                               | String |
| kafka_addresses                    | Comma-separated broker addresses (mutually exclusive with SRV record)                                                    |                               | String |
| kafka_broker_srv_record            | SRV record for broker discovery (mutually exclusive with addresses)                                                      |                               | String |
| kafka_version                      | Kafka protocol version (e.g., "2.8.0"). If empty, client negotiates with broker                                         |                               | String |
| kafka_client_id                    | Producer client identifier for broker logs                                                                               | smithy-kafka-reporter         | String |
| kafka_producer_message_key_id      | Custom message key ID. If empty, instance_id is used in s3-kafka flow and finding_id is used in kafka flow              |                               | String |
| kafka_tls_enabled                  | Enable TLS encryption                                                                                                     | false                         | String |
| kafka_tls_client_cert_file_path    | Path to client certificate file (required if TLS enabled)                                                                | /etc/ssl/certs/app/client.crt | String |
| kafka_tls_ca_file_path             | Path to CA certificate file (required if TLS enabled)                                                                    | /etc/ssl/certs/app/ca.crt     | String |
| kafka_tls_client_key_file_path     | Path to private key file (required if TLS enabled)                                                                       | /etc/ssl/certs/app/client.key | String |
| kafka_send_max_retries             | Maximum send retries (0 uses Kafka defaults)                                                                             | 0                             | String |
| reporter_type                      | Reporting mode: "kafka" or "s3-kafka"                                                                                    | s3-kafka                      | String |
| artifact_registry_url              | S3 endpoint URL (required for s3-kafka mode)                                                                             |                               | String |
| artifact_registry_access_secret    | S3 access secret (required for s3-kafka mode)                                                                            |                               | String |
| artifact_registry_access_key_id    | S3 access key ID (required for s3-kafka mode)                                                                            |                               | String |

## Data Format

### Kafka Mode

In kafka mode, each OCSF (Open Cybersecurity Schema Framework) finding is published as an individual Protocol Buffer message to the configured Kafka topic.

You can find the OCSF schema [here](https://github.com/smithy-security/smithy/tree/main/proto/ocsf/ocsf_schema/v1), its generated code [here](https://github.com/smithy-security/smithy/tree/main/sdk/gen/ocsf_schema/v1), and you can consume the data with this snippet:

```go
import (
    ocsf "github.com/smithy-security/smithy/sdk/gen/ocsf_schema/v1"
    "google.golang.org/protobuf/proto"
)

var finding ocsf.VulnerabilityFinding
if err := proto.Unmarshal(rawMessageValueBytes, &finding); err != nil {
    // handle error
}
```

### S3-Kafka Mode

In s3-kafka mode, the component:
1. Uploads all findings as a tar archive of protobuf blobs to the configured S3 location
2. Sends one Kafka message containing metadata about the uploaded blob

You can find the schema in [proto/notification/v1](https://github.com/smithy-security/private-components/tree/main/components/reporters/kafka/proto/notification/v1/notification.proto) and the generated code in [proto/gen/v1](https://github.com/smithy-security/private-components/tree/main/components/reporters/kafka/proto/gen/v1/notification.pb.go).

You can deserialise the information in each message with the following snippet:

```go
import (
    v1 "github.com/smithy-security/private-components/reporters/kafka/proto/gen/v1"
    "google.golang.org/protobuf/proto"
)

var event v1.InstanceCompletedEvent
if err := proto.Unmarshal(rawMessageValueBytes, &event); err != nil {
    // handle error
}
```

## Kafka Headers

The following Kafka headers are populated:

| Key           | Populated when               | Description                                                                                                                 |
|---------------|------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| `instance_id` | mode is `kafka` or `s3-kafka` | Smithy's instance id for each run. This is a UUID and will be the same for all findings published in the same reporter run. |
| `finding_id`  | mode is `kafka`              | Incrementing integer that uniquely identifies each finding (kafka mode only).                                              |

## Producer Configuration

The component uses hardcoded Kafka producer settings optimized for reliability and consistency:

- **Idempotent**: Ensures exactly-once delivery semantics
- **Required Acks**: Waits for all in-sync replicas before confirming
- **Compression**: Snappy compression for efficient message payloads
- **Max Open Requests**: Limited to 1 for idempotent operations

These settings prioritize data consistency and delivery guarantees over throughput.

## Troubleshooting

**Connection Issues:**
- Verify broker addresses are correct and accessible
- Check that the specified Kafka topic exists
- Ensure firewall rules allow connections on the specified ports

**TLS Issues:**
- Verify certificate files exist at the specified paths
- Ensure certificate files are readable by the application
- Check that certificates are not expired

**S3-Kafka Mode Issues:**
- Verify S3 credentials and permissions
- Check that the S3 bucket exists and is accessible
- Ensure proper IAM permissions for S3 operations
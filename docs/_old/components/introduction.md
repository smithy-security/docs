---
sidebar_position: 1
---

# Introduction

Components are at the heart of Smithy. They're self-contained, and run a specific functionality.
Most components are written in Go, and we recommend that you write your components following this principle, to have the best support possible. Some components are written in Python as well, and in theory, you can choose any language you want.

A very basic Go component only needs to contain two files:
- `main.go`: The component logic, what gets run when your component is called
- `task.yaml`: Metadata about your component, i.e. what parameters does it accept, etc.

Next, let's dive into creating our own producer component.

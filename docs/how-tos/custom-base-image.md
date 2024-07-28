# Custom Base Images

If you need your images to have a different base image then you can pass the
`BASE_IMAGE` variable to the `components` or `publish-component-containers` to
change it to whatever you need. The targets build the binaries and place them in
the `bin` directory and then other targets package them into containers with
`scratch` as the base image.

There are some components that require extra components or special treatment and
these components have their own Makefiles. In those cases you can place a
`.custom_image` file in the directory with the base image you wish to use and
that will be picked up by the Makefile and build the container.

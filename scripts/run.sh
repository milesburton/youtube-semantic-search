#!/bin/bash

# Run the project in Docker
docker build -t youtube-transcript-ai .
docker run --rm -it youtube-transcript-ai


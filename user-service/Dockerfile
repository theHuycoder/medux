# Start from the latest golang base image
FROM golang:alpine as builder

RUN apk add --no-cache wget && \
    GRPC_HEALTH_PROBE_VERSION=v0.4.6 && \
    wget -qO /grpc_health_probe "https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-arm64" && \
    chmod +x /grpc_health_probe

# Add Maintainer Info
LABEL maintainer="Your Name <your-email@example.com>"

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod tidy
RUN go mod download

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

# Build the Go app
RUN go build  -o main ./cmd/*.go

FROM alpine:latest
COPY --from=builder /grpc_health_probe /bin/grpc_health_probe

# Set the Current Working Directory inside the container
WORKDIR /app
COPY --from=builder /app/main .

# Expose port 8080 to the outside world
EXPOSE 4400

RUN ls /app
RUN chmod +x /app/main
# Command to run the executable
CMD ["./main"]
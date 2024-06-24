package main

import (
	"theHuycoder.com/medux-api-gateway/pkg/config"
	supertokensDefinition "theHuycoder.com/medux-api-gateway/pkg/supertokens"
)

func main() {

	config, error := config.LoadConfig()

	if error != nil {
		panic(error.Error())
	}

	supertokensDefinition.Init(config)
	initServer(config)
}

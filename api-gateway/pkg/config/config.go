package config

import "github.com/spf13/viper"

type Config struct {
	Port                    string `mapstructure:"PORT"`
	AuthSvcUrl              string `mapstructure:"AUTH_SVC_URL"`
	SupertokenAppName       string `mapstructure:"SUPERTOKEN_APP_NAME"`
	SupertokenApiDomain     string `mapstructure:"SUPERTOKEN_API_DOMAIN"`
	SupertokenWebsiteDomain string `mapstructure:"SUPERTOKEN_WEBSITE_DOMAIN"`
	SupertokenConnectionURI string `mapstructure:"SUPERTOKEN_CONNECTION_URI"`
}

func LoadConfig() (*Config, error) {
	viper.AutomaticEnv()

	viper.BindEnv("PORT")
	viper.BindEnv("AUTH_SVC_URL")
	viper.BindEnv("SUPERTOKEN_APP_NAME")
	viper.BindEnv("SUPERTOKEN_API_DOMAIN")
	viper.BindEnv("SUPERTOKEN_WEBSITE_DOMAIN")
	viper.BindEnv("SUPERTOKEN_CONNECTION_URI")

	viper.SetDefault("PORT", ":4000")

	var config Config
	if err := viper.Unmarshal(&config); err != nil {
		return nil, err
	}

	return &config, nil
}

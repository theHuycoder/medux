package supertokens

import (
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/supertokens"
	"theHuycoder.com/medux-api-gateway/pkg/config"
)

func Init(c *config.Config) {
	err := supertokens.Init(supertokens.TypeInput{
		Supertokens: &supertokens.ConnectionInfo{
			ConnectionURI: c.SupertokenConnectionURI,
		},
		AppInfo: supertokens.AppInfo{
			AppName:       c.SupertokenAppName,
			APIDomain:     c.SupertokenApiDomain,
			WebsiteDomain: c.SupertokenWebsiteDomain,
		},
		RecipeList: []supertokens.Recipe{
			session.Init(nil),
		},
	})

	if err != nil {

		panic(err.Error())
	}
}

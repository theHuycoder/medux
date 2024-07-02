package user

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/supertokens"
	userPb "github.com/theHuycoder/medux-proto-go/pkg/user"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"theHuycoder.com/medux-api-gateway/pkg/config"
)

type userHandler struct {
	config *config.Config
}

type UserHandler interface {
	GetGrpConn() *grpc.ClientConn
	GetUserProfile(c *gin.Context)
}

func GetGrpConn(config *config.Config) *grpc.ClientConn {
	var conn *grpc.ClientConn
	conn, err := grpc.NewClient(config.UserServiceConn, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}

	return conn
}

func NewUserHandler(config *config.Config) UserHandler {
	return &userHandler{
		config: config,
	}
}

func (u *userHandler) GetGrpConn() *grpc.ClientConn {
	return GetGrpConn(u.config)
}

func (u *userHandler) GetUserProfile(c *gin.Context) {
	conn := u.GetGrpConn()
	defer conn.Close()

	client := userPb.NewUserServiceClient(conn)

	sesisionContainer := session.GetSessionFromRequestContext(c.Request.Context())

	if sesisionContainer == nil {
		c.JSON(500, "no session found")
		return
	}

	_, err := sesisionContainer.GetSessionDataInDatabase()

	if err != nil {
		err = supertokens.ErrorHandler(err, c.Request, c.Writer)

		if err != nil {
			c.JSON(500, err)
			return
		}
	}

	userId := sesisionContainer.GetUserID()

	userProfile, err := client.GetUser(c, &userPb.GetUserProfileRequest{
		UserId: userId,
	})

	if err != nil {
		c.JSON(500, err)
		return
	}

	c.JSON(200, userProfile)
}

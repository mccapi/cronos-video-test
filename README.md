# cronos-video-test
This is an exercise to create an API with a POST end point and a couple of GET methods (all and by id)

Inside you'll see a MVC pattern with dependency injection and SOLID principle following

You can run the tests without mongodb but if you want to run the server you must to install it

see https://www.mongodb.com/ if you need to install mongodb

See .env file if you need to change any value

the endpoints are: 

GET /videos to retrieve all videos

GET /videos/{id} to retrieve video by id

POST /videos to insert a new video (description and url as JSON body post). You can insert one (simple object) or many (array of objects)

# nodejs-meetup

Sample code for Node.js Armenia #2 meetup

## Prerequisites

For starting the example API and mailer service you need to install

- Node.js 
- docker, docker-compose

## Starting

To start the services you need to create .env files in each service based on
.env.dist blueprint and run the following commands

```bash
sudo docker-compose build
sudo docker-compose up kafka
sudo docker-compose up api-users service-mailer
```

Make a dumb user creating request to `http://localhost:3001/users` sending 
`firstName`, `lastName`, `email`, `password` in request body.

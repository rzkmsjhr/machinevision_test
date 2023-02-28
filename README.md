# Machine Vision Full stack Test

To run all the application, please follow instructions bellow

first, you can clone this repository.
and then at the parent folder `machinevision_test`
go to backend folder
`cd backend`
from there you can start installing package, type:

    npm install
on root folder, create an `.env` files that contains:

`ACCESS_TOKEN_SECRET =` your desirable access token

`REFRESH_TOKEN_SECRET =` your desirable secret token

fill it with alpha-numeric combination

and then type `npx nodemon` to run backend app.
it should be running on `http://localhost:5000`

it's not necessary to dump database, all you have to do is create a database called `socialmedia` on mysql,
but if needed, the database dump file available on `db` folder

after you successfully run backend app, you move to frontend folder
`cd frontend`

simply run:

    npm install
 and then

     npm start
it should be running on `http://localhost:3000`

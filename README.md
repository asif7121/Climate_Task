// Create a config.env file in config directory and Set these variables

//Database url in config/config.env file
DB_URL=mongodb://localhost:27017/<DatabaseName>

//Port no 
PORT=1010

//after that run { npm i} to install the dependencies that were in package.json file

//start the sever 
npm start

//now api endpoints

Tool: POSTMAN
// To Create a Climate Data 

POST request :  http://localhost:1010/api/v2/climate/

body->raw->json //send data in this section to create a data in database
 
 example:
 {
    "climate":"",
    "area_code":,
    "temperature":,
    "humidity":,
    "chances_of_rain":
}

// TO Get All Records Of Climate Data From Database

GET request : http://localhost:1010/api/v2/climate/allrecords


// To fetch records of a particular area by using area_code

GET request : http://localhost:1010/api/v2/climate/arearecords

body->raw->json //send data in this section to get all records of a certain area

example:
{
    "area_code":111
}

// To fetch record of a particular climate in a particular area

GET request : http://localhost:1010/api/v2/climate/cli-area

body->raw->json //send data in this section to get records of a certain climate in a particular area

example:
{
    "area_code":111,
    "climate":"hot"
}

// Climate change index api

GET request : http://localhost:1010/api/v2/climate/climate-change-index

body->raw->json //send data in this section 

example:

{
    "from_climate":"hot",
    "to_climate":"rainy",
    "area_code":111
}



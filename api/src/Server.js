let express = require("express");
let cors = require('cors');
let path = require('path');
let MongoClient = require("mongodb").MongoClient;
let sanitizer = require('express-sanitizer');
let ObjectId = require('mongodb').ObjectId;

// MongoDB constants
const URL = "mongodb://mongo:27017/";
const DB_NAME = "dbTechs";

// construct application object via express
let app = express();
// add cors as middleware to handle CORs errors while developing
app.use(cors());

// middleware to read incoming JSON with request
app.use(express.json());
// middleware to sanitize all incoming JSON data
app.use(sanitizer());


// get absolute path to /build folder (production build of react web app)
const CLIENT_BUILD_PATH = path.join(__dirname, "./../../client/build");
// adding middleware to define static files location
app.use("/", express.static(CLIENT_BUILD_PATH));

app.get("/get", async (request, response) => {    
    // construct a MongoClient object, passing in additional options
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    try {
        await mongoClient.connect();
        // get reference to database via name
        let db = mongoClient.db(DB_NAME);
        let techArray = await db.collection("technologies").find().sort("name",1).toArray();
        let coursesArray = await db.collection("courses").find().sort("code",1).toArray();
        let json = { "technologies": techArray ,"courses": coursesArray};
        //let json = { "technologies": [] ,"courses": []};

        // set RESTFul status codes
        response.status(200);

        // serializes sampleJSON to string format
        response.send(json);
    } catch (error) {
        response.status(500);
        response.send({error: error.message});
        throw error;
    } finally {
        mongoClient.close();
    }
});

app.post("/addCourse", async (request, response) => {
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    try {
        await mongoClient.connect(); 

        // sanitize form input
        request.body.name = request.sanitize(request.body.name);
        request.body.code = request.sanitize(request.body.code);

        let codeExists = await mongoClient.db(DB_NAME).collection("courses").findOne({"code":request.body.code});

        if (codeExists !== null) {
            response.status(403);
            response.send({error: "duplicate"});
            mongoClient.close();
            return;
        }

        try {
            // insert new document into DB
            let result = await mongoClient.db(DB_NAME).collection("courses").insertOne(request.body);

            response.status(200);
            response.send(result);
        } catch (error) {
            response.status(500);
            response.send({error: error.message});
            throw error;
        } finally {
            mongoClient.close();
        }
          
        
        
    } catch (error) {
        response.status(500);
        response.send({error: error.message});
        throw error;
    } finally {
        mongoClient.close();
    }
});

app.put("/editCourse", async (request, response) => {   
 
    // construct a MongoClient object, passing in additional options
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    try {
        await mongoClient.connect();

        // sanitize and convert the id to an ObjectId object
        // becuz ID in mongo is not a string or number, it's an ObjectId object
        let id = new ObjectId(request.sanitize((request.body.courseId)));

        // sanitize all incoming JSON DATA
        request.body.name = request.sanitize(request.body.name);


        // updating new technology in collection in DB
        let coursesCollection = mongoClient.db(DB_NAME).collection("courses");

        let newValues = { $set: {name:request.body.name} };
        
        let updateCourses = await coursesCollection.updateOne( {"_id":id}, newValues);

        if (updateCourses.matchedCount <=  0){
            response.status(404);
            response.send({error: "No course found with the ID"});
            mongoClient.close();
            return;
        }

        // status code
        response.status(200);
        response.send(updateCourses);
        
    } catch (error) {
        response.status(500);
        response.send({error: error.message});
        throw error;
    } finally {
        mongoClient.close();
    }
});

app.delete("/deleteCourse", async (request, response) => {    
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    try {
        await mongoClient.connect();

        let id = new ObjectId(request.sanitize((request.body.courseId)));
        
        let coursesCollection = mongoClient.db(DB_NAME).collection("courses");
        let result = await coursesCollection.deleteOne({ "_id" : id });

        if (result.deletedCount <=  0){
            response.status(404);
            response.send({error: "No courses documents found with ID"});
            mongoClient.close();
            return;
        }
        
        response.status(200);
        response.send(result);


    } catch (error) {
        response.status(500);
        response.send({error: error.message});
        throw error;
    } finally {
        mongoClient.close();
    }
});


app.post("/addTechnology", async (request, response) => {
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    try {
        await mongoClient.connect(); 

        // sanitize form input
        request.body.name = request.sanitize(request.body.name);
        request.body.description = request.sanitize(request.body.description);
        request.body.difficulty = request.sanitize(request.body.difficulty);
        request.body.courses.forEach( course => {
            course.code = request.sanitize(course.code);
            course.name = request.sanitize(course.name);
        });

        // insert new document into DB
        let result = await mongoClient.db(DB_NAME).collection("technologies").insertOne(request.body);

        response.status(200);
        response.send(result);
        
    } catch (error) {
        response.status(500);
        response.send({error: error.message});
        throw error;
    } finally {
        mongoClient.close();
    }
});

app.put("/editTechnology", async (request, response) => {    
    // construct a MongoClient object, passing in additional options
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    try {
        await mongoClient.connect();

        // sanitize and convert the id to an ObjectId object
        // becuz ID in mongo is not a string or number, it's an ObjectId object
        let id = new ObjectId(request.sanitize((request.body.technologyId)));

        // sanitize all incoming JSON DATA
        request.body.name = request.sanitize(request.body.name);
        request.body.description = request.sanitize(request.body.description);
        request.body.difficulty = request.sanitize(request.body.difficulty);
        request.body.courses.forEach( course => {
            course.code = request.sanitize(course.code);
            course.name = request.sanitize(course.name);
        });

        // updating new technology in collection in DB
        let technologiesCollection = mongoClient.db(DB_NAME).collection("technologies");

        let newValues = { $set: {name:request.body.name, description:request.body.description, difficulty:request.body.difficulty, courses:request.body.courses} };
        
        let updateTechnologies = await technologiesCollection.updateOne( {"_id":id}, newValues);

        if (updateTechnologies.matchedCount <=  0){
            response.status(404);
            response.send({error: "No course found with the ID"});
            mongoClient.close();
            return;
        }

        // status code
        response.status(200);
        response.send(updateTechnologies);
        
    } catch (error) {
        response.status(500);
        response.send({error: error.message});
        throw error;
    } finally {
        mongoClient.close();
    }
});

app.delete("/deleteTechnology", async (request, response) => {    
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    try {
        await mongoClient.connect();

        let id = new ObjectId(request.sanitize((request.body.technologyId)));
        
        let technologiesCollection = mongoClient.db(DB_NAME).collection("technologies");
        let result = await technologiesCollection.deleteOne({ "_id" : id });

        if (result.deletedCount <=  0){
            response.status(404);
            response.send({error: "No technologies documents found with ID"});
            mongoClient.close();
            return;
        }
        
        response.status(200);
        response.send(result);


    } catch (error) {
        response.status(500);
        response.send({error: error.message});
        throw error;
    } finally {
        mongoClient.close();
    }
});

app.put("/pushTechnologyCourse", async (request, response) => {    
    // construct a MongoClient object, passing in additional options
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    try {
        await mongoClient.connect();

        // sanitize and convert the id to an ObjectId object
        // becuz ID in mongo is not a string or number, it's an ObjectId object
        let id = new ObjectId(request.sanitize((request.body.courseId)));

        // sanitize all incoming JSON DATA
        request.body.name = request.sanitize(request.body.name);
        request.body.code = request.sanitize(request.body.code);
        request.body.originalName = request.sanitize(request.body.originalName);

        // updating new technology in collection in DB
        let technologiesCollection = mongoClient.db(DB_NAME).collection("technologies");


        let result = await technologiesCollection.updateMany(
            {
                "courses": {
                    "$elemMatch": { code: request.body.code }
                }},
                { $push:{ 'courses': {code: request.body.code,
                    name:  request.body.name} }}
          );

          

        // catching error of incorrect id or id of photo that doesn't exist
        // if (result.matchedCount <=  0){
        //     response.status(404);
        //     response.send({error: "No photo found with the ID"});
        //     mongoClient.close();
        //     return;
        // }

        // status code
        response.status(200);
        response.send(result);
        
    } catch (error) {
        response.status(500);
        response.send({error: error.message});
        throw error;
        //console.log(`>>> ERROR : ${error.message}`);
    } finally {
        mongoClient.close();
    }
});

app.put("/pullTechnologyCourse", async (request, response) => {    
    // construct a MongoClient object, passing in additional options
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    try {
        await mongoClient.connect();

        // sanitize and convert the id to an ObjectId object
        // becuz ID in mongo is not a string or number, it's an ObjectId object
        let id = new ObjectId(request.sanitize((request.body.courseId)));

        // sanitize all incoming JSON DATA
        request.body.name = request.sanitize(request.body.name);
        request.body.code = request.sanitize(request.body.code);
        request.body.originalName = request.sanitize(request.body.originalName);

        // updating new technology in collection in DB
        let technologiesCollection = mongoClient.db(DB_NAME).collection("technologies");


        let result = await technologiesCollection.updateMany(
            {
                "courses": {
                    "$elemMatch": { name: request.body.originalName, code: request.body.code }
                }},
                {
                    $pull: {
                        courses: { name: request.body.originalName }
                    }
                }
          );

        // catching error of incorrect id or id of photo that doesn't exist
        // if (result.matchedCount <=  0){
        //     response.status(404);
        //     response.send({error: "No photo found with the ID"});
        //     mongoClient.close();
        //     return;
        // }

        // status code
        response.status(200);
        response.send(result);
        
    } catch (error) {
        response.status(500);
        response.send({error: error.message});
        throw error;
        //console.log(`>>> ERROR : ${error.message}`);
    } finally {
        mongoClient.close();
    }
});

app.delete("/deleteTechnologyCourse", async (request, response) => {    
    let mongoClient = new MongoClient(URL, { useUnifiedTopology: true });
    try {
        await mongoClient.connect();

        request.body.code = request.sanitize(request.body.code);
        
        let technologiesCollection = mongoClient.db(DB_NAME).collection("technologies");

        let result = await technologiesCollection.deleteMany({
            "courses": {
                "$elemMatch": { code: request.body.code }
            }});

        // if (result.deletedCount <=  0){
        //     response.status(404);
        //     response.send({error: "No technologies documents found with ID"});
        //     mongoClient.close();
        //     return;
        // }
        
        response.status(200);
        response.send(result);


    } catch (error) {
        response.status(500);
        response.send({error: error.message});
        throw error;
    } finally {
        mongoClient.close();
    }
});


app.use("/*", express.static(CLIENT_BUILD_PATH));

// startup the Express server - listening on port 80
app.listen(80, () => console.log("Listening on port 80"));
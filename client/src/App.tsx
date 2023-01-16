import "./../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css"; 
import "./../node_modules/@fortawesome/fontawesome-free/css/solid.css";

import {Route,Routes} from "react-router-dom";

import List from "./List/List";
import EditCourse from "./EditCourse/EditCourse";
import DeleteCourse from "./DeleteCourse/DeleteCourse";
import AddCourse from "./AddCourse/AddCourse";
import AddTechnology from "./AddTechnology/AddTechnology";
import EditTechnology from "./EditTechnology/EditTechnology";
import DeleteTechnology from "./DeleteTechnology/DeleteTechnology";

import React from 'react';
import { getJSONData } from "./Tools/Toolkit";
import { Technology, Course } from "./Tools/data.model";

import Error from "./Error/Error";
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";

//const RETRIEVE_SCRIPT:string = "http://localhost/get";
const RETRIEVE_SCRIPT:string = '/get';

function App() {

  // ---------------------------------------------- event handlers
  const onResponse = (result:any) => {
    if (result.technologies != undefined){
      setTechnologies(result.technologies);
    }
    if (result.courses != undefined){
      setCourses(result.courses);
    }


    setLoading(false);
  };

  const onError = () => {
    console.log("*** Error has occured during AJAX data transmission");
  }

  // ---------------------------------------------- lifecycle hooks
  React.useEffect(() => {
    getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
  }, []);

  // --------------------------------------------- state setup
  const [technologies, setTechnologies] = React.useState<Technology[]>([]);
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true); 

  

  return (
    <div className="overflow-y-auto min-h-screen p-5 bg-white">
      <LoadingOverlay bgColor="#a72f57" spinnerColor="#FFFFFF" enabled={loading} />

      <div className="font-bold text-xl pb-2.5">_Technology Roster Admin</div>

      {/* if there is no documents in the database */}
      {/* {(courses.length > 0 || technologies.length > 0) ? */}
      <Routes>
        <Route
          path="/"
          element={<List technologies={technologies} courses={courses}/>}  
        />
        
        <Route
          path="/list"
          element={<List technologies={technologies} courses={courses}/>}
        />

        <Route
        // using route parameter
          path="/editCourse/:id"
          element={<EditCourse courses={courses} onResponse={onResponse}
          onError={onError}
          RETREIVE_SCRIPT={RETRIEVE_SCRIPT} setLoading={setLoading}/>}
        />

        <Route
        // using route parameter
          path="/addCourse"
          element={<AddCourse courses={courses} onResponse={onResponse}
          onError={onError}
          RETREIVE_SCRIPT={RETRIEVE_SCRIPT} setLoading={setLoading}/>}
        />
        
        <Route
        // using route parameter
          path="/deleteCourse/:id"
          element={<DeleteCourse courses={courses} onResponse={onResponse}
          onError={onError}
          RETREIVE_SCRIPT={RETRIEVE_SCRIPT} setLoading={setLoading}/>}        
        />
        
        <Route
        // using route parameter
          path="/deleteTechnology/:id"
          element={<DeleteTechnology technologies={technologies} onResponse={onResponse}
          onError={onError}
          RETREIVE_SCRIPT={RETRIEVE_SCRIPT} setLoading={setLoading}/>}        
        />
        
        <Route
        // using route parameter
          path="/editTechnology/:id"
          element={<EditTechnology courses={courses} technologies={technologies} onResponse={onResponse}
          onError={onError}
          RETREIVE_SCRIPT={RETRIEVE_SCRIPT} setLoading={setLoading}/>}
        />

        <Route
        // using route parameter
          path="/addTechnology"
          element={<AddTechnology courses={courses} onResponse={onResponse}
          onError={onError}
          RETREIVE_SCRIPT={RETRIEVE_SCRIPT} setLoading={setLoading}/>}
        />

        <Route
          path="/*"
          element={<Error />}
        />

      </Routes>
      {/* : <div> There are no technologies in the database </div>
      } */}



      <div className="mt-10 mb-2.5">Technology descriptions by <a href="https://wikipedia.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">wikipedia</a></div>
    </div>
  );
}

export default App;

import React from 'react';
import { useParams } from 'react-router-dom';
import { EditCourseComponentProps, Course } from "./../Tools/data.model"
import { getJSONData, sendJSONData} from "./../Tools/Toolkit";
import { Link } from 'react-router-dom'; 


const DeleteCourse = ({courses,onResponse,onError,RETREIVE_SCRIPT,setLoading}:EditCourseComponentProps) => {

    let { id } = useParams<{id:string}>();

    let course:(Course | undefined) = courses.find(item => item._id === id);

    const DELETE_SCRIPT_COURSES:string = "http://localhost/deleteCourse";
    const DELETE_SCRIPT_TECHNOLOGIES:string = "http://localhost/deleteTechnologyCourse";
    // const DELETE_SCRIPT_COURSES:string = "/deleteCourse";
    // const DELETE_SCRIPT_TECHNOLOGIES:string = "/deleteTechnologyCourse";

    function onSubmitResponse(responseText:any) {
        getJSONData(RETREIVE_SCRIPT, onResponse, onError);
        setLoading(false);
        
    }
        
    function onSubmitError(e:any) {
            console.log("Error - an issue occurrred with AJAX data transmission");
    }

    const onDelete = (e:any) => {
        setLoading(true);
        let sendJSON:Object = 
        {
            "courseId": id,
            "code": course != undefined ? course.code : ""
        };
        

        let sendString:string = JSON.stringify(sendJSON);
        console.log(sendString);
        
        sendJSONData(DELETE_SCRIPT_COURSES, sendString, onSubmitResponse, onSubmitError, "DELETE");
        sendJSONData(DELETE_SCRIPT_TECHNOLOGIES, sendString, onSubmitResponse, onSubmitError, "DELETE");

}; 

    // ---------------------------------- render to the DOM
    return(
        (course !== undefined) ? 
        <div>
            <h3 className="mb-2">Are you sure you want to delete the follow course:</h3>
            <div className="mb-2">{course.name}</div>
            <div className="flex flex-row mt-3">
                <div>
                    <Link to={"/"}><button className="bg-green-500 text-[#FFF] border-0 mr-1 p-1 hover:opacity-50 w-20 rounded" onClick={onDelete}>Ok</button></Link>
                </div>
                <div>
                    <Link to={"/"}><button className="bg-green-500 text-[#FFF] border-0 mr-1 p-1 hover:opacity-50 w-20 rounded">Cancel</button></Link>
                </div>
            </div>

        </div>
        : <div>
             <div className="pt-2">
            <div className="font-bold"><i className="fas fa-arrow-left content__button pr-2 text-xl hover:text-accent"></i>Error :(</div>
            <div className="max-w-3xl pb-4">The requested course doesn't exist</div>
            </div>
        </div>
    );
}

export default DeleteCourse;
import React from 'react';
import { useParams } from 'react-router-dom';
import { EditCourseComponentProps, Course } from "./../Tools/data.model"
import { getJSONData, sendJSONData} from "./../Tools/Toolkit";
import { Link } from 'react-router-dom'; 


const EditCourse = ({courses,onResponse,onError,RETREIVE_SCRIPT,setLoading}:EditCourseComponentProps) => {

    // get the id route parameter passed to this component

    let { id } = useParams<{id:string}>();

    //console.log("id" + id)

    let course:(Course | undefined) = courses.find(item => item._id === id);

    const PUT_SCRIPT_COURSES:string = "http://localhost/editCourse";
    const PUT_SCRIPT_PULL:string = "http://localhost/pullTechnologyCourse";
    const PUT_SCRIPT_PUSH:string = "http://localhost/pushTechnologyCourse";
    // const PUT_SCRIPT_COURSES:string = "/editCourse";
    // const PUT_SCRIPT_PULL:string = "/pullTechnologyCourse";
    // const PUT_SCRIPT_PUSH:string = "/pushTechnologyCourse";

    const [courseName, setCourseName] = React.useState(course != undefined ? course.name : "");

    const handleCourseName = (e:any) => {
        setCourseName(e.target.value);
    };

    function onSubmitResponse(responseText:any) {
        getJSONData(RETREIVE_SCRIPT, onResponse, onError);
        setLoading(false);
    }
        
    function onSubmitError(e:any) {
            console.log("Error - an issue occurrred with AJAX data transmission");
    }

    const onEdit = (e:any) => {
        setLoading(true);

        let sendJSON:Object = 
        {
            "courseId": id,
            "name": courseName,
            "originalName":course != undefined ? course.name : "",
            "code": course != undefined ? course.code : ""
        };

        let sendString:string = JSON.stringify(sendJSON);
        //console.log(sendString);
        
        sendJSONData(PUT_SCRIPT_COURSES, sendString, onSubmitResponse, onSubmitError, "PUT");
        // push the new course to technology collections by searching same course code
        sendJSONData(PUT_SCRIPT_PUSH, sendString, onSubmitResponse, onSubmitError, "PUT");
        // pull(remove) the orginal course from technology collections by searching orginal course name
        sendJSONData(PUT_SCRIPT_PULL, sendString, onSubmitResponse, onSubmitError, "PUT");

}; 

    // ---------------------------------- render to the DOM
    return(
        (course !== undefined) ? 
        <div>
            <div className="pb-3 text-green-500 font-bold">Edit Course:</div>
            <div><label className="form__label" >Course Code:</label></div>
            <div><input className="border-solid bg-gray-100 text-[#CCC]" type="text" value={course.code} disabled/></div>
            <div><label className="form__label" >Course Name:</label></div>
            <div><input className="border-solid bg-gray-100" type="text" onChange={handleCourseName} value={courseName} maxLength={100}/></div>
            <div className="flex flex-row mt-3">
                <div>
                    <Link to={"/"}><button className={courseName == "" ? "bg-gray-100 border-0 mr-1 p-1 w-20 rounded" : "bg-green-500 text-[#FFF] border-0 mr-1 p-1 hover:opacity-50 w-20 rounded"} onClick={onEdit} disabled={courseName == "" ? true : false}>Ok</button></Link>
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

export default EditCourse;
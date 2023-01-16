import React from 'react';
import { useParams } from 'react-router-dom';
import { EditCourseComponentProps, Course,TechCourse } from "./../Tools/data.model"
import { getJSONData, sendJSONData} from "./../Tools/Toolkit";
import { Link } from 'react-router-dom'; 
import $ from 'jquery';


const AddTechnology = ({courses,onResponse,onError,RETREIVE_SCRIPT,setLoading}:EditCourseComponentProps) => {

    const ADD_SCRIPT_TECHNOLOGIES:string = "http://localhost/addTechnology";
    //const ADD_SCRIPT_TECHNOLOGIES:string = "/addTechnology";
    
    let courseList:TechCourse[] = [];

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [difficulty, setDifficulty] = React.useState(1);

    const handleName = (e:any) => {
        setName(e.target.value);
    };

    const handleDescription = (e:any) => {
        setDescription(e.target.value);
    };

    const handleDifficulty = (e:any) => {
        setDifficulty(e.target.value);
    };

    const handleCheckbox = (e:any) => {
        const course: TechCourse = {
            code: e.target.name,
            name: e.target.value
        };

        if (e.target.checked == true){
            courseList.push(course);
        }else {
            // The splice method can be used to add or remove elements from an array. The first argument specifies the location at which to begin adding or removing elements. The second argument specifies the number of elements to remove. 
            let index:number = courseList.indexOf(course);
            courseList.splice(index,1);
        }
        // console.log(courseList);

        return courseList
    };

    function onSubmitResponse(responseText:any) {
        getJSONData(RETREIVE_SCRIPT, onResponse, onError);
        setLoading(false);
    }
        
    function onSubmitError() {
            console.log("Error - an issue occurrred with AJAX data transmission");
    }

    const onAdd = (e:any) => {
        setLoading(true);
        console.log(courseList);

        let sendJSON:Object = 
        {
            "name": name,
            "description": description,
            "difficulty": difficulty,
            "courses": courseList
        };
        
        let sendString:string = JSON.stringify(sendJSON);        
        sendJSONData(ADD_SCRIPT_TECHNOLOGIES, sendString, onSubmitResponse, onSubmitError, "POST");

    }; 

    $("[type='number']").keypress(function (e:any) {
        e.preventDefault();
    });

    // ---------------------------------- render to the DOM
    return(
        <div>
            <div className="pb-3 text-green-500 font-bold">Add New Technology:</div>
            <div><label className="form__label" >Name:</label></div>
            <div><input className="border-solid bg-gray-100" type="text" onChange={handleName} value={name} maxLength={100}/></div>
            <div><label className="form__label" >Description:</label></div>
            <div><textarea className="border-solid bg-gray-100" rows={10} cols={40} onChange={handleDescription} value={description} maxLength={200}/></div>
            <div><label className="form__label" >Difficulty:</label></div>
            <div><input className="border-solid bg-gray-100" type="number" onChange={handleDifficulty} value={difficulty} min="1" max="5"/></div>
            <div className="mt-2">Used in Courses:</div>
            {courses.map((data:Course, n:number)=>
                <div key={n} className="mt-2">
                    <div><label><input type="checkbox" onClick={handleCheckbox} value={data.name} name={data.code}/> {data.code} {data.name}</label></div>
                </div>
            )}
            

            <div className="flex flex-row mt-3">
                <div>
                    <Link to={"/"}><button className={(name == "" || description == "") ? "bg-gray-100 border-0 mr-1 p-1 w-20 rounded" :"bg-green-500 text-[#FFF] border-0 mr-1 p-1 hover:opacity-50 w-20 rounded"} onClick={onAdd} disabled={(name == "" || description == "") ? true : false}>Ok</button></Link>
                </div>
                <div>
                    <Link to={"/"}><button className="bg-green-500 text-[#FFF] border-0 mr-1 p-1 hover:opacity-50 w-20 rounded">Cancel</button></Link>
                </div>
            </div>

        </div>
    );
}

export default AddTechnology;
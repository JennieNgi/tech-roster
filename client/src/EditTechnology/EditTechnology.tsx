import React from 'react';
import { useParams } from 'react-router-dom';
import { EditTechnologyComponentProps, Course,TechCourse, Technology } from "./../Tools/data.model"
import { getJSONData, sendJSONData} from "./../Tools/Toolkit";
import { Link } from 'react-router-dom'; 
import $ from 'jquery';


const EditTechnology = ({courses,technologies,onResponse,onError,RETREIVE_SCRIPT,setLoading}:EditTechnologyComponentProps) => {

    let { id } = useParams<{id:string}>();

    let technology:(Technology | undefined) = technologies.find(item => item._id === id);

    const EDIT_SCRIPT_TECHNOLOGIES:string = "http://localhost/editTechnology";
    //const EDIT_SCRIPT_TECHNOLOGIES:string = "/editTechnology";

    let courseList:TechCourse[] = technology != undefined ? technology.courses : [];

    const [name, setName] = React.useState(technology != undefined ? technology.name : "");
    const [description, setDescription] = React.useState(technology != undefined ? technology.description : "");
    const [difficulty, setDifficulty] = React.useState(technology != undefined ? technology.difficulty : "");


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
        }else if (e.target.checked == false) {
            // The splice method can be used to add or remove elements from an array. The first argument specifies the location at which to begin adding or removing elements. The second argument specifies the number of elements to remove. 
            // To find the index of an object in an array, by a specific property:
            let index:number = courseList.map(object => object.code).indexOf(course.code);;
            console.log(index);

            courseList.splice(index,1);
        }
        console.log(courseList);

        return courseList
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

        console.log(courseList);

        let sendJSON:Object = 
        {
            "technologyId": id,
            "name": name,
            "description": description,
            "difficulty": difficulty,
            "courses": courseList
        };
        
        let sendString:string = JSON.stringify(sendJSON);        
        sendJSONData(EDIT_SCRIPT_TECHNOLOGIES, sendString, onSubmitResponse, onSubmitError, "PUT");
    }; 

    $("[type='number']").keypress(function (e:any) {
        e.preventDefault();
    });

    // ---------------------------------- render to the DOM
    return(
        (technology !== undefined) ? 
        <div>
            <div className="pb-3 text-green-500 font-bold">Edit Technology:</div>
            <div><label className="form__label" >Name:</label></div>
            <div><input className="border-solid bg-gray-100"  maxLength={100} type="text" onChange={handleName} value={name}/></div>
            <div><label className="form__label" >Description:</label></div>
            <div><textarea className="border-solid bg-gray-100" maxLength={200} rows={10} cols={40} onChange={handleDescription} value={description}/></div>
            <div><label className="form__label" >Difficulty:</label></div>
            <div><input className="border-solid bg-gray-100" type="number" onChange={handleDifficulty} value={difficulty} maxLength={1} min="1" max="5" pattern='[1-5]*'/></div>
            <div className="mt-2">Used in Courses:</div>
            {courses.map((data:Course, n:number)=>
                <div key={n} className="mt-2">
                    <div><label><input type="checkbox" onClick={handleCheckbox} value={data.name} name={data.code} defaultChecked={(courseList.some(e => e.code === data.code)) ? true : false}/> {data.code} {data.name}</label></div>
                </div>
            )}
            
            <div className="flex flex-row mt-3">
                <div>
                    <Link to={"/"}><button className={(name == "" || description == "") ? "bg-gray-100 border-0 mr-1 p-1 w-20 rounded" :"bg-green-500 text-[#FFF] border-0 mr-1 p-1 hover:opacity-50 w-20 rounded"}onClick={onEdit} disabled={(name == "" || description == "") ? true : false}>Ok</button></Link>
                </div>
                <div>
                    <Link to={"/"}><button className="bg-green-500 text-[#FFF] border-0 mr-1 p-1 hover:opacity-50 w-20 rounded">Cancel</button></Link>
                </div>
            </div>

        </div>:
        <div>
            <div className="pt-2">
                <div className="font-bold"><i className="fas fa-arrow-left content__button pr-2 text-xl hover:text-accent"></i>Error :(</div>
                <div className="max-w-3xl pb-4">The requested technology doesn't exist</div>
            </div>
        </div>
    )
    ;
}

export default EditTechnology;
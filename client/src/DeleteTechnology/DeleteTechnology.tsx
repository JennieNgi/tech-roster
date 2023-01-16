import React from 'react';
import { useParams } from 'react-router-dom';
import { DeleteTechnologyComponentProps, Technology } from "./../Tools/data.model"
import { getJSONData, sendJSONData} from "./../Tools/Toolkit";
import { Link } from 'react-router-dom'; 


const DeleteTechnology = ({technologies,onResponse,onError,RETREIVE_SCRIPT,setLoading}:DeleteTechnologyComponentProps) => {

    let { id } = useParams<{id:string}>();

    let technology:(Technology | undefined) = technologies.find(item => item._id === id);

    const DELETE_SCRIPT_TECHNOLOGIES:string = "http://localhost/deleteTechnology";
    //const DELETE_SCRIPT_TECHNOLOGIES:string = "/deleteTechnology";

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
            "technologyId": id
        };
        

        let sendString:string = JSON.stringify(sendJSON);
        console.log(sendString);
        
        sendJSONData(DELETE_SCRIPT_TECHNOLOGIES, sendString, onSubmitResponse, onSubmitError, "DELETE");

}; 

    // ---------------------------------- render to the DOM
    return(
        (technology !== undefined) ? 
        <div>
            <h3 className="mb-2">Are you sure you want to delete the follow technology:</h3>
            <div className="mb-2">{technology.name}</div>
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
            <div className="max-w-3xl pb-4">The requested technology doesn't exist</div>
            </div>
        </div>
    );
}

export default DeleteTechnology;
import React from 'react';
import { ListComponentProps, Technology, Course } from "./../Tools/data.model"
import { Link } from 'react-router-dom';

const List = ({technologies, courses}:ListComponentProps) => {

    // ---------------------------------- render to the DOM
    return(
        <div className="flex flex-wrap">
            <div className="flex flex-col flex-nowrap pr-5">

                <div className="flex flex-row flex-wrap">
                    <div className="pr-5">
                        <div className="pb-3 text-green-500 font-bold">Technologies</div>
                        <div className="ml-8 pl-2.5 py-2 border-l-4 border-solid border-green-500 text-gray-600 min-w-md">
                            <Link to={`/addTechnology`}><i className="fas fa-plus content__button pr-2 pb-2 text-xl hover:text-accent"></i></Link>

                            {technologies.map((data:Technology, n:number)=>

                                <div key={n} className="pb-2 flex flex-row flex-nowrap">
                                    {/* <a href="http://www.seanmorrow.ca" className="text-accent font-bold hover:underline">{data.name}</a> */}
                                    <Link to={`/editTechnology/${data._id}`}><i className="fas fa-pencil content__button pr-2 text-xl hover:text-accent"></i></Link>
                                    <Link to={`/deleteTechnology/${data._id}`}><i className="fas fa-trash content__button pr-2 text-xl hover:text-accent"></i></Link>
                                    <div className="text-accent font-bold break-words max-w-md">{data.name}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="pb-3 text-green-500 font-bold">Courses</div>

                        <div className="ml-8 pl-2.5 py-2 border-l-4 border-solid border-green-500 text-gray-600 min-w-md">

                            <Link to={`/addCourse`}><i className="fas fa-plus content__button pr-2 pb-2 text-xl hover:text-accent"></i></Link>

                            {courses.map((data:Course, n:number)=>
                                <div key={n} className="pb-2 flex flex-row flex-nowrap">
                                    <Link to={`/editCourse/${data._id}`}><i className="fas fa-pencil content__button pr-2 text-xl hover:text-accent"></i></Link>
                                    <Link to={`/deleteCourse/${data._id}`}><i className="fas fa-trash content__button pr-2 text-xl hover:text-accent"></i></Link>
                                    <div className="text-accent font-bold break-words max-w-md">{data.code} {data.name}</div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>


            </div>
        </div>
    );
}

export default List;
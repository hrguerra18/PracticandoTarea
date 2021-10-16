import React from "react";

export default function Input(props){
    return(
        <div className="mb-3 row ">
        <label forHtml={props.id} className="col-sm- col-form-label">{props.label}</label>
        <div className="col-sm-12">
            <input type="text" onChange={props.getValue} className="form-control" id={props.id} />
        </div>
    </div>
    );
}
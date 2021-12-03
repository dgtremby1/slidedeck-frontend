// Import CSS
import "./css/ColumnsVisualizer.css";
// Import major dependencies
import React from "react";
// Import components
// Import icons
// Import API and static content

const ColumnsVisualizer = (props) => {

    const template = props.template;
    const columns = [];
    const columnsL = [];
    const columnsR = [];
    const typesL = [];
    const typesR = []
    const roles = [];

    template.headers.map((header) => {
        const name = header[0];
        const type = header[1][0];
        const role = header[1][1];
        if (roles.length === 0) roles.push(role);
        if (role === roles[0]) {
            columnsL.push(name);
            typesL.push(type);
        } else {
            columnsR.push(name);
            typesR.push(type);
            if (roles.length === 1) roles.push(role);
        }
        columns.push(name);
    })

    return(
        <div className="backdrop-header-bg columns-visualizer">
            <div className="vis-preview-side">
                <div className="vis-side-header">
                    <p className="truncate">{columnsL.length} columns to be completed by {roles[0]}</p>
                </div>
                <div className="vis-side-columns">
                    {columnsL.map((name, i) => {return(
                        <div title={name} key={i} className="backdrop-bg vis-column">
                            <p className="truncate">{name}</p>
                            <div className="divider"/>
                            <p className="subtitle">{typesL[i]}</p>
                        </div>
                    )})}
                </div>
            </div>
            <div className="vis-preview-side">
                <div className="vis-side-header">
                    <p className="truncate">{columnsR.length} columns To be completed by {roles[1]}</p>
                </div>
                <div className="vis-side-columns">
                    {columnsR.map((name, i) => {return(
                        <div title={name} key={i} className="backdrop-bg vis-column">
                            <p className="truncate">{name}</p>
                            <div className="divider"/>
                            <p className="subtitle">{typesR[i]}</p>
                        </div>
                    )})}
                </div>
            </div>
        </div>
    )

}

export default ColumnsVisualizer;
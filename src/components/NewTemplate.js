// Import CSS
import "./css/NewTemplate.css";
// Import major dependencies
import React, { createContext, useContext, useEffect, useState } from "react";
// Import components
import Auth from "./Auth";
import Banner from "./Banner";
import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
// import Dashboard from "../views/Dashboard";
import LoadSpinner from "./LoadSpinner";
import TextBox from "./TextBox";
// Import icons
import { FaTimes, FaPlus, FaArrowLeft, FaArrowRight, FaRegHandPointer, FaCheck } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5"; // , IoArrowUndo, IoArrowRedo
import { RiStethoscopeFill, RiMicroscopeFill } from "react-icons/ri";
import { BiText } from "react-icons/bi";
import { AiOutlineNumber } from "react-icons/ai";
// Import API and static content
import api from "../static/api";
import utils from "../static/utils";

const EditorContext = createContext();

const defaultColObj = () => {
    const state = {
        name: "Untitled Column",
        type: "text"
    }
    return state;
}

const defaultColGroupObj = () => {
    const state = {
        role: -1,
        columns: []
    }
    return state;
}

const defaultTemplate = () => {
    const template = [];
    for (let i = 0; i < 2; i++) {
        template.push(defaultColGroupObj());
    }
    return template;
}

const Column = (props) => {

    const editorContext = useContext(EditorContext);
    const activeCol = editorContext.active;
    const myGroupIndex = props.pIndex;
    const myColumn = props.col;
    const myColumnIndex = props.index;
    const myTuple = [myGroupIndex, myColumnIndex];
    const isActive = myGroupIndex === activeCol[0] && myColumnIndex === activeCol[1];
    let typeIcon;
    switch (myColumn.type) {
        case "text":
            typeIcon = <BiText/>;
            break;
        case "number":
            typeIcon = <AiOutlineNumber/>;
            break;
        case "date":
            typeIcon = <IoCalendarNumber/>;
            break;
        default:
            typeIcon = <BiText/>;
            break;
    }

    const changeActiveCol = () => {
        editorContext.setActive(myTuple);
    }

    return (
        <button title={`view group ${myGroupIndex+1} column ${myColumnIndex+1}`} onClick={() => {changeActiveCol(myColumnIndex)}} className={"col " + (isActive ? "active" : "")}>
            <p className="col-heading">G{myGroupIndex+1} C{myColumnIndex+1} {typeIcon}</p>
            <p className={"col-name " + (myColumn.name.length === 0 ? "blank" : "")}>{myColumn.name.length === 0 ? "blank" : myColumn.name}</p>
        </button>
    )
}

const ColumnGroup = (props) => {

    const editorContext = useContext(EditorContext);
    const myGroup = props.group;
    const myColumns = myGroup.columns;

    const addNewColumn = () => {
        const newCol = editorContext.default.column();
        const currentLength = myColumns.length;
        newCol.name += ` ${currentLength + 1}`;
        editorContext.setState((template) => {
            const newTemplate = utils.clone(template);
            newTemplate[props.index].columns.push(newCol);
            return newTemplate;
        });
        editorContext.setActive([props.index, currentLength]);
    }
    const addNewColumnGroup = (i) => {
        const newColGroup = editorContext.default.group();
        editorContext.setState((template) => {
            const newTemplate = utils.clone(template);
            newTemplate.splice(i, 0, newColGroup);
            return newTemplate;
        });
        if (i === editorContext.active[0]) {
            editorContext.setActive((active) => {
                const clone = utils.clone(active);
                clone[0] += 1;
                return clone;
            });
        }
    }
    const removeColumnGroup = () => {
        if (editorContext.state.length > 1) {
            if (myColumns.length === 0) {            
                editorContext.setState((template) => {
                    const newTemplate = utils.clone(template);
                    newTemplate.splice(props.index, 1);
                    return newTemplate;
                });
                if (props.index === editorContext.active[0]) {
                    editorContext.setActive([-1, -1]);
                } else if (props.index < editorContext.active[0]) {
                    editorContext.setActive((active) => {
                        const clone = utils.clone(active);
                        clone[0] -= 1;
                        return clone;
                    });
                }
            } else {
                editorContext.setBannerText("Column group is not empty. Delete individual columns first.");
                editorContext.setBannerShow(true);
            }
        } else {
            editorContext.setBannerText("Cannot delete only column group. User should never see this message.");
            editorContext.setBannerShow(true);
        }
    }
    const shiftColumnGroup = (i) => {
        const targetHasActive = i === editorContext.active[0];
        const selfHasActive = props.index === editorContext.active[0];
        if (i >= 0 && i <= editorContext.state.length-1) {
            const myClone = utils.clone(myGroup);
            const swapClone = utils.clone(editorContext.state[i]);
            editorContext.setState((template) => {
                const newTemplate = utils.clone(template);
                newTemplate.splice(i, 1, myClone);
                newTemplate.splice(props.index, 1, swapClone);
                return newTemplate;
            });
            editorContext.setActive((active) => {
                const clone = utils.clone(active);
                if (targetHasActive) clone[0] = props.index;
                if (selfHasActive) clone[0] = i;
                return clone;
            })
        }
    }
    const setGroupRole = (m) => {
        editorContext.setState((template) => {
            const newTemplate = utils.clone(template);
            newTemplate[props.index].role = m;
            return newTemplate;
        });
    }

    return (
        <div className="col-group-wrapper">
            <div className="col-group-controls">
                <div className="col-group-buttons">
                    <button title="insert new column group here" onClick={() => {addNewColumnGroup(props.index)}} className="add-left">
                        <FaPlus/>
                        <div className="button-caret"/>
                    </button>
                    <span>
                        <button title="shift column group left" onClick={() => {shiftColumnGroup(props.index-1)}} className="move-left">
                            <FaArrowLeft/>
                        </button>
                        <button title="delete this column group" onClick={() => {removeColumnGroup()}} className="remove-self">
                            <FaTimes/>
                            <div className="button-caret"/>
                        </button>
                        <button title="shift column group left" onClick={() => {shiftColumnGroup(props.index+1)}} className="move-right">
                            <FaArrowRight/>
                        </button>
                    </span>
                    <button title="insert new column group here" onClick={() => {addNewColumnGroup(props.index+1)}} className="add-right">
                        <FaPlus/>
                        <div className="button-caret"/>
                    </button>
                </div>
            </div>
            <div className="col-group">
                <div className="col-group-header">
                    <div className="flex-grow"/>
                    <span>
                        <p className="col-group-title">Group {props.index+1} to be completed by</p>
                        <ButtonGroup active={myGroup.role} buttons={[
                            <Button title="reserved for lab technicians" onClick={() => {setGroupRole(0)}} icon={RiMicroscopeFill}>Technician</Button>,
                            <Button title="reserved for pathologists" onClick={() => {setGroupRole(1)}} icon={RiStethoscopeFill}>Pathologist</Button>
                        ]}/>
                    </span>
                    <div className="flex-grow"/>
                </div>
                <div className="bracket">
                    <div className="left"/>
                    <div className="extension"/>
                    <div className="center"/>
                    <div className="extension"/>
                    <div className="right"/>
                </div>
                <div className="columns-header">
                    <p></p>
                </div>
                <div className="columns">
                    {myColumns.map((col, i) => {return(
                        <Column col={col} pIndex={props.index} index={i} key={i}/>
                    )})}
                    <div className="new-col">
                        <button title="create new column"
                            onClick={() => {addNewColumn(props.index)}}
                        >
                            <FaPlus/>
                            <p>
                                New Column
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ColumnEditor = (props) => {
    const editorContext = useContext(EditorContext);
    const myGroupIndex = editorContext.active[0];
    const myColIndex = editorContext.active[1];
    const valid = myGroupIndex > -1 && myColIndex > -1;
    const myGroup = editorContext.state[myGroupIndex];
    const myCol = valid ? editorContext.state[myGroupIndex].columns[myColIndex] : undefined;
    const myDataType = valid ? editorContext.state[myGroupIndex].columns[myColIndex].type : "text";
    let activeType = -1;
    switch (myDataType) {
        case "text":
            activeType = 0;
            break;
        case "number":
            activeType = 1;
            break;
        case "date":
            activeType = 2;
            break;
        default:
            activeType = 0;
            break;
    }

    const changeDataType = (type) => {
        editorContext.setState((template) => {
            const clone = utils.clone(template);
            clone[myGroupIndex].columns[myColIndex].type = type;
            return clone;
        })
    }
    const changeColName = (e) => {
        const value = e.target.value;
        editorContext.setState((template) => {
            const clone = utils.clone(template);
            clone[myGroupIndex].columns[myColIndex].name = value;
            return clone;
        })
    }
    const onColNameBlur = (e) => {
        const value = e.target.value;
        if (value.length === 0) {
            editorContext.setBannerText("Column names cannot be blank.");
            editorContext.setBannerShow(true);
        }
    }
    const removeColumn = () => {
        const currentCount = myGroup.columns.length;
        editorContext.setState((template) => {
            const clone = utils.clone(template);
            clone[myGroupIndex].columns.splice(myColIndex, 1);
            return clone;
        });
        if (currentCount === 1) {
            editorContext.setActive([-1, -1]);
        } else {
            if (myColIndex === currentCount-1) {
                editorContext.setActive([myGroupIndex, myColIndex-1]);
            } else {
                editorContext.setActive([myGroupIndex, myColIndex]);
            }
        }
    }
    const shiftColumn = (i) => {
        if (i >= 0 && i <= editorContext.state[myGroupIndex].columns.length-1) {
            const myClone = utils.clone(editorContext.state[myGroupIndex].columns[myColIndex]);
            const swapClone = utils.clone(editorContext.state[myGroupIndex].columns[i]);
            editorContext.setState((template) => {
                const newTemplate = utils.clone(template);
                newTemplate[myGroupIndex].columns.splice(i, 1, myClone);
                newTemplate[myGroupIndex].columns.splice(myColIndex, 1, swapClone);
                return newTemplate;
            });
            editorContext.setActive((active) => {
                const clone = utils.clone(active);
                clone[1] = i;
                return clone;
            })
        }
    }

    const NeighborBlock = (props) => {
        const neighborIndex = props.left ? myColIndex - 1 : myColIndex + 1;
        if (neighborIndex >= 0 && neighborIndex < editorContext.state[myGroupIndex].columns.length) {
            const neighbor = editorContext.state[myGroupIndex].columns[neighborIndex];
            return (
                <>
                    <div className="ce-header">
                        <p>G{myGroupIndex+1} C{neighborIndex+1}</p>
                    </div>
                    <div className="ce-content">
                        <p className="truncate py-1">{neighbor.name}</p>
                        <div className="flex items-center justify-center h-8 truncate space-x-1">
                            {neighbor.type === "text" && <BiText className="h-4 w-4"/>}
                            {neighbor.type === "number" && <AiOutlineNumber className="h-4 w-4"/>}
                            {neighbor.type === "date" && <IoCalendarNumber className="h-4 w-4"/>}
                            <p className="truncate text-sm capitalize">{neighbor.type}</p>
                        </div>
                    </div>
                </>
            )
        } else {
            return <></>
        }
    }

    return(
        <div className="column-editor">
            {valid ? 
                <>
                    <div className="ce-controls">
                        <div className="ce-buttons">
                            <span>
                                <button 
                                    title="shift column left" 
                                    onClick={() => {shiftColumn(myColIndex-1)}}
                                    className={"move-left " + (myColIndex <= 0 ? "disabled" : "")}
                                >
                                    <FaArrowLeft/>
                                </button>
                                <button 
                                    title="delete this column" 
                                    onClick={removeColumn} 
                                    className="remove-self"
                                >
                                    <FaTimes/>
                                    <div className="button-caret"/>
                                </button>
                                <button 
                                    title="shift column right" 
                                    onClick={() => {shiftColumn(myColIndex+1)}}
                                    className={"move-left " + (myColIndex === editorContext.state[myGroupIndex].columns.length-1 ? "disabled" : "")}
                                >
                                    <FaArrowRight/>
                                </button>
                            </span>
                        </div>
                    </div>
                    <div className="ce-left">
                        <NeighborBlock left/>
                    </div>
                    <div className="ce-center">
                        <div className="ce-header">
                            <p>Group {myGroupIndex+1} Column {myColIndex+1}</p>
                        </div>
                        <div className="ce-content">
                            <div className="flex items-center space-x-2 truncate">
                                <p className="subtitle truncate">Column Name</p>
                                <div className="flex-grow">
                                    <TextBox 
                                        onBlur={onColNameBlur}
                                        onChange={changeColName}
                                        type="text" 
                                        placeholder="Column Name" 
                                        className="w-full"
                                        value={myCol.name}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 truncate">
                                <p className="subtitle truncate">Column Data Type</p>
                                <div className="flex-grow"/>
                                <ButtonGroup active={activeType} buttons={[
                                    <Button title="default basic text data" onClick={() => {changeDataType("text")}} icon={BiText}>Text</Button>,
                                    <Button title="best used for numbers" onClick={() => {changeDataType("number")}} icon={AiOutlineNumber}>Number</Button>,
                                    <Button title="best used for dates" onClick={() => {changeDataType("date")}} icon={IoCalendarNumber}>Date</Button>
                                ]}/>
                            </div>
                        </div>
                    </div>
                    <div className="ce-right">
                        <NeighborBlock right/>
                    </div>
                </>
                :
                <>
                    <div className="h-full w-full flex items-center justify-center">
                        <p className="subtitle italic">No column selected.</p>
                    </div>
                </>
            }
        </div>
    )
}

const NewTemplate = (props) => {

    // const DashboardContext = useContext(Dashboard.Context);
    const AuthContext = useContext(Auth.Context);
    const [bannerShow, setBannerShow] = useState(false);
    const [bannerText, setBannerText] = useState("");
    const [loading, setLoading] = useState(true);
    const [postLoading, setPostLoading] = useState(false);
    const [fileName, setFileName] = useState("New Template");
    const [templateState, setTemplateState] = useState(defaultTemplate());
    const [activeCol, setActiveCol] = useState([-1, -1]);
    const contextVal = {
        state: templateState,
        setState: setTemplateState,
        active: activeCol,
        setActive: setActiveCol,
        bannerShow: bannerShow,
        setBannerShow: setBannerShow,
        bannerText: bannerText,
        setBannerText: setBannerText,
        default: {
            group: defaultColGroupObj,
            column: defaultColObj,
        }
    }
    let totalColumns = 0;
    for (let i = 0; i < templateState.length; i++) {
        totalColumns += templateState[i].columns.length;
    }

    const checkAuth = () => {
        if (!AuthContext.user.loggedIn) {
            setBannerShow(true);
            setBannerText("User logged out. Please log back in.");
        }
        return AuthContext.user.loggedIn;
    }
    const appendFileNum = (data) => {
        setFileName((name) => {
            const newName = `${name} ${data.result.length+1}`;
            return newName;
        });
        setLoading(false);
    }
    const updateFileName = (e) => {
        const value = e.target.value;
        setFileName(value);
    }
    const checkFileName = (e) => {
        const value = e.target.value;
        if (value.length === 0) {
            setBannerText("File name cannot be blank.");
            setBannerShow(true);
        }
    }
    const checkTemplate = (newTemplate) => {
        const check = {
            status: true,
            messages: []
        };
        if (newTemplate.name.length === 0) {
            check.status = false;
            check.messages.push("Template name is blank");
        };
        if (newTemplate.columns.length === 0) {
            check.status = false;
            check.messages.push("Template has no columns");
        };
        if (newTemplate.token.length === 0) {
            check.status = false;
            check.messages.push("Authentication token error. User should never see this");
        };
        for (let i = 0; i < templateState.length; i++) {
            if (templateState[i].role === -1) {
                check.status = false;
                check.messages.push(`Column group ${i+1} has no user roles assigned`);
            }
            if (templateState[i].columns.length === 0) {
                check.status = false;
                check.messages.push(`Column group ${i+1} has no columns`);
            } else {
                for (let j = 0; j < templateState[i].columns.length; j++) {
                    if (templateState[i].columns[j].name.length === 0) {
                        check.status = false;
                        check.messages.push(`Group ${i+1} column ${j+1} has a blank name`);
                    };
                    if (!["text", "number", "date"].includes(templateState[i].columns[j].type)) {
                        check.status = false;
                        check.messages.push(`Group ${i+1} column ${j+1} has an invalid data type`);
                    };
                }
            };
        }
        return check;
    }
    const createNewTemplate = () => {
        setPostLoading(true);
        const newTemplate = {
            name: "",
            columns: [],
            token: ""
        };
        newTemplate.name = fileName;
        for (let i = 0; i < templateState.length; i++) {
            for (let j = 0; j < templateState[i].columns.length; j++) {
                const newCol = {
                    title: templateState[i].columns[j].name,
                    type: templateState[i].columns[j].type,
                    role: templateState[i].role === 0 ? "technician" : templateState[i].role === 1 ? "pathologist" : ""
                };
                newTemplate.columns.push(newCol);
            }
        }
        newTemplate.token = AuthContext.user.token;
        if (checkAuth()) {
            const {status, messages} = checkTemplate(newTemplate);
            if (status) {
                api.post_template_create(newTemplate, onSuccess);
            } else {
                setPostLoading(false);
                setBannerShow(true);
                if (messages.length > 1) {
                    setBannerText(`${messages[0]}, and ${messages.length-1} other ${(messages.length-1) === 1 ? "problem was" : "problems were"} found in your template.`);
                } else {
                    setBannerText(`${messages[0]}.`);
                }
            }
        }
    }
    const onSuccess = (data) => {
        // console.log(data);
        setPostLoading(false);
        props.changeTemplatePage(1);
    }

    useEffect(() => {
        if (checkAuth()) {
            api.get_template(AuthContext.user.token, appendFileNum);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (checkAuth()) setBannerShow(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [templateState, fileName])

    return(
        <EditorContext.Provider value={contextVal}>
            <div className="backdrop new-template">
                <div className="backdrop-header">
                    <span>
                        <p>Template Name</p>
                        <TextBox 
                            readOnly={!AuthContext.user.loggedIn}
                            value={fileName} 
                            onChange={updateFileName}
                            onBlur={checkFileName}
                            type="text" 
                            placeholder="New Name"
                            className="w-64"
                        />
                    </span>
                    {loading && <LoadSpinner/>}
                    <div className="flex-grow"/>
                    {/* <span>
                        <Button icon={IoArrowUndo}>Undo</Button>
                        <Button icon={IoArrowRedo}>Redo</Button>
                    </span> */}
                </div>
                <div className="-mx-4">
                    <Banner dismiss={() => {setBannerShow(false)}} show={bannerShow}>
                        {bannerText}
                    </Banner>
                </div>
                <div className={`template-editor ${!AuthContext.user.loggedIn ? "disabled" : ""}`}>
                    <div className="top-message">
                        <FaRegHandPointer className="transform rotate-180"/>
                        <p>Mouse over a column group below for more controls.</p>
                    </div>
                    <div className="group-blocks">
                        <div className="group-scroll">
                            {templateState.map((group, i) => {return(
                                <ColumnGroup group={group} index={i} key={i}/>
                            )})}
                        </div>
                        {/* <div className=" flex-shrink-0 h-4 w-4 bg-red-400"/> */}
                    </div>
                    <div className={"bottom-message " + (activeCol[0] > -1 && activeCol[1] > -1 ? "hide" : "")}>
                        <FaRegHandPointer/>
                        <p>Select a column for more options.</p>
                    </div>
                    <ColumnEditor/>
                </div>
                <div className="backdrop-footer">
                    <Button 
                        onClick={createNewTemplate}
                        className="special" 
                        icon={FaCheck}
                    >
                        Create New Template
                    </Button>
                    {postLoading && <LoadSpinner/>}
                    <div className="flex-grow"/>
                    <p className="subtitle">{templateState.length} {templateState.length === 1 ? "group" : "groups"}</p>
                    <p className="subtitle">{totalColumns} total {totalColumns === 1 ? "column" : "columns"}</p>
                </div>
            </div>
        </EditorContext.Provider>
    )

}

export default NewTemplate;
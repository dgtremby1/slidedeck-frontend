// import { AiTwotoneFolderOpen } from "react-icons/ai";
// import { BiTable } from "react-icons/bi";
import { FaColumns, FaClipboardList, FaList } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { GoGear } from "react-icons/go";
// import { MdOutlineTableRows, MdOutlineViewColumn } from "react-icons/md"

const dashboardItems = [
    {
        title: "Home",
        path: "/home",
        icon: HiHome
    }, 
    // {
    //     title: "Enter Data",
    //     path: "/new",
    //     icon: BiTable
    // }, 
    {
        title: "Manage Logs",
        path: "/logs",
        icon: FaList
    }, {
        title: "Manage Templates",
        path: "/templates",
        icon: FaColumns
    }, {
        title: "Reports",
        path: "/reports",
        icon: FaClipboardList
    }, {
        title: "Settings",
        path: "/settings",
        icon: GoGear
    }
]

export default dashboardItems;
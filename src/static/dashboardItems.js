import { AiTwotoneFolderOpen } from "react-icons/ai";
import { BiTable } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { RiBracesFill } from "react-icons/ri";

const dashboardItems = [
    {
        title: "Home",
        path: "/home",
        icon: HiHome
    }, {
        title: "Enter Data",
        path: "/new",
        icon: BiTable
    }, {
        title: "Manage Logs",
        path: "/logs",
        icon: AiTwotoneFolderOpen
    }, {
        title: "Manage Templates",
        path: "/templates",
        icon: AiTwotoneFolderOpen
    }, {
        title: "Reports",
        path: "/reports",
        icon: FaClipboardList
    }, {
        title: "Developer Area",
        path: "/dev",
        icon: RiBracesFill
    }
]

export default dashboardItems;
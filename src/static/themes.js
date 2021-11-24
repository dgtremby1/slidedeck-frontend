// Import icons
import { FaSun, FaMoon } from "react-icons/fa";

const themes = [
    {
        name: "Default Light",
        id: "light",
        index: 0,
        description: "Default light theme, bright and legible.",
        icon: FaSun,
        color: "#4B9CD3"
    },
    {
        name: "Default Dark",
        id: "dark",
        index: 1,
        description: "Default dark theme, for night owls.",
        icon: FaMoon,
        color: "#212936"
    }
]

export default themes;
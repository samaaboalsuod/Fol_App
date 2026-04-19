import { House, PottedPlant, UsersThree, User, Question } from "@phosphor-icons/react";

export const NavIcons = [
  {
    path: "/",
    label: "Home",
    icon: House,
    activePaths: ["^/$"], // Regex for "Exactly /"
  },
  {
    path: "/MyPlants",
    label: "MyPlants",
    icon: PottedPlant,
    activePaths: ["/MyPlants", "/PlantDetails"], 
  },
  {
    path: "/Community", 
    label: "Community",
    icon: UsersThree,
    activePaths: ["/Community", "/PostDetails"],
  },
  {
    path: "/Profile",
    label: "Profile",
    icon: User,
    activePaths: ["/Profile", "/EditProfile"],
  },
  {
    path: "/Help",
    label: "Help",
    icon: Question,
    activePaths: ["/Help", "/AskService"], 
  },
];
import type { SvgIconComponent } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";

export const sidebarRoutes: { path: string; label: string; icon: SvgIconComponent }[] = [
  { path: "/", label: "Home", icon: HomeIcon },
  { path: "/account", label: "My Account", icon: AccountCircleIcon },
  { path: "/faq", label: "FAQ", icon: HelpIcon },
  { path: "/users", label: "Users", icon: PeopleIcon },
];

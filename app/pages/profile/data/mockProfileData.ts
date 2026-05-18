// Define the type for a menu item
export interface MenuItem {
  id: string;
  label: string;
  route: string;
}

// Define the type for profile data
export interface ProfileData {
  menuItems: MenuItem[];
}

const profileData: ProfileData = {
  menuItems: [
    { id: "membership", label: "Medlemskab", route: "/pages/membership" },
    { id: "history", label: "Vaske historik", route: "/pages/history" },
    { id: "details", label: "Mine oplysninger", route: "/pages/details" },
    { id: "logout", label: "Log ud", route: "/" },
  ],
};

export default profileData;

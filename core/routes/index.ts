// client
export const CLIENT_DASHBOARD_ROUTE = "/client/dashboard";
export const CLIENT_INSIGHTS_ROUTE = "/client/insights";
export const CLIENT_PROFILE_ROUTE = "/client/profile";
export const CLIENT_SETTINGS_ROUTE = "/client/settings";

export const CLIENT_PRICING_ROUTE = "/client/packages";

// client auth
export const CLIENT_LOGIN_ROUTE = "/auth/client/login";
export const CLIENT_SIGNUP_ROUTE = "/auth/client/signup";
export const CLIENT_FROGOT_PASSWORD_ROUTE = "/auth/forgot-password";
// client meeting
export const CLIENT_MEETING_SCHEDULE_ROUTE = "/client/meeting-schedule";

// client dealerships
export const CLIENT_DEALERSHIPS_ROUTE = "/client/dealerships";
export const ADD_CLIENT_DEALERSHIPS_ROUTE =
  "/client/dealerships/add-dealership";

// CLIENT (agents || bots)
export const C_ALL_AGENTS_ROUTE = "/client/agents";
export const C_ALL_INSIGHTS_ROUTE = "/client/insights";
export const C_AGENTS_DETAIL_ROUTE = "/client/agents/{id}";
export const C_CREATE_AGENTS_ROUTE = "/client/agents/create";
export const C_CREATE_INSIGHTS_ROUTE = "/client/insights/create";

// CLIENT (inventory feed)
export const C_INVENTORY_FEED_LIST_ROUTE = "/client/inventory-feed";
export const C_INVENTORY_FEED_DASHBOARD_ROUTE =
  "/client/inventory-feed/dashboard";
export const C_ALL_INVENTORY_ROUTE = "/client/inventory-feed/inventory/all";

// CLIENT (USERS)
export const C_ALL_USERS_ROUTE = "/client/users";
export const C_ADD_USER_ROUTE = "/client/users/add";
export const C_UPDATE_USER_ROUTE = "/client/users/update/{userId}";

// ADMIN
export const ADMIN_LOGIN_ROUTE = "/auth/admin/login";
export const ADMIN_DASHBOARD_ROUTE = "/admin/dashboard";
export const ADMIN_PROFILE_ROUTE = "/admin/profile";
export const ADMIN_SETTINGS_ROUTE = "/admin/settings";

// ADMIN (clients)
export const ALL_CLIENTS_ROUTE = "/admin/clients/";
export const ADD_CLIENTS_ROUTE = "/admin/clients/add";
export const UPDATE_CLIENTS_ROUTE = "/admin/clients/{id}/update";
export const CLIENT_DETAILS_ROUTE = "/admin/clients/{id}";

// ADMIN (agents | bots)
export const A_ALL_AGENTS_ROUTE = "/admin/agents/";

// ADMIN (inventory-feed)
export const A_INVENTORY_FEED_LIST_ROUTE = "/admin/inventory-feed";
export const A_INVENTORY_FEED_DASHBOARD_ROUTE =
  "/admin/inventory-feed/dashboard";
export const A_ALL_INVENTORY_ROUTE = "/admin/inventory-feed/inventory/all";

// ADMIN (USERS)
export const A_ALL_USERS_ROUTE = "/admin/users";
export const A_ADD_USER_ROUTE = "/admin/users/add";
export const A_UPDATE_USER_ROUTE = "/admin/users/update/{userId}";

// ADMIN (packages)
export const A_ALL_PACKAGES_ROUTE = "/admin/packages";
export const A_CREATE_PACKAGE_ROUTE = "/admin/packages/add";

// other
export const PRICING_ROUTE = "/pricing";
export const HOME_ROUTE = "/";

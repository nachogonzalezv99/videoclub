const privateRoutes = {
  DISCOVER: "/discover",
  LIST: "/list",
  FINISHED: "/finished",
};

const publicRoutes = {
  LOGIN: "/login",
  REGISTER: "/register",
};

const menuRoutes = [
  { link: privateRoutes.DISCOVER, text: "Discover" },
  { link: privateRoutes.LIST, text: "Watch list" },
  { link: privateRoutes.FINISHED, text: "Finished" },
];

export { privateRoutes, publicRoutes, menuRoutes };

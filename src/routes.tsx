import { Landing } from "@/containers/Landing";
import type { AppRoute } from "@/types/AppRoutes";

export const AppRoutes: AppRoute[] = [
  {
    indexRoute: true,
    path: "/",
    displayName: "Langind Page",
    component: <Landing />,
  },
  {
    indexRoute: false,
    path: "/game",
    displayName: "The Game",
    component: <span>Game box here</span>,
  },
] as const;

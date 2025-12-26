import { Landing } from "@/containers/Landing";
import type { AppRoute } from "@/types/route";
import { GameContainer } from "@/containers/Game";

export const APP_ROUTES: AppRoute[] = [
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
    component: <GameContainer />,
  },
] as const;

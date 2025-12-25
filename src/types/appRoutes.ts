import type { ReactElement } from "react";

export interface AppRoute {
  indexRoute: boolean;
  displayName: string;
  path: string;
  component: ReactElement;
}

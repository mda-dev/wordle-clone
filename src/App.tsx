import { ThemeProvider } from "@/lib/contexts/theme/themeProvider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import { AppRoutes } from "@/routes";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="grid gap-20 w-full max-w-7xl p-4 mx-auto">
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="wordle-ui-theme">
          <div className="flex justify-between">
            <Button
              asChild
              size="lg"
              variant="link"
              className="text-3xl items-center p-3 h-10 hover:no-underline"
            >
              <Link to="/" className="text-primary">
                Wordle
                <small className="text-xs text-chart-4 font-light justify-self-end translate-y-2">
                  the game
                </small>
              </Link>
            </Button>
            <ThemeSwitcher />
          </div>
          <Routes>
            {AppRoutes.map(({ indexRoute, path, component }) => (
              <Route index={indexRoute} path={path} element={component} />
            ))}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { ThemeProvider } from "@/lib/contexts/theme/themeProvider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import { APP_ROUTES } from "@/routes";
import { Button } from "@/components/ui/button";
import { WordListProvider } from "@/lib/contexts/game/wordListProvider";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="flex flex-col gap-5 w-full max-w-7xl p-4 mx-auto">
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="wordle-ui-theme">
          <WordListProvider>
            <nav className="flex justify-between">
              <Button
                asChild
                size="lg"
                variant="link"
                className="text-3xl items-center p-3 h-10 hover:no-underline">
                <Link to="/" className="text-primary">
                  Wordle
                  <small className="text-xs text-chart-4 font-light justify-self-end translate-y-2">
                    ro
                  </small>
                </Link>
              </Button>
              <ThemeSwitcher />
            </nav>
            <Routes>
              {APP_ROUTES.map(({ indexRoute, path, component }) => (
                <Route index={indexRoute} path={path} element={component} />
              ))}
            </Routes>
          </WordListProvider>
        </ThemeProvider>
      </BrowserRouter>
      <Toaster className="bg-background" closeButton={true} />
    </div>
  );
}

export default App;

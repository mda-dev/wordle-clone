import { ThemeProvider } from "@/lib/contexts/theme/themeProvider";
import { BrowserRouter, Routes, Route } from "react-router";
import { APP_ROUTES } from "@/routes";
import { WordListProvider } from "@/lib/contexts/game/wordListProvider";
import { Toaster } from "@/components/ui/sonner";
import { MainNav } from "./components/MainNav";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="wordle-ui-theme">
        <MainNav />
        <div className="flex flex-col gap-5 w-full max-w-7xl px-4 mx-auto">
          <WordListProvider>
            <Routes>
              {APP_ROUTES.map(({ indexRoute, path, component }) => (
                <Route index={indexRoute} path={path} element={component} />
              ))}
            </Routes>
          </WordListProvider>
          <Toaster
            className="bg-background"
            closeButton={true}
            duration={2000}
          />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

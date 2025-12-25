import { Link } from "react-router";
import { Gamepad2Icon } from "lucide-react";

export const Landing = () => {
  return (
    <div className="flex items-center justify-center min-h-20">
      <Link
        className="flex bg-primary ring-primary hover:bg-primary/90 focus-visible:ring-1 text-primary-foreground rounded-xl p-8 font-semibold gap-2"
        to="/game"
      >
        <Gamepad2Icon size={48} />
        <span className="text-4xl leading-tight">New Game</span>
      </Link>
    </div>
  );
};

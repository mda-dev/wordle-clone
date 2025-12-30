import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

interface GuessBoxProps extends VariantProps<typeof boxVariants> {
  letter: string;
}

const boxVariants = cva(
  "absolute flex size-full text-3xl uppercase font-semibold items-center justify-center rounded-lg ring-1 shadow-md",
  {
    variants: {
      variant: {
        default:
          "bg-white dark:bg-background ring-secondary itext-input-foreground",
        missing: "bg-secondary/80 ring-secondary text-seconday-foreground",
        correct: "bg-chart-3/80 ring-chart-3 text-primary-foreground",
        partial: "bg-chart-4/80 ring-chart-4 text-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const GuessBox = ({ letter, variant }: GuessBoxProps) => {
  const anim = letter ? "animate-insert repeat-1" : "repeat-0";
  return (
    <div
      className={cn(
        "box-container w-14 h-14 uppercase perspective-midrange",
        anim
      )}>
      <div
        className={cn(
          variant && "transform-3d -rotate-x-180",
          "transition duration-1000 relative size-full"
        )}>
        <span
          className={cn(
            boxVariants({ variant: "default" }),
            "backface-hidden"
          )}>
          {letter}
        </span>
        <span
          className={cn(
            boxVariants({ variant }),
            "backface-hidden -rotate-x-180"
          )}>
          {letter}
        </span>
      </div>
    </div>
  );
};

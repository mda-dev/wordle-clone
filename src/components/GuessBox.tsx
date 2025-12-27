import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

interface GuessBoxProps extends VariantProps<typeof boxVariants> {
  letter: string;
}

const boxVariants = cva(
  "flex w-14 h-14 text-3xl uppercase font-semibold items-center justify-center rounded-lg ring-1 shadow-md",
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
  const classNames = cn(boxVariants({ variant }));

  return <span className={classNames}>{letter}</span>;
};

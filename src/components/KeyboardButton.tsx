import type { KeyboardItem } from "@/lib/keyboard-layouts";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { CornerDownLeftIcon, DeleteIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";

const buttonVariants = cva(
  "flex w-full transition h-12 rounded items-center justify-center outline-0 ring-primary/80 focus-visible:ring-2 leading-0 font-medium text-xl",
  {
    variants: {
      variant: {
        default: "bg-secondary hover:bg-secondary/80",
        correct: "bg-chart-3/80 hover:bg-chart-3 text-background",
        partial: "bg-chart-4/80 hover:bg-chart-4 text-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface KeyboardButtonPropTypes extends VariantProps<typeof buttonVariants> {
  className?: string;
  value: KeyboardItem;
  action: (letter: string) => void;
}

const specialButton = {
  RETURN: {
    icon: <CornerDownLeftIcon className="mx-auto" />,
    style: "bg-primary/80 hover:bg-primary text-primary-foreground",
  },
  BSP: {
    icon: <DeleteIcon className="mx-auto" />,
    style:
      "bg-destructive/80 hover:bg-destructive text-destructive-foreground focus-visible:ring-destructive",
  },
};

export const KeyboardButton = ({
  value,
  variant,
  action,
}: KeyboardButtonPropTypes) => {
  const hasDiacritics = typeof value === "object";
  const letter = hasDiacritics ? value[0] : value;
  const isRetOrBsp = letter === "RETURN" || letter === "BSP";
  const content = isRetOrBsp ? specialButton[letter].icon : letter;

  const buttonClassName = cn(
    buttonVariants({ variant }),
    isRetOrBsp && specialButton[letter].style
  );

  const handleClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    const letter = event.currentTarget.dataset["letter"] as string;
    action(letter);
  };

  return (
    <div className={cn("basis-2/20 p-1", isRetOrBsp && "basis-3/20")}>
      {hasDiacritics ? (
        <Popover>
          <PopoverTrigger asChild>
            <button className={buttonClassName}>{content}</button>
          </PopoverTrigger>
          <PopoverContent side="top" className="flex w-auto p-3 gap-2">
            {value.map((letter) => (
              <PopoverClose key={letter} asChild>
                <button
                  data-letter={letter}
                  onClick={handleClick}
                  className="w-10 h-10 bg-background hover:bg-background/80 rounded outline-0 focus-visible:ring-2 ring-primary">
                  {letter}
                </button>
              </PopoverClose>
            ))}
          </PopoverContent>
        </Popover>
      ) : (
        <button
          data-letter={value}
          onClick={handleClick}
          className={buttonClassName}>
          {content}
        </button>
      )}
    </div>
  );
};

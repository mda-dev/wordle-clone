"use client";

import { useTheme } from "@/lib/hooks/theme";
import { cn } from "@/lib/utils";
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();
  const textBase = "text-muted-foreground text-sm";
  const bgBase = "bg-muted";
  const toast = cn(
    bgBase,
    textBase,
    "flex gap-2 relative ring-border shadow ring-1 p-3 font-sans rounded text-shadow-none w-full"
  );
  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="group font-sans!"
      position="top-center"
      icons={{
        success: <CircleCheckIcon className="size-12 text-chart-3" />,
        info: <InfoIcon className="size-12 text-accent" />,
        warning: <TriangleAlertIcon className="size-4 text-chart-4" />,
        error: <OctagonXIcon className="size-12 text-destructive" />,
        loading: <Loader2Icon className="size-12 animate-spin" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast,
          title: "font-medium text-xl text-foreground",
          icon: "flex justify-center items-center",
          description: "text-inherit! grow-1",
          actionButton: "action-button",
          cancelButton: "cancel-button",
          closeButton:
            "flex p-1 text-xs! top-0 right-0 rounded-tr rounded-bl absolute !bg-border hover:bg-primary! text-foreground",
        },
      }}
      // style={
      //   {
      //     "--normal-bg": "var(--popover)",
      //     "--normal-text": "var(--popover-foreground)",
      //     "--normal-border": "var(--border)",
      //     "--border-radius": "var(--radius)",
      //   } as React.CSSProperties
      // }
      {...props}
    />
  );
};

export { Toaster };

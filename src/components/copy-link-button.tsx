"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import { useState } from "react";

export const CopyLinkButton = ({
  link,
  className = "",
}: {
  link: string;
  className?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => setCopied(false),
    );
  };

  return (
    <Tooltip open={copied}>
      <TooltipTrigger
        render={
          <Button size="sm" className={className} onClick={handleCopy}>
            <Copy />
            Copy Link
          </Button>
        }
      />
      <TooltipContent>Copied</TooltipContent>
    </Tooltip>
  );
};

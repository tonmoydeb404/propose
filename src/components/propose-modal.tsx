"use client";

import { CopyLinkButton } from "@/components/copy-link-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isValidURL } from "@/lib/validators";
import { useState } from "react";

export const ProposeModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [reply, setReply] = useState("");
  const [proposeLink, setProposeLink] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const linkId = name.trim().replace(/\s+/g, "-").toLowerCase();
    let link = `${window.location.origin}/${linkId}`;

    if (reply.trim() && isValidURL(reply.trim())) {
      link += `?reply=${encodeURIComponent(reply.trim())}`;
    }

    setProposeLink(link);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setProposeLink(null);
      setName("");
      setReply("");
    }
  };

  const replyInvalid = Boolean(reply.trim()) && !isValidURL(reply.trim());

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="destructive" className="mt-4 px-4">
            Propose Now
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Propose Now</DialogTitle>
        </DialogHeader>

        {!proposeLink && (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="propose-name">
                Her / His Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="propose-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="her/his name"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="propose-reply">Reply URL</Label>
              <Input
                id="propose-reply"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="WhatsApp/Messenger"
                aria-invalid={replyInvalid}
              />
              {replyInvalid && (
                <p className="text-sm text-destructive">
                  Please enter a valid URL.
                </p>
              )}
            </div>

            <Button type="submit" variant="destructive">
              Propose Now
            </Button>
          </form>
        )}

        {proposeLink && (
          <Alert variant="destructive">
            <AlertDescription className="flex flex-col gap-3">
              <p>
                Now just copy the link and share it with the person. Don&apos;t
                be shy, and best of luck!
              </p>

              <div className="flex items-center gap-2">
                <CopyLinkButton link={proposeLink} />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setProposeLink(null)}
                >
                  Reset
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                You can preview the link{" "}
                <a
                  href={proposeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-destructive underline"
                >
                  here
                </a>{" "}
                before sharing.
              </p>
            </AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
};

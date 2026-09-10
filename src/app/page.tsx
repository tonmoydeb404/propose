import { ProposeModal } from "@/components/propose-modal";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-12 px-6 py-16 md:flex-row md:justify-between md:px-16">
      <div className="flex max-w-lg flex-col items-start gap-2 text-center md:text-left">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight">
          Afraid To <span className="text-destructive">Propose</span> Someone?
        </h1>
        <p className="text-muted-foreground">
          don&apos;t worry I am here to help you. enter your valentines name and
          generate a propose link.
        </p>

        <ProposeModal />

        <div className="mt-6 flex flex-col gap-2 rounded-lg border p-4 text-left">
          <p className="font-medium">Want your own custom page?</p>
          <p className="text-sm text-muted-foreground">
            Write your own steps and final message, add your own images, and
            track replies.
          </p>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-destructive underline"
          >
            Create a custom page
          </Link>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          developed by{" "}
          <a
            href="https://tonmoydeb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            @tonmoydeb
          </a>
        </p>
      </div>

      <Image
        src="/hero.svg"
        alt="Afraid To Propose Someone?"
        width={480}
        height={480}
        className="hidden md:block"
      />
    </main>
  );
}

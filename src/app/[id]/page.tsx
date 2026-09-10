"use client";

import { GenQuotes } from "@/components/gen-quotes";
import { Button } from "@/components/ui/button";
import quotesData from "@/data/quotes.json";
import { genRandom } from "@/lib/gen-random";
import type { ProposalStep } from "@/types/proposal";
import { use, useEffect, useState } from "react";

const { qoutes: steps, propose: finalStep } = quotesData as {
  qoutes: ProposalStep[];
  propose: ProposalStep;
};

const preloadImages = [...steps, finalStep].map((step) => step.image);

export default function StaticProposalPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ reply?: string }>;
}) {
  const { id } = use(params);
  const { reply } = use(searchParams);
  const person = id.split("-").join(" ");

  const [shownSteps, setShownSteps] = useState<ProposalStep[]>([]);
  const [currentStep, setCurrentStep] = useState<ProposalStep>({
    id: "intro",
    text: "",
    subtext: "I want to tell you something",
    image: "/images/image-05.webp",
  });

  const handleClick = () => {
    const nextStep =
      shownSteps.length >= steps.length
        ? finalStep
        : genRandom(steps, shownSteps);
    setCurrentStep(nextStep);
    setShownSteps((prev) => [...prev, nextStep]);
  };

  useEffect(() => {
    document.title = `${person} - Be My Valentine`;
  }, [person]);

  useEffect(() => {
    preloadImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  return (
    <main
      className="flex flex-1 flex-col items-center justify-center bg-cover bg-center px-6 py-16"
      style={{ backgroundImage: `url(${currentStep.image})` }}
    >
      <div className="w-full max-w-md rounded-xl bg-background/90 p-6 backdrop-blur">
        <h1 className="text-xl font-semibold">
          Hey <b>{person}</b>
        </h1>
        <p className="mb-4 text-muted-foreground">{currentStep.subtext}</p>

        <GenQuotes steps={shownSteps} className="mb-4" />

        {currentStep.id !== "finished" && (
          <Button variant="destructive" onClick={handleClick}>
            {shownSteps.length ? "Next" : "Continue"}
          </Button>
        )}

        {currentStep.id === "finished" && reply && (
          <Button
            variant="destructive"
            render={
              <a href={reply} target="_blank" rel="noreferrer">
                Reply Back
              </a>
            }
          />
        )}
      </div>
    </main>
  );
}

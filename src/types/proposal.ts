export type ProposalStep = {
  id: string;
  text: string;
  subtext?: string;
  image: string;
};

export type ProposalPage = {
  id: string;
  ownerUid: string;
  name: string;
  steps: ProposalStep[];
  finalStep: ProposalStep;
  replyUrl?: string;
  createdAt: number;
  updatedAt: number;
};

export type FeedbackAnswer = "yes" | "no";

export type FeedbackEntry = {
  id: string;
  answer: FeedbackAnswer;
  createdAt: number;
};

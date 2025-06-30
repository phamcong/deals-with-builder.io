export interface Deal {
  id: string;
  dealName: string;
  customer: {
    name: string;
    initial: string;
  };
  value: number;
  stage: "proposal" | "negotiation" | "discovery" | "closed-won";
  probability: number;
  closingDate: string;
}

export type DealStage = Deal["stage"];

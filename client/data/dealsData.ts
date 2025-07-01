import { Deal } from "@shared/types";

export const sampleDeals: Deal[] = [
  {
    id: "1",
    dealName: "Enterprise Software Package",
    customer: { name: "Acme Corp", initial: "A" },
    value: 125000,
    stage: "proposal",
    probability: 75,
    closingDate: "Sep 30, 2023",
  },
  {
    id: "2",
    dealName: "Cloud Migration Service",
    customer: { name: "TechSolutions Inc", initial: "T" },
    value: 87500,
    stage: "negotiation",
    probability: 90,
    closingDate: "Oct 15, 2023",
  },
  {
    id: "3",
    dealName: "Website Redesign Project",
    customer: { name: "Global Media", initial: "G" },
    value: 45000,
    stage: "discovery",
    probability: 60,
    closingDate: "Nov 5, 2023",
  },
  {
    id: "4",
    dealName: "CRM Implementation",
    customer: { name: "RetailGiant", initial: "R" },
    value: 95000,
    stage: "closed-won",
    probability: 100,
    closingDate: "Sep 15, 2023",
  },
  {
    id: "5",
    dealName: "IT Infrastructure Upgrade",
    customer: { name: "HealthCare Pro", initial: "H" },
    value: 135000,
    stage: "negotiation",
    probability: 85,
    closingDate: "Oct 22, 2023",
  },
];

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

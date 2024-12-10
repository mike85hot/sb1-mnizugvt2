export interface FinancialMetric {
  value: number;
  change: number;
  label: string;
}

export interface FinancialOverview {
  cash: number;
  monthlyBurn: number;
  runway: number;
  mrr: number;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignee: TeamMember;
}

export interface InvestorUpdate {
  id: string;
  date: string;
  content: string;
  metrics: {
    mrr: number;
    growth: number;
    runway: number;
    burn: number;
  };
  status: 'draft' | 'sent';
  sentAt?: string;
}
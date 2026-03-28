export type Company = {
  id: number;
  name: string;
  tags: string[];
  active: boolean;
};

export type Product = {
  id: number;
  companyId: number;
  company: string;
  name: string;
  category: string;
  gender: "all" | "male" | "female";
  minAge: number;
  maxAge: number;
  monthlyPrice: number;
  smokerAllowed: boolean;
  renewalType: "갱신형" | "비갱신형";
  coverageTags: string[];
  summary: string;
  advice: string;
};

export type Recommendation = Product & {
  score: number;
  reasons: string[];
  advicePoints: string[];
  consultationGuide: {
    opener: string;
    customerAnalysis: string;
    recommendationPitch: string;
    objectionHandling: string[];
    comparisonTalk: string[];
    closing: string;
  };
};

export type SearchFormValues = {
  age: string;
  gender: string;
  militaryStatus: string;
  budget: string;
  goal: string;
  smoker: string;
  renewalType: string;
  preferredCompany: string;
  priority: string;
  sortBy: string;
};

export type SearchResult = {
  matchedCompanies: Company[];
  matchedProducts: Product[];
  topRecommendations: Recommendation[];
};
import type { Company } from "../types/insurance";

export const companies: Company[] = [
  { id: 1, name: "현대해상", tags: ["손해보험", "건강", "암", "실손", "운전자"], active: true },
  { id: 2, name: "삼성화재", tags: ["손해보험", "암", "실손", "운전자"], active: true },
  { id: 3, name: "DB손해보험", tags: ["손해보험", "운전자", "실손", "건강"], active: true },
  { id: 4, name: "KB손해보험", tags: ["손해보험", "실손", "건강"], active: true },
  { id: 5, name: "메리츠화재", tags: ["손해보험", "암", "건강", "실손"], active: true },
];
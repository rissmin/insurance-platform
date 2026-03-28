import type { Company } from "../types/insurance";

export const companies: Company[] = [
  { id: 1, name: "현대해상", tags: ["손해보험", "건강", "암", "실손", "운전자"], active: true },
  { id: 2, name: "삼성화재", tags: ["손해보험", "건강", "암", "실손", "운전자"], active: true },
  { id: 3, name: "DB손해보험", tags: ["손해보험", "건강", "암", "실손", "운전자", "유병자"], active: true },
  { id: 4, name: "KB손해보험", tags: ["손해보험", "건강", "실손", "운전자"], active: true },
  { id: 5, name: "메리츠화재", tags: ["손해보험", "건강", "암", "실손"], active: true },
  { id: 6, name: "롯데손해보험", tags: ["손해보험", "건강", "암", "실손", "간편보험"], active: true },
  { id: 7, name: "NH농협손해보험", tags: ["손해보험", "건강", "암", "운전자"], active: true },
];
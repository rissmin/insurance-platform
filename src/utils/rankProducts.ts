import type {
  Product,
  Recommendation,
  SearchFormValues,
} from "../types/insurance";

export function rankProducts(
  products: Product[],
  values: SearchFormValues
): Recommendation[] {
  const ageNumber = Number(values.age);
  const budgetNumber = Number(values.budget);

  const scored: Recommendation[] = products.map((product) => {
    let score = 0;
    const reasons: string[] = [];
    const advicePoints: string[] = [];

    // 목적 일치
    if (product.category === values.goal) {
      score += 30;
      reasons.push("가입 목적과 일치합니다.");
    }

    // 나이 조건
    if (values.age && ageNumber >= product.minAge && ageNumber <= product.maxAge) {
      score += 15;
      reasons.push("현재 나이에 가입 가능한 상품입니다.");
    }

    // 예산 비교
    if (values.budget) {
      const gap = Math.abs(product.monthlyPrice - budgetNumber);

      if (gap <= 10000) {
        score += 20;
        reasons.push("예산과 매우 가깝습니다.");
      } else if (gap <= 30000) {
        score += 10;
        reasons.push("예산 범위와 비교적 잘 맞습니다.");
      } else {
        reasons.push("예산과는 다소 차이가 있습니다.");
      }
    }

    // 갱신 조건
    if (
      values.renewalType !== "상관없음" &&
      product.renewalType === values.renewalType
    ) {
      score += 10;
      reasons.push("원하는 갱신 조건과 일치합니다.");
    }

    // 보험사
    if (
      values.preferredCompany !== "전체" &&
      product.company === values.preferredCompany
    ) {
      score += 10;
      reasons.push("선호 보험사와 일치합니다.");
    }

    // 우선순위
    if (
      values.priority === "보험료" &&
      values.budget &&
      product.monthlyPrice <= budgetNumber
    ) {
      score += 10;
      advicePoints.push("보험료 부담이 낮다는 점을 강조하세요.");
    }

    if (
      values.priority === "보장범위" &&
      product.coverageTags.includes("건강종합")
    ) {
      score += 10;
      advicePoints.push("보장 범위가 넓다는 점을 강조하세요.");
    }

    if (values.priority === "비갱신" && product.renewalType === "비갱신형") {
      score += 10;
      advicePoints.push("장기 보험료 안정성을 강조하세요.");
    }

    if (advicePoints.length === 0) {
      advicePoints.push("고객 상황에 맞는 핵심 보장을 중심으로 설명하세요.");
    }

    return {
      ...product,
      score,
      reasons,
      advicePoints,
      consultationGuide: {
        opener: buildOpener(product),
        customerAnalysis: buildCustomerAnalysis(values),
        recommendationPitch: buildPitch(values, product),
        objectionHandling: buildObjection(product),
        comparisonTalk: buildComparison(values),
        closing: buildClosing(product),
      },
    };
  });

  // 정렬
  if (values.sortBy === "보험료낮은순") {
    return scored.sort((a, b) => a.monthlyPrice - b.monthlyPrice).slice(0, 5);
  }

  if (values.sortBy === "보험료높은순") {
    return scored.sort((a, b) => b.monthlyPrice - a.monthlyPrice).slice(0, 5);
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, 5);
}

// ----------------------------
// 상담 스크립트 생성 함수들
// ----------------------------

function buildOpener(product: Product): string {
  return `${product.company}의 ${product.name}은(는) 단순히 브랜드가 아니라 실제 조건에 맞는 상품이라 우선 설명드리고 싶습니다.`;
}

function buildCustomerAnalysis(values: SearchFormValues): string {
  return `${values.age || "현재"}세 기준으로 ${values.goal} 목적에 맞는 보장을 찾고 계시고, 예산과 유지 가능성을 함께 고려하는 상황으로 보입니다.`;
}

function buildPitch(values: SearchFormValues, product: Product): string {
  return `이 상품은 ${product.summary}라는 점이 핵심입니다. 월 ${product.monthlyPrice.toLocaleString()}원 수준으로 부담이 크지 않으면서 ${values.goal} 목적에 맞는 보장을 제공합니다.`;
}

function buildObjection(product: Product): string[] {
  const arr: string[] = [];

  arr.push("보험료 부담 시 핵심 담보 위주 설계를 먼저 제안하세요.");
  arr.push("다른 상품과 비교 시 보장과 가격을 함께 설명하세요.");

  if (product.renewalType === "비갱신형") {
    arr.push("비갱신형은 장기적으로 보험료 변동이 없다는 점을 강조하세요.");
  } else {
    arr.push("갱신형은 초기 보험료가 낮다는 장점을 설명하세요.");
  }

  return arr;
}

function buildComparison(values: SearchFormValues): string[] {
  return [
    `${values.goal} 기준으로 다른 상품과 비교 설명하세요.`,
    "보험료 / 보장 / 갱신 구조를 기준으로 설명하세요.",
  ];
}

function buildClosing(product: Product): string {
  return `${product.name}은(는) 조건 대비 균형이 좋은 상품입니다. 오늘 설명드린 기준으로 비교 후 결정하시면 됩니다.`;
}
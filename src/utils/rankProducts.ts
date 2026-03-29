import type {
  Product,
  Recommendation,
  SearchFormValues,
} from "../types/insurance";

type ScoredRecommendation = Recommendation & {
  isEligible: boolean;
};

export function rankProducts(
  products: Product[],
  values: SearchFormValues
): Recommendation[] {
  const ageNumber = Number(values.age);
  const budgetNumber = Number(values.budget);
  const hasCondition = values.preExistingCondition !== "없음";

  const scored: ScoredRecommendation[] = products.map((product) => {
    let score = 0;
    let isEligible = true;

    const reasons: string[] = [];
    const advicePoints: string[] = [];

    // 1. 가입 목적 일치 여부
    if (product.category === values.goal) {
      score += 30;
      reasons.push("가입 목적과 정확히 일치하는 상품입니다.");
    } else if (values.goal === "암보험" && product.category === "건강보험") {
      score += 12;
      reasons.push("암 보장을 포함한 건강보험 계열로 함께 검토할 수 있습니다.");
    } else if (values.goal === "건강보험" && product.category === "암보험") {
      score += 10;
      reasons.push("건강보험 대신 암 중심 보장을 우선 보고 싶을 때 대안이 될 수 있습니다.");
    } else {
      // 운전자보험/실손보험 등은 목적이 다르면 제외에 가깝게 처리
      score -= 20;
    }

    // 2. 나이 조건
    if (values.age) {
      if (ageNumber >= product.minAge && ageNumber <= product.maxAge) {
        score += 15;
        reasons.push("현재 나이에 가입 가능한 상품입니다.");
      } else {
        isEligible = false;
        score -= 100;
      }
    }

    // 3. 예산 비교
    if (values.budget) {
      const gap = Math.abs(product.monthlyPrice - budgetNumber);

      if (gap <= 5000) {
        score += 20;
        reasons.push("예산과 매우 가까운 보험료입니다.");
      } else if (gap <= 10000) {
        score += 15;
        reasons.push("예산 범위에 잘 맞는 보험료 수준입니다.");
      } else if (gap <= 20000) {
        score += 8;
        reasons.push("예산과 비교적 무난하게 맞는 편입니다.");
      } else {
        score -= 8;
      }
    }

    // 4. 갱신 선호
    if (
      values.renewalType !== "상관없음" &&
      product.renewalType === values.renewalType
    ) {
      score += 12;
      reasons.push("원하는 갱신 조건과 일치합니다.");
    } else if (values.renewalType !== "상관없음") {
      score -= 8;
    }

    // 5. 보험사 선호
    if (
      values.preferredCompany !== "전체" &&
      product.company === values.preferredCompany
    ) {
      score += 12;
      reasons.push("선호 보험사와 일치합니다.");
    } else if (values.preferredCompany !== "전체") {
      score -= 8;
    }

    // 6. 성별 적합성
    if (product.gender === "all") {
      score += 3;
    } else if (product.gender === values.gender) {
      score += 8;
      reasons.push("성별 특성을 반영한 상품입니다.");
    } else {
      isEligible = false;
      score -= 100;
    }

    // 7. 우선순위 반영
    if (
      values.priority === "보험료" &&
      values.budget &&
      product.monthlyPrice <= budgetNumber
    ) {
      score += 12;
      advicePoints.push("보험료 부담이 상대적으로 낮다는 점을 먼저 설명하세요.");
    }

    if (
      values.priority === "보장범위" &&
      (
        product.coverageTags.includes("건강종합") ||
        product.coverageTags.includes("암진단") ||
        product.coverageTags.includes("암치료") ||
        product.coverageTags.includes("뇌") ||
        product.coverageTags.includes("심장") ||
        product.coverageTags.includes("종합보장")
      )
    ) {
      score += 12;
      advicePoints.push("보장 범위가 넓고 핵심 담보가 고르게 들어 있다는 점을 강조하세요.");
    }

    if (values.priority === "비갱신" && product.renewalType === "비갱신형") {
      score += 12;
      advicePoints.push("장기적으로 보험료 변동 부담이 적은 구조라는 점을 강조하세요.");
    }

    // 8. 카테고리별 추가 보정
    if (values.goal === "실손보험" && product.coverageTags.includes("실손")) {
      score += 8;
      reasons.push("실손 목적에 맞는 의료비 보장 구조를 갖추고 있습니다.");
    }

    if (values.goal === "운전자보험" && product.coverageTags.includes("운전자")) {
      score += 8;
      reasons.push("운전자 비용 대비 목적에 적합한 상품입니다.");
    }

    if (values.goal === "암보험" && product.coverageTags.includes("암진단")) {
      score += 8;
      reasons.push("암 진단 보장 중심으로 보기 좋은 상품입니다.");
    }

    if (values.goal === "건강보험" && product.coverageTags.includes("건강종합")) {
      score += 8;
      reasons.push("건강 종합 보장 성격이 잘 맞는 상품입니다.");
    }

    // 9. 유병자 / 간편심사 반영
    if (hasCondition) {
      if (
        product.coverageTags.includes("간편심사") ||
        product.coverageTags.includes("유병자")
      ) {
        score += 22;
        reasons.push("사전 체크 질병이 있는 경우 검토하기 좋은 유병자/간편심사 상품입니다.");
        advicePoints.push("질병 이력이 있는 고객도 비교적 접근 가능한 구조라는 점을 강조하세요.");
      } else {
        // 질병이 있는데 일반 상품이면 추천은 가능하더라도 큰 감점
        score -= 18;
      }

      if (values.preExistingCondition === "암 병력" && product.category === "암보험") {
        score += 6;
        reasons.push("암 관련 병력 관점에서 암 보장 상품을 우선 검토할 수 있습니다.");
      }

      if (
        (values.preExistingCondition === "심장질환" ||
          values.preExistingCondition === "뇌혈관질환") &&
        product.category === "건강보험"
      ) {
        score += 6;
        reasons.push("중증 질환 대비 관점에서 건강보험 계열 상품을 함께 검토할 수 있습니다.");
      }
    } else {
      if (
        product.coverageTags.includes("간편심사") ||
        product.coverageTags.includes("유병자")
      ) {
        score -= 3;
      }
    }

    // 10. 흡연 여부
    if (values.smoker === "yes" && product.smokerAllowed) {
      score += 2;
    }

    if (advicePoints.length === 0) {
      advicePoints.push("고객 상황에 맞는 핵심 보장을 중심으로 설명하세요.");
      advicePoints.push("비슷한 상품과 비교했을 때 유지 가능성과 목적 적합도를 같이 말해 주세요.");
    }

    return {
      ...product,
      score,
      isEligible,
      reasons,
      advicePoints,
      consultationGuide: {
        opener: buildOpener(product),
        customerAnalysis: buildCustomerAnalysis(values, product),
        recommendationPitch: buildPitch(values, product),
        objectionHandling: buildObjection(product, values),
        comparisonTalk: buildComparison(values, product),
        closing: buildClosing(product),
      },
    };
  });

  // 정렬
  let sorted: ScoredRecommendation[];

  if (values.sortBy === "보험료낮은순") {
    sorted = diversifyByCompany(
      scored.sort((a, b) => a.monthlyPrice - b.monthlyPrice)
    );
  } else if (values.sortBy === "보험료높은순") {
    sorted = diversifyByCompany(
      scored.sort((a, b) => b.monthlyPrice - a.monthlyPrice)
    );
  } else {
    sorted = diversifyByCompany(
      scored.sort((a, b) => b.score - a.score)
    );
  }

  // 최종 필터:
  // 1) 가입 가능해야 함
  // 2) 점수 50점 이상이어야 함
  return sorted
    .filter((item) => item.isEligible && item.score >= 50)
    .slice(0, 5)
    .map(({ isEligible, ...rest }) => rest);
}

function buildOpener(product: Product): string {
  return `${product.company}의 ${product.name}은(는) 단순히 브랜드만 보고 고른 상품이 아니라, 현재 조건에서 목적과 유지 가능성을 함께 고려했을 때 설명드릴 가치가 있는 상품입니다.`;
}

function buildCustomerAnalysis(
  values: SearchFormValues,
  product: Product
): string {
  const ageText = values.age ? `${values.age}세 기준으로` : "현재 입력 조건 기준으로";
  const budgetText = values.budget
    ? `월 ${Number(values.budget).toLocaleString()}원 예산 안에서`
    : "예산 조건을 함께 고려했을 때";

  const conditionText =
    values.preExistingCondition !== "없음"
      ? `${values.preExistingCondition} 이력이 있어 가입 가능 범위와 심사 조건을 같이 고려해야 하는 상황으로 보입니다.`
      : "특별한 사전 체크 질병이 없는 기준으로 일반 상품 범위를 비교하기 좋은 상황입니다.";

  return `${ageText} ${budgetText}, 고객님은 ${values.goal} 목적에 맞는 보장을 찾고 계시고 실제로 오래 유지 가능한 보험료도 중요하게 보고 계신 상황으로 해석됩니다. ${conditionText} ${product.name}은(는) 그 기준에 비교적 잘 맞는 편입니다.`;
}

function buildPitch(values: SearchFormValues, product: Product): string {
  return `이 상품은 ${product.summary}라는 점이 핵심입니다. 월 ${product.monthlyPrice.toLocaleString()}원 수준으로 접근 가능하고, ${product.renewalType} 구조라는 점도 함께 보셔야 합니다. 고객님이 찾으시는 ${values.goal} 목적에서 핵심 담보를 설명하기 좋은 상품입니다.`;
}

function buildObjection(
  product: Product,
  values: SearchFormValues
): string[] {
  const arr: string[] = [];

  arr.push("보험료가 부담된다고 하시면 핵심 담보부터 먼저 설계하고, 필요한 특약은 나중에 넓히는 방식으로 설명하세요.");
  arr.push("다른 회사와 비교할 때는 브랜드보다 실제 보장 범위와 보험료, 갱신 구조를 같이 보자고 안내하세요.");

  if (product.renewalType === "비갱신형") {
    arr.push("비갱신형은 초기 보험료가 아주 낮지는 않을 수 있지만, 장기적으로 보험료 변동이 적다는 점을 강조하세요.");
  } else {
    arr.push("갱신형은 초기 보험료 진입장벽이 낮다는 장점이 있지만, 이후 갱신 가능성은 함께 설명하세요.");
  }

  if (values.preExistingCondition !== "없음") {
    arr.push("질병 이력이 있는 경우에는 일반 상품과 간편심사형 상품의 가입 가능 범위를 비교해서 설명하세요.");
  }

  if (product.category === "실손보험") {
    arr.push("실손은 실제 병원비 보장 목적이 분명하다는 점을 생활형 관점에서 쉽게 설명하세요.");
  }

  if (product.category === "운전자보험") {
    arr.push("운전자보험은 자동차보험으로 다 해결되지 않는 형사 비용 영역을 대비한다는 점을 분리해서 설명하세요.");
  }

  return arr;
}

function buildComparison(
  values: SearchFormValues,
  product: Product
): string[] {
  const arr: string[] = [];

  arr.push(`${values.goal} 기준으로 다른 상품과 비교할 때는 보험료, 갱신 구조, 핵심 담보를 기준으로 설명하세요.`);
  arr.push(`${product.company} 상품이라는 브랜드 인지도보다 현재 고객 조건에 얼마나 잘 맞는지 중심으로 비교하세요.`);

  if (values.preExistingCondition !== "없음") {
    arr.push("질병 이력이 있는 고객은 일반 상품보다 간편심사 여부와 가입 가능성이 더 중요하다는 점도 함께 비교하세요.");
  }

  if (values.priority === "보험료") {
    arr.push("고객이 보험료를 중요하게 본다면, 보장만이 아니라 실제 유지 가능한 수준인지까지 같이 설명하세요.");
  }

  if (values.priority === "보장범위") {
    arr.push("고객이 보장범위를 중요하게 본다면, 단순 가격보다 어떤 위험을 넓게 덮는지 중심으로 비교하세요.");
  }

  if (values.priority === "비갱신") {
    arr.push("고객이 비갱신을 중요하게 본다면, 초기 보험료보다 장기 안정성을 중심으로 비교하세요.");
  }

  return arr;
}

function buildClosing(product: Product): string {
  return `${product.name}은(는) 현재 조건 대비 균형이 좋은 상품입니다. 오늘 설명드린 기준으로 다른 상품과 비교해도 핵심 목적과 유지 가능성 면에서 충분히 검토할 가치가 있습니다.`;
}

function diversifyByCompany(items: ScoredRecommendation[]): ScoredRecommendation[] {
  const companySeen: Record<string, number> = {};

  const adjusted = items.map((item) => {
    const seen = companySeen[item.company] ?? 0;
    companySeen[item.company] = seen + 1;

    return {
      ...item,
      score: item.score - seen * 6,
    };
  });

  return adjusted.sort((a, b) => b.score - a.score);
}
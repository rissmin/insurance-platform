import { useState } from "react";
import SearchForm from "./components/SearchForm";
import RecommendationCard from "./components/RecommendationCard";
import type { SearchFormValues, SearchResult } from "./types/insurance";
import { searchInsurance } from "./services/searchEngine";

const initialValues: SearchFormValues = {
  age: "",
  gender: "male",
  budget: "",
  goal: "암보험",
  smoker: "no",
  renewalType: "상관없음",
  preferredCompany: "전체",
  priority: "기본",
  sortBy: "추천순",
};

function App() {
  const [formValues, setFormValues] = useState<SearchFormValues>(initialValues);
  const [searched, setSearched] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  const recommendations = searchResult?.topRecommendations ?? [];

  const handleChange = (field: keyof SearchFormValues, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    const result = searchInsurance(formValues);
    setSearchResult(result);
    setSearched(true);
  };

  const handleReset = () => {
    setFormValues(initialValues);
    setSearchResult(null);
    setSearched(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #eef4ff 0%, #f8fbff 35%, #f5f7fb 100%)",
        padding: "14px",
        fontFamily:
          "'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, #0f172a 0%, #1d4ed8 55%, #60a5fa 100%)",
            borderRadius: "22px",
            padding: "24px 18px",
            boxShadow: "0 18px 40px rgba(37, 99, 235, 0.18)",
            color: "#ffffff",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: "-70px",
              top: "-70px",
              width: "180px",
              height: "180px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.10)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "30px",
              bottom: "-60px",
              width: "140px",
              height: "140px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.07)",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "inline-block",
                padding: "7px 12px",
                borderRadius: "999px",
                backgroundColor: "rgba(255,255,255,0.14)",
                fontSize: "12px",
                fontWeight: 700,
                marginBottom: "14px",
                letterSpacing: "0.2px",
              }}
            >
              AI 보험 추천 · 상담 보조
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "28px",
                lineHeight: 1.25,
                fontWeight: 800,
                wordBreak: "keep-all",
              }}
            >
              보험 상품 검색 및 추천 서비스
            </h1>

            <p
              style={{
                marginTop: "12px",
                marginBottom: "18px",
                fontSize: "14px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.9)",
                wordBreak: "keep-all",
              }}
            >
              개인정보를 입력하면 보험사와 상품을 먼저 검색한 뒤,
              조건에 맞는 최적 상품 5개를 추천합니다.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <HeaderBadge text="보험사 검색" />
              <HeaderBadge text="상품 검색" />
              <HeaderBadge text="Top 5 추천" />
              <HeaderBadge text="상담 스크립트" />
            </div>
          </div>
        </header>

        <SearchForm
          values={formValues}
          onChange={handleChange}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        <section
          style={{
            backgroundColor: "rgba(255,255,255,0.94)",
            backdropFilter: "blur(10px)",
            borderRadius: "22px",
            padding: "18px",
            boxShadow: "0 16px 34px rgba(15, 23, 42, 0.08)",
            border: "1px solid rgba(255,255,255,0.7)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "14px",
            }}
          >
            <div>
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: "6px",
                  fontSize: "22px",
                  color: "#0f172a",
                  fontWeight: 800,
                }}
              >
                검색 및 추천 결과
              </h2>
              <p
                style={{
                  margin: "6px 0 0",
                  color: "#64748b",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              >
                검색된 보험사와 상품을 기준으로 적합한 상품을 추천합니다.
              </p>
            </div>

            {searched && recommendations.length > 0 && (
              <div
                style={{
                  padding: "9px 12px",
                  borderRadius: "999px",
                  backgroundColor: "#eff6ff",
                  color: "#1d4ed8",
                  fontWeight: 700,
                  fontSize: "13px",
                  border: "1px solid #bfdbfe",
                }}
              >
                추천 {recommendations.length}개
              </div>
            )}
          </div>

          {!searched && (
            <div
              style={{
                padding: "18px",
                borderRadius: "16px",
                backgroundColor: "#f8fafc",
                border: "1px dashed #cbd5e1",
                color: "#64748b",
                fontSize: "14px",
                lineHeight: 1.7,
                wordBreak: "keep-all",
              }}
            >
              개인정보를 입력한 뒤 <strong>보험 추천 받기</strong> 버튼을 눌러주세요.
            </div>
          )}

          {searched && searchResult && (
            <div
              style={{
                marginBottom: "14px",
                padding: "14px",
                borderRadius: "14px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                color: "#334155",
                fontSize: "13px",
                lineHeight: 1.8,
                wordBreak: "keep-all",
              }}
            >
              <strong>검색 결과 요약</strong>
              <br />
              검색된 보험사: {searchResult.matchedCompanies.length}개
              <br />
              검색된 상품: {searchResult.matchedProducts.length}개
              <br />
              최적 추천 상품: {searchResult.topRecommendations.length}개
            </div>
          )}

          {searched && recommendations.length === 0 && (
            <div
              style={{
                padding: "18px",
                borderRadius: "16px",
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#b91c1c",
                fontSize: "14px",
                lineHeight: 1.7,
                wordBreak: "keep-all",
              }}
            >
              조건에 맞는 상품을 찾지 못했습니다.
              <br />
              나이, 예산, 가입 목적, 보험사 조건을 다시 확인해보세요.
            </div>
          )}

          {recommendations.length > 0 && (
            <>
              <div
                style={{
                  display: "grid",
                  gap: "16px",
                }}
              >
                {recommendations.map((product, index) => (
                  <RecommendationCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>


            </>
          )}
        </section>
      </div>
    </div>
  );
}

function HeaderBadge({ text }: { text: string }) {
  return (
    <span
      style={{
        padding: "8px 11px",
        borderRadius: "999px",
        backgroundColor: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.18)",
        fontSize: "12px",
        fontWeight: 700,
        color: "#ffffff",
      }}
    >
      {text}
    </span>
  );
}

export default App;
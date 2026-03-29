import { useState } from "react";
import SearchForm from "./components/SearchForm";
import RecommendationCard from "./components/RecommendationCard";
import type { SearchFormValues, SearchResult } from "./types/insurance";
import { searchInsurance } from "./services/searchEngine";
import "./App.css";

const initialValues: SearchFormValues = {
  age: "",
  gender: "male",
  preExistingCondition: "없음",
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
        background: "#F8FAFC",
        padding: "14px",
        fontFamily:
          "'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', Arial, sans-serif",
        color: "#1F2937",
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
              "linear-gradient(135deg, #1E3A8A 0%, #1E40AF 55%, #3B82F6 100%)",
            borderRadius: "12px",
            padding: "22px 18px",
            boxShadow: "0 10px 24px -8px rgba(30, 64, 175, 0.30)",
            color: "#FFFFFF",
            marginBottom: "14px",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.12,
              backgroundImage:
                "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.28) 0, rgba(255,255,255,0) 28%), radial-gradient(circle at 82% 30%, rgba(255,255,255,0.20) 0, rgba(255,255,255,0) 25%), radial-gradient(circle at 62% 84%, rgba(255,255,255,0.18) 0, rgba(255,255,255,0) 22%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              right: "-50px",
              top: "-40px",
              width: "160px",
              height: "160px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "40px",
              bottom: "-70px",
              width: "150px",
              height: "150px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.07)",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 12px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.14)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.18)",
                fontSize: "12px",
                fontWeight: 700,
                marginBottom: "12px",
                letterSpacing: "0.2px",
              }}
            >
              AI 보험 추천
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "27px",
                lineHeight: 1.3,
                fontWeight: 800,
                wordBreak: "keep-all",
                letterSpacing: "-0.02em",
              }}
            >
              보험 상품 검색 및 추천 서비스
            </h1>

            <p
              style={{
                marginTop: "10px",
                marginBottom: 0,
                fontSize: "14px",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.92)",
                wordBreak: "keep-all",
                maxWidth: "720px",
              }}
            >
              개인정보를 입력하면 보험사와 상품을 먼저 검색한 뒤,
              조건에 맞는 최적 상품을 추천합니다.
            </p>
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
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.08)",
            border: "1px solid #E5E7EB",
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
                  marginBottom: "4px",
                  fontSize: "21px",
                  color: "#1F2937",
                  fontWeight: 800,
                  lineHeight: 1.35,
                  letterSpacing: "-0.01em",
                }}
              >
                검색 및 추천 결과
              </h2>
              <p
                style={{
                  margin: "4px 0 0",
                  color: "#6B7280",
                  fontSize: "13px",
                  lineHeight: 1.65,
                }}
              >
                검색된 보험사와 상품을 기준으로 적합한 상품을 추천합니다.
              </p>
            </div>

            {searched && recommendations.length > 0 && (
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: "999px",
                  backgroundColor: "#EFF6FF",
                  color: "#1E40AF",
                  fontWeight: 700,
                  fontSize: "12px",
                  border: "1px solid #BFDBFE",
                  whiteSpace: "nowrap",
                }}
              >
                추천 {recommendations.length}개
              </div>
            )}
          </div>

          {!searched && (
            <div
              style={{
                padding: "16px",
                borderRadius: "10px",
                backgroundColor: "#F8FAFC",
                border: "1px dashed #CBD5E1",
                color: "#6B7280",
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
                padding: "13px 14px",
                borderRadius: "10px",
                backgroundColor: "#F8FAFC",
                border: "1px solid #E5E7EB",
                color: "#374151",
                fontSize: "13px",
                lineHeight: 1.75,
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
                padding: "16px",
                borderRadius: "10px",
                backgroundColor: "#FEF2F2",
                border: "1px solid #FECACA",
                color: "#B91C1C",
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
            <div
              style={{
                display: "grid",
                gap: "14px",
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
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
import type { SearchFormValues } from "../types/insurance";

type SearchFormProps = {
  values: SearchFormValues;
  onChange: (field: keyof SearchFormValues, value: string) => void;
  onSearch: () => void;
  onReset: () => void;
};

function SearchForm({
  values,
  onChange,
  onSearch,
  onReset,
}: SearchFormProps) {
  return (
    <section
      style={{
        backgroundColor: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(10px)",
        borderRadius: "22px",
        padding: "18px",
        boxShadow: "0 16px 34px rgba(15, 23, 42, 0.08)",
        border: "1px solid rgba(255,255,255,0.7)",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "18px",
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
            개인정보 입력
          </h2>
          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "14px",
              lineHeight: 1.6,
              wordBreak: "keep-all",
            }}
          >
            고객 조건을 입력하면 보험사와 상품을 먼저 검색한 뒤,
            적합한 상품을 추천합니다.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "12px",
        }}
      >
        <Field label="나이">
          <input
            type="number"
            value={values.age}
            onChange={(e) => onChange("age", e.target.value)}
            placeholder="예: 35"
            style={inputStyle}
          />
        </Field>

        <Field label="성별">
          <select
            value={values.gender}
            onChange={(e) => onChange("gender", e.target.value)}
            style={inputStyle}
          >
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </Field>

        <Field label="병역 여부">
          <select
            value={values.militaryStatus}
            onChange={(e) => onChange("militaryStatus", e.target.value)}
            style={inputStyle}
          >
            <option value="해당없음">해당없음</option>
            <option value="군필">군필</option>
            <option value="미필">미필</option>
            <option value="면제">면제</option>
          </select>
        </Field>

        <Field label="월 예산(원)">
          <input
            type="number"
            value={values.budget}
            onChange={(e) => onChange("budget", e.target.value)}
            placeholder="예: 50000"
            style={inputStyle}
          />
        </Field>

        <Field label="가입 목적">
          <select
            value={values.goal}
            onChange={(e) => onChange("goal", e.target.value)}
            style={inputStyle}
          >
            <option value="암보험">암보험</option>
            <option value="실손보험">실손보험</option>
            <option value="건강보험">건강보험</option>
            <option value="운전자보험">운전자보험</option>
          </select>
        </Field>

        <Field label="흡연 여부">
          <select
            value={values.smoker}
            onChange={(e) => onChange("smoker", e.target.value)}
            style={inputStyle}
          >
            <option value="no">비흡연</option>
            <option value="yes">흡연</option>
          </select>
        </Field>

        <Field label="갱신 선호">
          <select
            value={values.renewalType}
            onChange={(e) => onChange("renewalType", e.target.value)}
            style={inputStyle}
          >
            <option value="상관없음">상관없음</option>
            <option value="비갱신형">비갱신형</option>
            <option value="갱신형">갱신형</option>
          </select>
        </Field>

        <Field label="선호 보험사">
          <select
            value={values.preferredCompany}
            onChange={(e) => onChange("preferredCompany", e.target.value)}
            style={inputStyle}
          >
            <option value="전체">전체</option>
            <option value="현대해상">현대해상</option>
            <option value="삼성화재">삼성화재</option>
            <option value="DB손해보험">DB손해보험</option>
            <option value="KB손해보험">KB손해보험</option>
            <option value="메리츠화재">메리츠화재</option>
            <option value="롯데손해보험">롯데손해보험</option>
            <option value="NH농협손해보험">NH농협손해보험</option>
            <option value="흥국화재">흥국화재</option>
          </select>
        </Field>

        <Field label="중요하게 보는 기준">
          <select
            value={values.priority}
            onChange={(e) => onChange("priority", e.target.value)}
            style={inputStyle}
          >
            <option value="기본">기본</option>
            <option value="보험료">보험료</option>
            <option value="보장범위">보장범위</option>
            <option value="비갱신">비갱신</option>
          </select>
        </Field>

        <Field label="정렬 방식">
          <select
            value={values.sortBy}
            onChange={(e) => onChange("sortBy", e.target.value)}
            style={inputStyle}
          >
            <option value="추천순">추천순</option>
            <option value="보험료낮은순">보험료 낮은 순</option>
            <option value="보험료높은순">보험료 높은 순</option>
          </select>
        </Field>
      </div>

      <div
        style={{
          marginTop: "18px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "10px",
        }}
      >
        <button
          onClick={onSearch}
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "14px",
            padding: "16px 18px",
            fontSize: "16px",
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 12px 24px rgba(37, 99, 235, 0.22)",
          }}
        >
          보험 추천 받기
        </button>

        <button
          onClick={onReset}
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
            color: "#334155",
            border: "1px solid #cbd5e1",
            borderRadius: "14px",
            padding: "15px 18px",
            fontSize: "15px",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          초기화
        </button>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        borderRadius: "16px",
        padding: "12px",
        border: "1px solid #e2e8f0",
      }}
    >
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "8px",
  fontWeight: 800,
  fontSize: "13px",
  color: "#334155",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 13px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  fontSize: "16px",
  boxSizing: "border-box",
  outline: "none",
  backgroundColor: "#ffffff",
  color: "#0f172a",
};

export default SearchForm;
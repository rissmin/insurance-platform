import { useState } from "react";
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
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.08)",
        border: "1px solid #E5E7EB",
        marginBottom: "14px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "16px",
        }}
      >
        <div style={{ width: "100%" }}>
          <h2
            style={{
              marginTop: 0,
              marginBottom: "4px",
              fontSize: "21px",
              color: "#1F2937",
              fontWeight: 800,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              textAlign: "left",
            }}
          >
            개인정보 입력
          </h2>
          <p
            style={{
              margin: 0,
              color: "#6B7280",
              fontSize: "13px",
              lineHeight: 1.65,
              wordBreak: "keep-all",
              textAlign: "left",
            }}
          >
            나이, 예산, 건강 상태 등 가입 전 확인이 필요한 조건을 입력하면
            보험사와 상품을 검색한 뒤 적합한 상품을 추천합니다.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "10px",
          width: "100%",
          minWidth: 0,
        }}
      >
        <Field label="나이">
          <InputWithSuffix
            value={values.age}
            placeholder="예: 35"
            suffix="세"
            onChange={(value) => onChange("age", value)}
          />
        </Field>

        <Field label="성별">
          <StyledSelect
            value={values.gender}
            onChange={(value) => onChange("gender", value)}
            options={[
              { label: "남성", value: "male" },
              { label: "여성", value: "female" },
            ]}
          />
        </Field>

        <Field label="과거 치료 이력">
          <StyledSelect
            value={values.preExistingCondition}
            onChange={(value) => onChange("preExistingCondition", value)}
            options={[
              { label: "없음", value: "없음" },
              { label: "고혈압", value: "고혈압" },
              { label: "당뇨", value: "당뇨" },
              { label: "고지혈증", value: "고지혈증" },
              { label: "심장질환", value: "심장질환" },
              { label: "뇌혈관질환", value: "뇌혈관질환" },
              { label: "암 병력", value: "암 병력" },
              { label: "간질환", value: "간질환" },
              { label: "신장질환", value: "신장질환" },
              { label: "갑상선질환", value: "갑상선질환" },
              { label: "기타 질병", value: "기타 질병" },
            ]}
          />
        </Field>

        <Field label="월 예산">
          <InputWithSuffix
            value={values.budget}
            placeholder="예: 50000"
            suffix="원"
            onChange={(value) => onChange("budget", value)}
          />
        </Field>

        <Field label="가입 목적">
          <StyledSelect
            value={values.goal}
            onChange={(value) => onChange("goal", value)}
            options={[
              { label: "암보험", value: "암보험" },
              { label: "실손보험", value: "실손보험" },
              { label: "건강보험", value: "건강보험" },
              { label: "운전자보험", value: "운전자보험" },
            ]}
          />
        </Field>

        <Field label="흡연 여부">
          <StyledSelect
            value={values.smoker}
            onChange={(value) => onChange("smoker", value)}
            options={[
              { label: "비흡연", value: "no" },
              { label: "흡연", value: "yes" },
            ]}
          />
        </Field>

        <Field label="갱신 선호">
          <StyledSelect
            value={values.renewalType}
            onChange={(value) => onChange("renewalType", value)}
            options={[
              { label: "상관없음", value: "상관없음" },
              { label: "비갱신형", value: "비갱신형" },
              { label: "갱신형", value: "갱신형" },
            ]}
          />
        </Field>

        <Field label="선호 보험사">
          <StyledSelect
            value={values.preferredCompany}
            onChange={(value) => onChange("preferredCompany", value)}
            options={[
              { label: "전체", value: "전체" },
              { label: "현대해상", value: "현대해상" },
              { label: "삼성화재", value: "삼성화재" },
              { label: "DB손해보험", value: "DB손해보험" },
              { label: "KB손해보험", value: "KB손해보험" },
              { label: "메리츠화재", value: "메리츠화재" },
              { label: "롯데손해보험", value: "롯데손해보험" },
              { label: "NH농협손해보험", value: "NH농협손해보험" },
              { label: "흥국화재", value: "흥국화재" },
            ]}
          />
        </Field>

        <Field label="중요하게 보는 기준">
          <StyledSelect
            value={values.priority}
            onChange={(value) => onChange("priority", value)}
            options={[
              { label: "기본", value: "기본" },
              { label: "보험료", value: "보험료" },
              { label: "보장범위", value: "보장범위" },
              { label: "비갱신", value: "비갱신" },
            ]}
          />
        </Field>

        <Field label="정렬 방식">
          <StyledSelect
            value={values.sortBy}
            onChange={(value) => onChange("sortBy", value)}
            options={[
              { label: "추천순", value: "추천순" },
              { label: "보험료 낮은 순", value: "보험료낮은순" },
              { label: "보험료 높은 순", value: "보험료높은순" },
            ]}
          />
        </Field>
      </div>

      <div
        style={{
          marginTop: "16px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "8px",
          width: "100%",
          minWidth: 0,
        }}
      >
        <button
          onClick={onSearch}
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "10px",
            padding: "15px 18px",
            fontSize: "15px",
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 8px 18px rgba(59, 130, 246, 0.22)",
          }}
        >
          보험 추천 받기
        </button>

        <button
          onClick={onReset}
          style={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            color: "#374151",
            border: "1px solid #CBD5E1",
            borderRadius: "10px",
            padding: "14px 18px",
            fontSize: "14px",
            fontWeight: 700,
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
        backgroundColor: "#F8FAFC",
        borderRadius: "10px",
        padding: "10px",
        border: "1px solid #E5E7EB",
        textAlign: "left",
        width: "100%",
        minWidth: 0,
      }}
    >
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function StyledSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={{
        width: "100%",
        minWidth: 0,
        padding: "13px 12px",
        borderRadius: "10px",
        border: isFocused ? "1.5px solid #3B82F6" : "1.5px solid #CBD5E1",
        fontSize: "15px",
        boxSizing: "border-box",
        outline: "none",
        backgroundColor: "#FFFFFF",
        color: "#1F2937",
        textAlign: "left",
        boxShadow: isFocused ? "0 0 0 4px rgba(59,130,246,0.10)" : "none",
        transition: "all 0.15s ease",
        minHeight: "46px",
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function InputWithSuffix({
  value,
  placeholder,
  suffix,
  onChange,
}: {
  value: string;
  placeholder: string;
  suffix: string;
  onChange: (value: string) => void;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        borderRadius: "10px",
        border: isFocused ? "1.5px solid #3B82F6" : "1.5px solid #CBD5E1",
        backgroundColor: "#FFFFFF",
        boxShadow: isFocused ? "0 0 0 4px rgba(59,130,246,0.10)" : "none",
        transition: "all 0.15s ease",
        overflow: "hidden",
      }}
    >
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          flex: "1 1 auto",
          minWidth: 0,
          width: "100%",
          padding: "13px 12px",
          border: "none",
          outline: "none",
          fontSize: "15px",
          backgroundColor: "transparent",
          color: "#1F2937",
          boxSizing: "border-box",
        }}
      />
      <div
        style={{
          flexShrink: 0,
          padding: "0 12px",
          color: "#6B7280",
          fontSize: "13px",
          fontWeight: 700,
          whiteSpace: "nowrap",
          borderLeft: "1px solid #E5E7EB",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#FCFCFD",
        }}
      >
        {suffix}
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "7px",
  fontWeight: 700,
  fontSize: "13px",
  color: "#6B7280",
  textAlign: "left",
};

export default SearchForm;
import { useState } from "react";
import type { Recommendation } from "../types/insurance";

type RecommendationCardProps = {
  product: Recommendation;
  index: number;
};

function highlightText(text: string): React.ReactNode {
  const keywords = [
    "고객님",
    "핵심",
    "중요",
    "보험료",
    "보장",
    "갱신",
    "비갱신",
    "추천",
    "장점",
    "단점",
    "비교",
    "유지",
    "부담",
    "설명",
    "포인트",
    "필수",
    "암",
    "실손",
    "건강보험",
    "운전자보험",
    "진단",
    "치료",
    "가입",
    "적합",
  ];

  let result: React.ReactNode[] = [text];

  keywords.forEach((keyword) => {
    result = result.flatMap((part) => {
      if (typeof part !== "string") return [part];

      const split = part.split(new RegExp(`(${keyword})`, "g"));

      return split.map((s, i) =>
        s === keyword ? (
          <strong key={`${keyword}-${i}`} style={{ color: "#1F2937", fontWeight: 800 }}>
            {s}
          </strong>
        ) : (
          s
        )
      );
    });
  });

  return result;
}

function RecommendationCard({ product, index }: RecommendationCardProps) {
  const isTop = index === 0;
  const [isGuideOpen, setIsGuideOpen] = useState(isTop);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        border: isTop ? "1px solid #BFDBFE" : "1px solid #E5E7EB",
        borderRadius: "12px",
        padding: "14px",
        background: isTop
          ? "linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 100%)"
          : "#FFFFFF",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.08)",
        textAlign: "left",
      }}
    >
      {isTop && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            padding: "6px 10px",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)",
            color: "#FFFFFF",
            fontSize: "11px",
            fontWeight: 800,
          }}
        >
          BEST
        </div>
      )}

      <div style={{ display: "grid", gap: "12px", textAlign: "left" }}>
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              display: "inline-block",
              fontSize: "12px",
              color: "#1E40AF",
              fontWeight: 800,
              marginBottom: "8px",
              padding: "6px 10px",
              borderRadius: "999px",
              backgroundColor: "#DBEAFE",
            }}
          >
            {isTop ? "TOP 추천" : `추천 ${index + 1}`}
          </div>

          <h3
            style={{
              margin: 0,
              fontSize: "21px",
              color: "#1F2937",
              fontWeight: 800,
              lineHeight: 1.35,
              wordBreak: "keep-all",
              paddingRight: isTop ? "54px" : "0",
              textAlign: "left",
              letterSpacing: "-0.01em",
            }}
          >
            {product.name}
          </h3>

          <p
            style={{
              margin: "7px 0 0",
              color: "#6B7280",
              fontSize: "13px",
              fontWeight: 600,
              textAlign: "left",
              lineHeight: 1.5,
            }}
          >
            {product.company}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "10px",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              backgroundColor: "#F8FAFC",
              borderRadius: "10px",
              padding: "11px",
              border: "1px solid #E5E7EB",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#6B7280",
                fontWeight: 700,
                marginBottom: "6px",
                textAlign: "left",
              }}
            >
              핵심 비교
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "7px",
              }}
            >
              <QuickBadge text={`💰 ${product.monthlyPrice.toLocaleString()}원`} />
              <QuickBadge text={`🔄 ${product.renewalType}`} />
              <QuickBadge text={`🎯 ${product.category}`} />
              <QuickBadge text={`👤 ${product.minAge}~${product.maxAge}세`} />
            </div>
          </div>

          <div
            style={{
              minWidth: "90px",
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              padding: "11px 13px",
              border: "1px solid #DBEAFE",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#6B7280",
                fontWeight: 700,
                textAlign: "left",
              }}
            >
              추천 점수
            </div>
            <div
              style={{
                fontSize: "23px",
                fontWeight: 900,
                color: "#1E40AF",
                marginTop: "4px",
                lineHeight: 1,
                textAlign: "left",
              }}
            >
              {product.score}
              <span style={{ fontSize: "13px", marginLeft: "2px" }}>점</span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "14px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
        }}
      >
        <InfoBox label="가입 목적" value={product.category} />
        <InfoBox label="월 보험료" value={`${product.monthlyPrice.toLocaleString()}원`} />
        <InfoBox label="갱신 유형" value={product.renewalType} />
        <InfoBox label="가입 가능 나이" value={`${product.minAge}세 ~ ${product.maxAge}세`} />
      </div>

      <Section title="상품 요약">
        <p style={bodyTextStyle}>{highlightText(product.summary)}</p>
      </Section>

      <Section title="추천 이유">
        <ul style={listStyle}>
          {product.reasons.map((reason, reasonIndex) => (
            <li key={reasonIndex}>{highlightText(reason)}</li>
          ))}
        </ul>
      </Section>

      <Section title="설계사 핵심 포인트">
        <ul style={listStyle}>
          {product.advicePoints.map((point, pointIndex) => (
            <li key={pointIndex}>{highlightText(point)}</li>
          ))}
        </ul>
      </Section>

      <div
        style={{
          marginTop: "14px",
          borderRadius: "10px",
          backgroundColor: "#F8FAFC",
          border: "1px solid #E5E7EB",
          overflow: "hidden",
          textAlign: "left",
        }}
      >
        <button
          type="button"
          onClick={() => setIsGuideOpen((prev) => !prev)}
          style={{
            width: "100%",
            backgroundColor: "transparent",
            border: "none",
            padding: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "left",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontSize: "15px",
                color: "#1F2937",
                fontWeight: 800,
                lineHeight: 1.4,
                wordBreak: "keep-all",
                textAlign: "left",
              }}
            >
              실전 상담 가이드
            </div>
            <div
              style={{
                marginTop: "4px",
                fontSize: "12px",
                color: "#6B7280",
                lineHeight: 1.5,
                textAlign: "left",
              }}
            >
              {isGuideOpen
                ? "상담 스크립트를 접으려면 눌러주세요."
                : "상담 스크립트를 펼쳐서 자세히 볼 수 있습니다."}
            </div>
          </div>

          <div
            style={{
              minWidth: "32px",
              height: "32px",
              borderRadius: "999px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #DBEAFE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: 800,
              color: "#1E40AF",
              marginLeft: "12px",
              flexShrink: 0,
            }}
          >
            {isGuideOpen ? "−" : "+"}
          </div>
        </button>

        {isGuideOpen && (
          <div
            style={{
              padding: "0 14px 14px",
              textAlign: "left",
            }}
          >
            <GuideBlock label="1. 상담 오프닝 멘트">
              {product.consultationGuide.opener}
            </GuideBlock>

            <GuideBlock label="2. 고객 상황 해석">
              {product.consultationGuide.customerAnalysis}
            </GuideBlock>

            <GuideBlock label="3. 추천 설명 스크립트">
              {product.consultationGuide.recommendationPitch}
            </GuideBlock>

            <GuideListBlock label="4. 예상 반론 대응">
              {product.consultationGuide.objectionHandling}
            </GuideListBlock>

            <GuideListBlock label="5. 비교 설명 포인트">
              {product.consultationGuide.comparisonTalk}
            </GuideListBlock>

            <GuideBlock label="6. 마무리 클로징">
              {product.consultationGuide.closing}
            </GuideBlock>
          </div>
        )}
      </div>
    </div>
  );
}

function QuickBadge({ text }: { text: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 9px",
        borderRadius: "999px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #DBEAFE",
        color: "#374151",
        fontSize: "12px",
        fontWeight: 700,
        lineHeight: 1.2,
        wordBreak: "keep-all",
        textAlign: "left",
      }}
    >
      {text}
    </span>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        marginTop: "14px",
        padding: "13px",
        borderRadius: "10px",
        backgroundColor: "#F8FAFC",
        border: "1px solid #E5E7EB",
        textAlign: "left",
      }}
    >
      <h4
        style={{
          margin: 0,
          fontSize: "15px",
          color: "#1F2937",
          fontWeight: 700,
          lineHeight: 1.4,
          wordBreak: "keep-all",
          textAlign: "left",
        }}
      >
        {title}
      </h4>
      <div style={{ textAlign: "left" }}>{children}</div>
    </div>
  );
}

function GuideBlock({
  label,
  children,
}: {
  label: string;
  children: string;
}) {
  return (
    <div
      style={{
        marginTop: "10px",
        padding: "11px",
        borderRadius: "10px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
        textAlign: "left",
      }}
    >
      <div
        style={{
          fontSize: "13px",
          fontWeight: 700,
          color: "#1E40AF",
          marginBottom: "7px",
          lineHeight: 1.5,
          wordBreak: "keep-all",
          textAlign: "left",
        }}
      >
        {label}
      </div>
      <div style={bodyTextStyle}>{highlightText(children)}</div>
    </div>
  );
}

function GuideListBlock({
  label,
  children,
}: {
  label: string;
  children: string[];
}) {
  return (
    <div
      style={{
        marginTop: "10px",
        padding: "11px",
        borderRadius: "10px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
        textAlign: "left",
      }}
    >
      <div
        style={{
          fontSize: "13px",
          fontWeight: 700,
          color: "#1E40AF",
          marginBottom: "7px",
          lineHeight: 1.5,
          wordBreak: "keep-all",
          textAlign: "left",
        }}
      >
        {label}
      </div>
      <ul style={listStyle}>
        {children.map((item, index) => (
          <li key={index}>{highlightText(item)}</li>
        ))}
      </ul>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        backgroundColor: "#F8FAFC",
        borderRadius: "10px",
        padding: "11px",
        border: "1px solid #E5E7EB",
        minWidth: 0,
        textAlign: "left",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          color: "#6B7280",
          marginBottom: "5px",
          fontWeight: 700,
          lineHeight: 1.4,
          textAlign: "left",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "14px",
          fontWeight: 700,
          color: "#1F2937",
          lineHeight: 1.5,
          wordBreak: "keep-all",
          textAlign: "left",
        }}
      >
        {value}
      </div>
    </div>
  );
}

const bodyTextStyle: React.CSSProperties = {
  margin: "6px 0 0",
  color: "#374151",
  lineHeight: 1.78,
  fontSize: "13px",
  wordBreak: "keep-all",
  textAlign: "left",
};

const listStyle: React.CSSProperties = {
  margin: "6px 0 0 18px",
  color: "#374151",
  lineHeight: 1.75,
  fontSize: "13px",
  paddingLeft: "2px",
  wordBreak: "keep-all",
  textAlign: "left",
};

export default RecommendationCard;
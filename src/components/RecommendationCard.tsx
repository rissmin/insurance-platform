import { useState } from "react";
import type { Recommendation } from "../types/insurance";

type RecommendationCardProps = {
  product: Recommendation;
  index: number;
};

function RecommendationCard({ product, index }: RecommendationCardProps) {
  const isTop = index === 0;
  const [isGuideOpen, setIsGuideOpen] = useState(isTop);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        border: isTop ? "1px solid #bfdbfe" : "1px solid #e5e7eb",
        borderRadius: "20px",
        padding: "16px",
        background: isTop
          ? "linear-gradient(180deg, #eff6ff 0%, #ffffff 100%)"
          : "#ffffff",
        boxShadow: isTop
          ? "0 14px 28px rgba(37, 99, 235, 0.12)"
          : "0 10px 22px rgba(15, 23, 42, 0.06)",
        textAlign: "left",
      }}
    >
      {isTop && (
        <div
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            padding: "7px 10px",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
            color: "#ffffff",
            fontSize: "11px",
            fontWeight: 800,
            boxShadow: "0 8px 18px rgba(37, 99, 235, 0.22)",
          }}
        >
          BEST
        </div>
      )}

      <div style={{ display: "grid", gap: "14px", textAlign: "left" }}>
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              display: "inline-block",
              fontSize: "12px",
              color: "#2563eb",
              fontWeight: 800,
              marginBottom: "8px",
              padding: "6px 10px",
              borderRadius: "999px",
              backgroundColor: "#dbeafe",
            }}
          >
            {isTop ? "TOP 추천" : `추천 ${index + 1}`}
          </div>

          <h3
            style={{
              margin: 0,
              fontSize: "22px",
              color: "#0f172a",
              fontWeight: 800,
              lineHeight: 1.35,
              wordBreak: "keep-all",
              paddingRight: isTop ? "54px" : "0",
              textAlign: "left",
            }}
          >
            {product.name}
          </h3>

          <p
            style={{
              margin: "8px 0 0",
              color: "#475569",
              fontSize: "14px",
              fontWeight: 600,
              textAlign: "left",
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
              backgroundColor: "#f8fafc",
              borderRadius: "16px",
              padding: "12px",
              border: "1px solid #e2e8f0",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
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
                gap: "8px",
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
              minWidth: "92px",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "12px 14px",
              border: "1px solid #dbeafe",
              boxShadow: "0 6px 16px rgba(37, 99, 235, 0.08)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
                fontWeight: 700,
                textAlign: "left",
              }}
            >
              추천 점수
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 900,
                color: "#1d4ed8",
                marginTop: "4px",
                lineHeight: 1,
                textAlign: "left",
              }}
            >
              {product.score}
              <span style={{ fontSize: "14px", marginLeft: "2px" }}>점</span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "16px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
        }}
      >
        <InfoBox label="가입 목적" value={product.category} />
        <InfoBox
          label="월 보험료"
          value={`${product.monthlyPrice.toLocaleString()}원`}
        />
        <InfoBox label="갱신 유형" value={product.renewalType} />
        <InfoBox
          label="가입 가능 나이"
          value={`${product.minAge}세 ~ ${product.maxAge}세`}
        />
      </div>

      <Section title="상품 요약">
        <p style={bodyTextStyle}>{product.summary}</p>
      </Section>

      <Section title="추천 이유">
        <ul style={listStyle}>
          {product.reasons.map((reason, reasonIndex) => (
            <li key={reasonIndex}>{reason}</li>
          ))}
        </ul>
      </Section>

      <Section title="설계사 핵심 포인트">
        <ul style={listStyle}>
          {product.advicePoints.map((point, pointIndex) => (
            <li key={pointIndex}>{point}</li>
          ))}
        </ul>
      </Section>

      <div
        style={{
          marginTop: "16px",
          borderRadius: "16px",
          backgroundColor: "#f8fafc",
          border: "1px solid #e2e8f0",
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
            padding: "16px",
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
                fontSize: "16px",
                color: "#0f172a",
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
                color: "#64748b",
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
              minWidth: "34px",
              height: "34px",
              borderRadius: "999px",
              backgroundColor: "#ffffff",
              border: "1px solid #dbeafe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: 800,
              color: "#1d4ed8",
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
              padding: "0 16px 16px",
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
        padding: "7px 10px",
        borderRadius: "999px",
        backgroundColor: "#ffffff",
        border: "1px solid #dbeafe",
        color: "#334155",
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
        marginTop: "16px",
        padding: "14px",
        borderRadius: "16px",
        backgroundColor: "#f8fafc",
        border: "1px solid #e2e8f0",
        textAlign: "left",
      }}
    >
      <h4
        style={{
          margin: 0,
          fontSize: "16px",
          color: "#0f172a",
          fontWeight: 800,
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
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        marginTop: "12px",
        padding: "12px",
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        textAlign: "left",
      }}
    >
      <div
        style={{
          fontSize: "13px",
          fontWeight: 800,
          color: "#1d4ed8",
          marginBottom: "8px",
          lineHeight: 1.5,
          wordBreak: "keep-all",
          textAlign: "left",
        }}
      >
        {label}
      </div>
      <div style={bodyTextStyle}>{children}</div>
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
        marginTop: "12px",
        padding: "12px",
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        textAlign: "left",
      }}
    >
      <div
        style={{
          fontSize: "13px",
          fontWeight: 800,
          color: "#1d4ed8",
          marginBottom: "8px",
          lineHeight: 1.5,
          wordBreak: "keep-all",
          textAlign: "left",
        }}
      >
        {label}
      </div>
      <ul style={listStyle}>
        {children.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        borderRadius: "14px",
        padding: "12px",
        border: "1px solid #e2e8f0",
        minWidth: 0,
        textAlign: "left",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          color: "#64748b",
          marginBottom: "6px",
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
          fontWeight: 800,
          color: "#0f172a",
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
  margin: "8px 0 0",
  color: "#334155",
  lineHeight: 1.8,
  fontSize: "14px",
  wordBreak: "keep-all",
  textAlign: "left",
};

const listStyle: React.CSSProperties = {
  margin: "8px 0 0 18px",
  color: "#334155",
  lineHeight: 1.8,
  fontSize: "14px",
  paddingLeft: "2px",
  wordBreak: "keep-all",
  textAlign: "left",
};

export default RecommendationCard;
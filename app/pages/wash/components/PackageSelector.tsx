"use client";

type Package = "guld" | "premium" | "brilliant";

type Props = {
  active: Package;
  onChange: (pkg: Package) => void;
};

function GuldBtn({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <div style={{ flex: 1, clipPath: "polygon(0 0, 100% 0, calc(100% - 24px) 100%, 0 100%)", padding: 2, border: "2px solid var(--color-primary)" }}>
      <div
        onClick={onClick}
        style={{
          background: active ? "var(--color-active-bg-transparent)" : "#000",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 16,
          cursor: "pointer",
          clipPath: "polygon(0 0, 100% -5px, calc(100% - 26px) 100%, 0 100%)",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: "var(--body-sm-size)", color: "var(--color-primary)" }}>Guld</div>
        <div style={{ fontSize: "var(--price-light-size)", lineHeight: "var(--price-light-line-small)", color: "#fff" }}>139kr./md</div>
      </div>
    </div>
  );
}

function PremiumBtn({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <div style={{ flex: 1, clipPath: "polygon(24px 0, calc(100% - 24px) 0, 100% 100%, 0 100%)", padding: 2, border: "2px solid var(--color-primary)"  }}>
      <div
        onClick={onClick}
        style={{
          background: active ? "var(--color-active-bg-transparent)" : "#000",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 32,
          cursor: "pointer",
          clipPath: "polygon(24px 0, 100% 0, calc(100% - 24px) 100%, 0 100%)",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: "var(--body-sm-size)", color: "var(--color-primary)" }}>Premium</div>
        <div style={{ fontSize: "var(--body-xs-size)", lineHeight: "var(--price-light-line-small)", color: "#fff" }}>169kr./md</div>
      </div>
    </div>
  );
}

function BrilliantBtn({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <div style={{ flex: 1, clipPath: "polygon(24px 0, 100% 0, 100% 100%, 0 100%)", padding: 2, border: "2px solid var(--color-primary)"  }}>
      <div
        onClick={onClick}
        style={{
          background: active ? "var(--color-active-bg-transparent)" : "#000",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 36,
          cursor: "pointer",
          clipPath: "polygon(24px 0, 100% 0, 100% 100%, 1px 100%)",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: "var(--body-sm-size)", color: "var(--color-primary)" }}>Brilliant</div>
        <div style={{ fontSize: "var(--body-xs-size)", lineHeight: "var(--price-light-line-small)", color: "#fff" }}>199kr./md</div>
      </div>
    </div>
  );
}

export default function PackageSelector({ active, onChange }: Props) {
  return (
    <div style={{ display: "flex", margin: "0 4px", height: 68, gap: 2 }}>
      <GuldBtn active={active === "guld"} onClick={() => onChange("guld")} />
      <PremiumBtn active={active === "premium"} onClick={() => onChange("premium")} />
      <BrilliantBtn active={active === "brilliant"} onClick={() => onChange("brilliant")} />
    </div>
  );
}
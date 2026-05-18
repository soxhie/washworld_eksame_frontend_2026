"use client";

type Package = "guld" | "premium" | "brilliant";

type Props = {
  active: Package;
};

const features = [
  { name: "Skumforvask", guld: true, premium: true, brilliant: true },
  { name: "Aktiv shampoo", guld: true, premium: true, brilliant: true },
  { name: "Hjulvask", guld: true, premium: true, brilliant: true },
  { name: "Højtryksvask", guld: true, premium: true, brilliant: true },
  { name: "Børstevask", guld: true, premium: true, brilliant: true },
  { name: "Voks", guld: true, premium: true, brilliant: true },
  { name: "Tørring", guld: true, premium: true, brilliant: true },
  { name: "Højglans", guld: false, premium: true, brilliant: true },
  { name: "Undervognsvask", guld: false, premium: true, brilliant: true },
  { name: "Skumvask", guld: false, premium: false, brilliant: true },
  { name: "Affedtning", guld: false, premium: false, brilliant: true },
  { name: "Sæsonrens", guld: false, premium: false, brilliant: true },
];

const PACKAGES: Package[] = ["guld", "premium", "brilliant"];

function Check({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke={active ? "#22c55e" : "#fff"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PackageFeatures({ active }: Props) {
  const activeIndex = PACKAGES.indexOf(active);

  return (
    <div style={{ background: "#111", padding: "26px 25px", display: "flex", flexDirection: "column", gap: 6 }}>
      {features.map((feature) => (
        <div key={feature.name} style={{ display: "flex", height: 32, gap: 2 }}>
          <div
            style={{
              flex: 1,
              background: "#22c55e",
              clipPath: "polygon(0 0, 100% 0, calc(100% - 24px) 100%, 0 100%)",
              display: "flex",
              alignItems: "center",
              paddingLeft: 12,
              fontWeight: 700,
              fontSize: 16,
              color: "#fff",
              marginRight: -20,
            }}
          >
            {feature.name}
          </div>

          <div style={{ display: "flex", gap: 6 }}>
            {PACKAGES.map((pkg, i) => {
              const included = feature[pkg];
              const isActive = i === activeIndex;
              return (
                <div
                  key={pkg}
                  style={{
                    width: 44,
                    background: "#2a2a2a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    ...(i === 0 ? { clipPath: "polygon(24px 0, 100% 0, 100% 100%, 0 100%)", paddingLeft: 12, width: 56 } : {}),
                  }}
                >
                  {included && <Check active={isActive} />}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
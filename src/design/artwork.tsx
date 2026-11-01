export function OrbitArtwork() {
  return (
    <div className="orbit-art" aria-hidden="true">
      <div className="orbit-glow" />
      <svg viewBox="0 0 500 500" fill="none">
        <g stroke="currentColor" strokeWidth="0.7">
          <circle cx="250" cy="250" r="180" />
          <ellipse
            cx="250"
            cy="250"
            rx="180"
            ry="65"
            transform="rotate(-30 250 250)"
          />
          <ellipse
            cx="250"
            cy="250"
            rx="180"
            ry="110"
            transform="rotate(-30 250 250)"
          />
          <ellipse
            cx="250"
            cy="250"
            rx="65"
            ry="180"
            transform="rotate(-30 250 250)"
          />
          <ellipse
            cx="250"
            cy="250"
            rx="110"
            ry="180"
            transform="rotate(-30 250 250)"
          />
          <path
            d="M30 250h440M250 30v440"
            strokeDasharray="3 8"
            opacity="0.3"
          />
        </g>
        <circle cx="250" cy="250" r="38" className="orbit-core" />
        <path
          d="m238 240-10 10 10 10m24-20 10 10-10 10m-9-26-6 32"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="107" cy="141" r="5" fill="currentColor" />
        <circle cx="408" cy="336" r="5" fill="currentColor" />
        <circle cx="301" cy="78" r="4" fill="currentColor" />
      </svg>
      <span className="orbit-label label-web">WEB</span>
      <span className="orbit-label label-ios">iOS</span>
      <span className="orbit-label label-android">ANDROID</span>
      <span className="orbit-label label-tizen">TIZEN</span>
      <span className="orbit-caption">01 — WEB / NATIVE</span>
    </div>
  );
}

export function ProjectArtwork({ index }: { index: number }) {
  return (
    <div className={`project-art project-art-${index}`} aria-hidden="true">
      <span className="art-index">0{index + 1}</span>
      <svg
        viewBox="0 0 500 300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      >
        {index === 0 ? (
          <>
            <ellipse cx="250" cy="160" rx="160" ry="80" strokeDasharray="3 7" />
            <ellipse cx="250" cy="160" rx="110" ry="55" />
            <ellipse cx="250" cy="160" rx="60" ry="30" />
            <path
              d="M250 56c-22 0-37 17-37 36 0 29 37 62 37 62s37-33 37-62c0-19-15-36-37-36Z"
              className="art-fill"
            />
            <circle cx="250" cy="92" r="11" />
            <circle cx="130" cy="198" r="8" className="art-fill" />
            <circle cx="365" cy="127" r="8" className="art-fill" />
            <path d="m174 102 20 10m117 94 20 10" />
          </>
        ) : index === 1 ? (
          <>
            <path d="m250 50 130 74v111l-130 45-130-75V94l130-44Z" />
            <path d="m120 94 130 75 130-45M250 169v111M177 126v111M319 145v111M250 50v119" />
            <path d="m205 209 45-16 45 26-45 16-45-26Z" className="art-fill" />
            <path d="m150 48 100-35 100 58M96 222l139 80 172-58" opacity=".4" />
          </>
        ) : (
          <>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <path
                key={i}
                d={`M60 ${100 + i * 17} C145 ${30 + i * 17}, 200 ${220 + i * 5}, 280 ${120 + i * 12} S390 ${70 + i * 17}, 450 ${120 + i * 17}`}
                opacity={1 - i * 0.09}
              />
            ))}
            <circle cx="330" cy="87" r="27" strokeDasharray="3 5" />
            <circle cx="330" cy="87" r="8" className="art-fill" />
          </>
        )}
      </svg>
      <span className="art-caption">
        {
          ["FAMILY / CONNECTION", "SPACE / INTERACTION", "AIR / AWARENESS"][
            index
          ]
        }
      </span>
    </div>
  );
}

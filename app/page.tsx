"use client";

import { useState } from "react";

export default function Home() {
  const [period, setPeriod] = useState("Ay");
  const [avgHeadcount, setAvgHeadcount] = useState("");
  const [totalLeavers, setTotalLeavers] = useState("");
  const [voluntaryLeavers, setVoluntaryLeavers] = useState("");
  const [involuntaryLeavers, setInvoluntaryLeavers] = useState("");

  const parseNumber = (value: string) => {
    const n = Number(value.replace(",", "."));
    return isNaN(n) ? 0 : n;
  };

  const avg = parseNumber(avgHeadcount);
  const total = parseNumber(totalLeavers);
  const voluntary = parseNumber(voluntaryLeavers);
  const involuntary = parseNumber(involuntaryLeavers);

  const overallTurnover =
    avg > 0 && total >= 0 ? (total / avg) * 100 : undefined;
  const voluntaryTurnover =
    avg > 0 && voluntary >= 0 ? (voluntary / avg) * 100 : undefined;
  const involuntaryTurnover =
    avg > 0 && involuntary >= 0 ? (involuntary / avg) * 100 : undefined;

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px 16px",
        background: "#f5f5f7",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          background: "#ffffff",
          borderRadius: 16,
          padding: 24,
          boxShadow:
            "0 18px 45px rgba(15, 23, 42, 0.08), 0 8px 18px rgba(15, 23, 42, 0.06)",
        }}
      >
        <header style={{ marginBottom: 24 }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 4,
              color: "#111827",
            }}
          >
            HR Turnover Rate Hesablayıcı
          </h1>
          <p style={{ color: "#4b5563", fontSize: 14 }}>
            Dövr üzrə işçi dövriyyəsini (turnover) hesablamaq üçün HR aləti.
          </p>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div style={{ gridColumn: "1 / -1" }}>
            <label>Dövr</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 10,
                border: "1px solid #ddd",
              }}
            >
              <option>Ay</option>
              <option>Rüb</option>
              <option>İl</option>
            </select>
          </div>

          <div>
            <label>Orta işçi sayı</label>
            <input
              type="number"
              value={avgHeadcount}
              onChange={(e) => setAvgHeadcount(e.target.value)}
              placeholder="Məs: 40"
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 10,
                border: "1px solid #ddd",
              }}
            />
          </div>

          <div>
            <label>Ümumi çıxan işçi sayı</label>
            <input
              type="number"
              value={totalLeavers}
              onChange={(e) => setTotalLeavers(e.target.value)}
              placeholder="Məs: 4"
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 10,
                border: "1px solid #ddd",
              }}
            />
          </div>

          <div>
            <label>Könüllü çıxanlar</label>
            <input
              type="number"
              value={voluntaryLeavers}
              onChange={(e) => setVoluntaryLeavers(e.target.value)}
              placeholder="Opsional"
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 10,
                border: "1px solid #ddd",
              }}
            />
          </div>

          <div>
            <label>Məcburi çıxanlar</label>
            <input
              type="number"
              value={involuntaryLeavers}
              onChange={(e) => setInvoluntaryLeavers(e.target.value)}
              placeholder="Opsional"
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 10,
                border: "1px solid #ddd",
              }}
            />
          </div>
        </section>

        <section
          style={{
            borderTop: "1px solid #eee",
            paddingTop: 16,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
          }}
        >
          <div>
            <b>Ümumi Turnover Rate</b>
            <p>{overallTurnover ? overallTurnover.toFixed(1) + "%" : "—"}</p>
          </div>

          <div>
            <b>Könüllü Turnover</b>
            <p>{voluntaryTurnover ? voluntaryTurnover.toFixed(1) + "%" : "—"}</p>
          </div>

          <div>
            <b>Məcburi Turnover</b>
            <p>{involuntaryTurnover ? involuntaryTurnover.toFixed(1) + "%" : "—"}</p>
          </div>
        </section>
      </div>
    </main>
  );
}


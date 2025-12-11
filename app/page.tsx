"use client";

import { useMemo, useState } from "react";

type Level = "low" | "medium" | "high" | "na";

interface Metric {
  label: string;
  value?: number;
  level: Level;
  description: string;
}

export default function Home() {
  const [period, setPeriod] = useState("Ay");
  const [avgHeadcount, setAvgHeadcount] = useState("");
  const [totalLeavers, setTotalLeavers] = useState("");
  const [voluntaryLeavers, setVoluntaryLeavers] = useState("");
  const [involuntaryLeavers, setInvoluntaryLeavers] = useState("");

  const parseNumber = (value: string) => {
    const cleaned = value.replace(",", ".").trim();
    if (!cleaned) return 0;
    const n = Number(cleaned);
    return isNaN(n) || n < 0 ? 0 : n;
  };

  const avg = parseNumber(avgHeadcount);
  const total = parseNumber(totalLeavers);
  const voluntary = parseNumber(voluntaryLeavers);
  const involuntary = parseNumber(involuntaryLeavers);

  const calcLevel = (rate?: number): Level => {
    if (rate === undefined || isNaN(rate)) return "na";
    if (rate < 10) return "low";
    if (rate < 20) return "medium";
    return "high";
  };

  const metrics: Metric[] = useMemo(() => {
    const overall =
      avg > 0 && total >= 0 ? (total / avg) * 100 : undefined;
    const voluntaryRate =
      avg > 0 && voluntary >= 0 ? (voluntary / avg) * 100 : undefined;
    const involuntaryRate =
      avg > 0 && involuntary >= 0 ? (involuntary / avg) * 100 : undefined;

    return [
      {
        label: "Ümumi Turnover Rate",
        value: overall,
        level: calcLevel(overall),
        description:
          "Formula: (Ümumi çıxan işçi sayı / Orta işçi sayı) × 100. Ümumi işçi dövriyyəsini göstərir.",
      },
      {
        label: "Könüllü Turnover",
        value: voluntaryRate,
        level: calcLevel(voluntaryRate),
        description:
          "Yalnız könüllü (istefa və s.) çıxışları nəzərə alır. Məmnunluq və motivasiya ilə bağlı siqnal verir.",
      },
      {
        label: "Məcburi Turnover",
        value: involuntaryRate,
        level: calcLevel(involuntaryRate),
        description:
          "İşdən çıxarılma, performans səbəbli ayrılmalar və s. üçün göstəricidir.",
      },
    ];
  }, [avg, total, voluntary, involuntary]);

  const levelBadge = (level: Level) => {
    if (level === "na") {
      return (
        <span className="inline-flex items-center rounded-full border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-500">
          Hesablanmayıb
        </span>
      );
    }
    if (level === "low") {
      return (
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
          Aşağı risk
        </span>
      );
    }
    if (level === "medium") {
      return (
        <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-amber-100">
          Orta səviyyə
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700 ring-1 ring-red-100">
        Yüksək risk
      </span>
    );
  };

  const handleReset = () => {
    setPeriod("Ay");
    setAvgHeadcount("");
    setTotalLeavers("");
    setVoluntaryLeavers("");
    setInvoluntaryLeavers("");
  };

  const periodLabel =
    period === "Ay"
      ? "Aylıq"
      : period === "Rüb"
      ? "Rüblük"
      : period === "İl"
      ? "İllik"
      : "Seçilən dövr üzrə";

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl">
        {/* YUXARIDAKI BIRBANK HEADER */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-rose-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              B
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-slate-900">
                  birbank
                </span>
                <span className="text-[10px] uppercase tracking-wide text-rose-600">
                  HR Analytics
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                Turnover &amp; employee insights
              </p>
            </div>
          </div>

          <span className="text-xs text-slate-500">{periodLabel} hesablamalar</span>
        </div>

        <main className="bg-white shadow-xl shadow-slate-200 rounded-2xl p-6 md:p-8 border border-slate-100">
          <header className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              HR Turnover Rate Hesablayıcı
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Dövr üzrə işçi dövriyyəsini (turnover) hesablamaq üçün interaktiv
              HR aləti. Aşağıdakı məlumatları daxil et, nəticə avtomatik
              formalaşsın.
            </p>
          </header>

          {/* Form hissəsi */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Dövr
              </label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option>Ay</option>
                <option>Rüb</option>
                <option>İl</option>
                <option>Digər</option>
              </select>
              <p className="mt-1 text-[11px] text-slate-500">
                Aylıq, rüblük və ya illik turnover üçün istifadə edə bilərsiniz.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Orta işçi sayı
              </label>
              <input
                type="number"
                min={0}
                value={avgHeadcount}
                onChange={(e) => setAvgHeadcount(e.target.value)}
                placeholder="Məs: 40"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                (Dövrün əvvəlində işçi sayı + dövrün sonunda işçi sayı) ÷ 2
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Ümumi çıxan işçi sayı
              </label>
              <input
                type="number"
                min={0}
                value={totalLeavers}
                onChange={(e) => setTotalLeavers(e.target.value)}
                placeholder="Məs: 4"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Könüllü + Məcburi çıxanların cəmi.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Könüllü çıxanlar
              </label>
              <input
                type="number"
                min={0}
                value={voluntaryLeavers}
                onChange={(e) => setVoluntaryLeavers(e.target.value)}
                placeholder="Opsional"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Məcburi çıxanlar
              </label>
              <input
                type="number"
                min={0}
                value={involuntaryLeavers}
                onChange={(e) => setInvoluntaryLeavers(e.target.value)}
                placeholder="Opsional"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </section>

          <div className="mb-6 flex items-center justify-between gap-2">
            <p className="text-[11px] text-slate-500">
              Qeyd: Orta işçi sayı 0 olduqda göstəricilər hesablana bilməz.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
            >
              Sıfırla
            </button>
          </div>

          {/* Nəticə kartları */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-slate-600">
                    {m.label}
                  </p>
                  {levelBadge(m.level)}
                </div>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {m.value !== undefined && !isNaN(m.value)
                    ? `${m.value.toFixed(1)}%`
                    : "—"}
                </p>
                <p className="mt-2 text-[11px] text-slate-500">
                  {m.description}
                </p>
              </div>
            ))}
          </section>

          <section className="mt-6 border-t border-slate-100 pt-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-1">
              Şərh diapazonları (daxili HR referansı)
            </h3>
            <ul className="text-[11px] text-slate-500 list-disc list-inside space-y-1">
              <li>
                <span className="font-medium">0–10%:</span> Aşağı turnover –
                adətən sağlam səviyyə hesab olunur.
              </li>
              <li>
                <span className="font-medium">10–20%:</span> Orta turnover –
                departamentə görə izlənməlidir.
              </li>
              <li>
                <span className="font-medium">&gt; 20%:</span> Yüksək risk –
                səbəblərin analizi və tədbirlər tələb oluna bilər.
              </li>
            </ul>
          </section>

          {/* FOOTER – by Elmi Qurbanli */}
          <footer className="mt-6 border-t border-slate-100 pt-4">
            <p className="text-[11px] text-slate-400 text-center">
              by <span className="font-medium text-slate-500">Elmi Qurbanli</span>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

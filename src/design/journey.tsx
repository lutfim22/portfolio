"use client";

import { Arrow } from "./icons";

import { useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { matchesYear } from "@/lib/journey";
import { reviewContent } from "./content";

export function Journey({ locale }: { locale: Locale }) {
  const c = reviewContent[locale];
  const [filter, setFilter] = useState("all");
  const [year, setYear] = useState("all");
  const visible = c.milestones.map(
    (m) =>
      (filter === "all" || filter === m.category) && matchesYear(m.year, year),
  );
  const years = [
    ...new Set(c.milestones.flatMap((m) => m.year.match(/\d{4}/g) ?? [])),
  ]
    .sort()
    .reverse();
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const milestone = c.milestones[selected];
  return (
    <>
      <div className="journey-filter">
        <label htmlFor="journey-year">
          {locale === "en" ? "Year" : "Tahun"}
        </label>
        <select
          id="journey-year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="all">
            {locale === "en" ? "All years" : "Semua tahun"}
          </option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <label htmlFor="journey-filter">{c.filter}</label>
        <select
          id="journey-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">{c.all}</option>
          <option value="work">{c.workFilter}</option>
          <option value="education">{c.education}</option>
        </select>
      </div>
      <div className="journey-list">
        {c.milestones.map((m, index) => (
          <details key={m.year} hidden={!visible[index]}>
            <summary
              onClick={(e) => {
                e.preventDefault();
                setSelected(index);
                dialog.current?.showModal();
              }}
            >
              <span className="journey-year">{m.year}</span>
              <span className="journey-node" aria-hidden="true" />
              <span className="journey-copy">
                <strong>{m.title}</strong>
                <span>{m.place}</span>
              </span>
              <span className="journey-plus" aria-hidden="true">
                <Arrow />
              </span>
            </summary>
            <p>{m.description}</p>
          </details>
        ))}
      </div>
      <p className="journey-status" role="status">
        {!visible.some(Boolean)
          ? locale === "en"
            ? "No chapters match these filters."
            : "Tidak ada bab yang sesuai dengan filter ini."
          : ""}
      </p>
      <dialog
        className="journey-dialog"
        ref={dialog}
        aria-labelledby="chapter-title"
        onClick={(e) => {
          if (e.target !== e.currentTarget) return;
          const bounds = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < bounds.left ||
            e.clientX > bounds.right ||
            e.clientY < bounds.top ||
            e.clientY > bounds.bottom
          )
            dialog.current?.close();
        }}
      >
        <form method="dialog">
          <button aria-label={c.close} className="dialog-close">
            ×
          </button>
        </form>
        <p className="section-label">{milestone.year}</p>
        <h2 id="chapter-title">{milestone.title}</h2>
        <p className="chapter-place">{milestone.place}</p>
        <p>{milestone.description}</p>
      </dialog>
    </>
  );
}

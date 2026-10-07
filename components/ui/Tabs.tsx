"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  /** Accessible name for the tab list. */
  label: string;
  /** Unique prefix for element ids. */
  idBase: string;
  tabs: TabItem[];
  defaultTab?: string;
  onChange?: (id: string) => void;
}

/**
 * ARIA tabs with the full keyboard pattern (spec 6.4): roving tabindex, Left/Right arrows,
 * Home and End, automatic activation. Inactive panels stay in the HTML (hidden), so the
 * content is server-rendered and readable without JavaScript.
 */
export function Tabs({ label, idBase, tabs, defaultTab, onChange }: TabsProps) {
  const [selected, setSelected] = useState(defaultTab ?? tabs[0]?.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(index: number) {
    const tab = tabs[index];
    setSelected(tab.id);
    tabRefs.current[index]?.focus();
    onChange?.(tab.id);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = tabs.length - 1;
    const next: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    select(next[event.key]);
  }

  return (
    <div>
      <div className="tabs" role="tablist" aria-label={label}>
        {tabs.map((tab, index) => {
          const isSelected = tab.id === selected;
          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${idBase}-tab-${tab.id}`}
              className="tab"
              aria-selected={isSelected}
              aria-controls={`${idBase}-panel-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${idBase}-panel-${tab.id}`}
          aria-labelledby={`${idBase}-tab-${tab.id}`}
          tabIndex={0}
          hidden={tab.id !== selected}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}

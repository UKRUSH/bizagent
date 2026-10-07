import type { Question } from "@/content/types";
import { ChevronDownIcon } from "./icons";

/**
 * FAQ accordion built on native <details>/<summary>: keyboard and screen-reader support
 * come from the browser, and answers are present in the server-rendered HTML.
 */
export function FaqList({ questions }: { questions: Question[] }) {
  return (
    <div className="faq-list">
      {questions.map((item) => (
        <details key={item.question} className="faq-item">
          <summary className="faq-trigger">
            <span>{item.question}</span>
            <ChevronDownIcon className="faq-chevron" width="20" height="20" />
          </summary>
          <div className="faq-panel">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

// utils.js
// Small helper functions used in many places

// "2026-07-24T10:00:00.000Z"  becomes  "July 24, 2026"
export function formatDate(dateText) {
  const date = new Date(dateText);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

// Cuts long text and adds "..." at the end
export function shortText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + "...";
}

// Splits blog content into paragraphs (wherever there is an empty line)
export function splitParagraphs(text) {
  const parts = text.split("\n\n");
  const paragraphs = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();

    if (part !== "") {
      paragraphs.push(part);
    }
  }

  return paragraphs;
}

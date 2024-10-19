import { JSONOutput } from "typedoc";

export const getStatusIcon = (reflection: JSONOutput.SomeReflection) => {
  const { comment } = reflection;

  if (!comment) return "";

  const tags = (comment.blockTags || []).map((blockTag) => blockTag.tag);

  if (tags.includes("@new")) {
    return "🆕 ";
  }
  if (tags.includes("@alpha")) {
    return "⚠️ ";
  }
  if (tags.includes("@beta")) {
    return "🚧 ";
  }
  if (tags.includes("@experimental")) {
    return "🧪 ";
  }
  if (tags.includes("@deprecated")) {
    return "⛔️ ";
  }

  return ``;
};

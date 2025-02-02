import { JSONOutput } from "typedoc";

export const getReference = (reflectionsTree: JSONOutput.ProjectReflection[], reference: JSONOutput.ReferenceType) => {
  const { target, name } = reference;
  let reflectionMatch: JSONOutput.DeclarationReflection | undefined;
  if (typeof target === "number") {
    // First element is always current library so we are not mixing ids between
    reflectionsTree[0].children?.some((reflection) => {
      if (reflection.id === target) {
        reflectionMatch = reflection;
        return true;
      }
      return false;
    });
  } else if (name) {
    // If no ID found, we can try to look for a matching value in other monorepo packages
    const matches: JSONOutput.DeclarationReflection[] = [];
    reflectionsTree.forEach((tree) =>
      tree.children?.forEach((reflection) => {
        if (reflection.name === name) {
          matches.push(reflection);
          return true;
        }
        return false;
      }),
    );
    // If there are more matches, our result is not reliable
    if (matches.length === 1) {
      const [match] = matches;
      reflectionMatch = match;
    }
  }

  return reflectionMatch;
};

import { JSONOutput, ReflectionKind } from "typedoc";

import { getGenericParamsPreview } from "./generics.utils";
import { getTypePreview } from "./types.utils";

export const getSignature = (
  reflection: JSONOutput.SignatureReflection | JSONOutput.SomeReflection | JSONOutput.SomeType,
): JSONOutput.SignatureReflection | undefined => {
  // Methods
  if ("signatures" in reflection && reflection.signatures) {
    return reflection.signatures?.find((signature) => !!signature);
  }

  // Class / Function
  if ("children" in reflection && reflection.children) {
    return reflection.children?.find((child) =>
      [ReflectionKind.Constructor, ReflectionKind.CallSignature].includes(child.kind),
    )?.signatures?.[0];
  }

  // All Signature Reflections
  if (
    "kind" in reflection &&
    [
      ReflectionKind.SetSignature,
      ReflectionKind.GetSignature,
      ReflectionKind.IndexSignature,
      ReflectionKind.CallSignature,
      ReflectionKind.ConstructorSignature,
    ].includes(reflection.kind)
  ) {
    return reflection as JSONOutput.SignatureReflection;
  }

  return undefined;
};

export const getSignaturePreview = ({
  reflection,
  reflectionsTree,
  useArrow,
  hideName,
}: {
  reflection: JSONOutput.SignatureReflection;
  reflectionsTree: JSONOutput.ProjectReflection[];
  useArrow?: boolean;
  hideName?: boolean;
}): string => {
  const hasName = !hideName && reflection.name !== "__type";
  const isConstructor = reflection.kind === ReflectionKind.Constructor;

  const constructorName = !hasName && isConstructor ? `${reflection.flags?.isAbstract ? "abstract " : ""}new` : "";

  const name = hasName ? reflection.name : constructorName;

  const generics = getGenericParamsPreview({ generics: reflection.typeParameter });
  const params =
    reflection.parameters
      ?.map((param) => {
        const type = getTypePreview({ typeReflection: param.type, reflectionsTree });
        return `${param.flags?.isRest ? "..." : ""}${param.name}${param.flags?.isOptional ? "?" : ""}: ${type}`;
      })
      .join(", ") || "";

  return `${name}${generics}(${params})${useArrow ? " => " : ": "}${getTypePreview({ typeReflection: reflection.type, reflectionsTree })}`;
};
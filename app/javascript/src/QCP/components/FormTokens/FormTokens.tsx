import { useDataContext } from "@contexts/DataContext";
import React from "react";

export function FormTokens() {
  const { tokens } = useDataContext();

  return (
    <>
      <input
        id="authenticity_token"
        type="hidden"
        name="authenticity_token"
        value={tokens?.authenticityToken || ""}
      />
      <input
        id="journey_token"
        type="hidden"
        name="journey_token"
        value={tokens?.journeyToken || ""}
      />
    </>
  );
}

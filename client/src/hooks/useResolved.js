import { useState, useEffect } from "react";

function useResolved(...vals) {
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    setResolved(vals.every((v) => v !== undefined));
  }, [vals]);

  return resolved;
}

export default useResolved;

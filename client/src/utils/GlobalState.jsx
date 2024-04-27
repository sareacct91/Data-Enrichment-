import { createContext, useContext, useState } from "react";

const PaginationContext = createContext();
const { Provider } = PaginationContext;

function PaginationProvider({ ...props }) {
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);

  const value = { limit, offset, setLimit, setOffset };

  return <Provider value={value} {...props} />;
}

function usePaginationContext() {
  return useContext(PaginationContext);
}

export { PaginationProvider, usePaginationContext };

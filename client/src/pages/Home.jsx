import { useEffect, useState } from "react"
import Gallery from "../component/Gallery"
import SearchForm from "../component/SearchForm";
import fetchInternalAPI from "../helpers/fetchInternalAPI";
import { usePaginationContext } from "../utils/GlobalState";
import queryBuilder from "../helpers/queryBuilder";

export default function Home() {
  const { queryData, setQueryData, limit, offset } = usePaginationContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState({
    photos: [],
    pagination: {
      endIndex: 0,
      resLength: 0
    }
  });

  useEffect(() => {
    (async function() {
      if (queryData.submitted) {
        try {
          setLoading(true);
          const { photos, pagination } = await fetchInternalAPI(queryBuilder({...queryData, limit, offset}));
          setLoading(false);
          setResponse({ photos, pagination });
        } catch (err) {
          setError(err.error);
          setLoading(false);
          setQueryData({ ...queryData, submitted: false });
          setResponse({ photos: []});
        }
      }
    })();
  }, [queryData, setQueryData, limit, offset, error]);

  return (
    <div className="self-center">
      <h1>MetaPhoto</h1>
      <h2>Search</h2>
      <SearchForm />
      {response?.photos?.length ? (
        <Gallery
          {...response}
          loading={loading}
        />
      ) : error ? (
          <h3 className="mt-10 text-center text-4xl text-red-500">{error.message}</h3>
        ) : null}
    </div>
  )
}

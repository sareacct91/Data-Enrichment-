import { useEffect, useState } from "react"
import Gallery from "../component/Gallery"
import SearchForm from "../component/SearchForm";
import fetchInternalAPI from "../helpers/fetchInternalAPI";

export default function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({
    photos: [],
    pagination: {
      endIndex: 0,
      resLength: 0
    }
  });

  useEffect(() => {
    (async function() {
      if (query !== '') {
        setLoading(true);
        const { msg, pagination, photos } = await fetchInternalAPI(query)
        setLoading(false);
        setResponse({ photos, pagination });
        setQuery('');
      }
    })();
  }, [query]);

  return (
    <div className="self-center">
      <h1>MetaPhoto</h1>
      <h2>Search</h2>
      <SearchForm setQuery={setQuery} />
      {response.photos.length ? (
        <Gallery 
          {...response}
          loading={loading}
          setQuery={setQuery}
        />
      ) : null}
    </div>
  )
}

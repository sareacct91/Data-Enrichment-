import { useState } from "react";
import queryBuilder from "../../helpers/queryBuilder";
import { usePaginationContext } from "../../utils/GlobalState";

export default function SearchForm({ setQuery }) {
  const emptyForm = {
    photoId: '',
    title: '',
    albumTitle: '',
    email: '',
  };
  const { limit, offset, setLimit } = usePaginationContext();

  const [formData, setFormData] = useState({ ...emptyForm });

  /** @param {Event} e  */
  function handleInput(e) {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value})
  }

  /** @param {Event} e  */
  function formSubmit(e) {
    e.preventDefault();
    setQuery(queryBuilder({...formData, limit, offset}));
    setFormData({ ...emptyForm });
  }

  return (
    <form
      className="flex flex-col"
      onSubmit={formSubmit}
    >
      <label htmlFor="photoId">Photo ID:</label>
      <input
        type="text"
        name="photoId"
        value={formData.photoId}
        onChange={handleInput}
      />
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInput}
      />
      <label htmlFor="albumTitle">Album Title</label>
      <input
        type="text"
        name="albumTitle"
        value={formData.albumTitle}
        onChange={handleInput}
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleInput}
      />
      <label htmlFor="limit">Limit</label>
      <input
        type="text"
        name="limit"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
      />
      {/* <label htmlFor="offset">offset</label>
      <input
        type="text"
        name="offset"
        value={formData.offset}
        onChange={handleInput}
      /> */}
      <button type="submit">Search</button>
    </form>
  )
}

import { useState } from 'react';
import queryBuilder from '../../helpers/queryBuilder';
import { usePaginationContext } from '../../utils/GlobalState';

export default function SearchForm() {
  const emptyForm = {
    photoId: '',
    title: '',
    albumTitle: '',
    email: '',
    limit: 25,
  };
  const [formData, setFormData] = useState({ ...emptyForm });
  const { limit, setLimit, setQueryData } =
    usePaginationContext();

  /** @param {Event} e  */
  function handleInput(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  /** @param {Event} e  */
  function formSubmit(e) {
    e.preventDefault();
    setQueryData({ ...formData, submitted: true });
    setLimit(formData.limit);
    setFormData({ ...emptyForm });
  }

  return (
    <form className="flex flex-col" onSubmit={formSubmit}>
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
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInput}
      />
      <label htmlFor="limit">Limit</label>
      <input
        type="text"
        name="limit"
        value={formData.limit}
        onChange={handleInput}
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
  );
}

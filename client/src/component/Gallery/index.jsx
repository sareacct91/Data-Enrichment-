import PaginationButton from "../PaginationButton";
import Photo from "../Photo";

export default function Gallery({ photos, pagination, loading }) {
  console.log(pagination)

  return (
    <div>
      <h1>Gallary</h1>
      <PaginationButton {...pagination} />
      <div className="flex flex-col flex-wrap items-center justify-center gap-4 lg:flex-row">
        { loading ? (
          <p>Loading...</p>
        ) : (
          photos.map(photo => (
            <Photo key={photo.id} {...photo}  />
            ))
          )}
      </div>
    </div>
  )
}

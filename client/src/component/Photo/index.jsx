export default function Photo(props) {
  const { id, album, thumbnailUrl, title, url} = props;
  const { user } = album;

  return (
    <div className="m-3 max-w-sm overflow-hidden rounded bg-gray-800 p-2 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl">
      <img
        src={url}
        alt={title}
        className="w-full"
      />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold text-white">{title}</div>
        <p className="text-base text-gray-300">
          Album Title: {album.title}
        </p>
        <p className="text-xs text-gray-400">
          Name: {user.name}
        </p>
        <p className="text-xs text-gray-400">
          Username: {user.username}
        </p>
        <p className="text-xs text-gray-400">
          Email: {user.email}
        </p>
        <p className="text-xs text-gray-400">
          Phone: {user.phone}
        </p>
        <p className="text-xs text-gray-400">
          Website: {user.website}
        </p>
        <h3 className="mt-1">Address: </h3>
        <div className="pl-4">
          <p className="text-xs text-gray-400">
            {user.address.street} {user?.address.suite}
          </p>
          <p className="text-xs text-gray-400">
            {user.address.city}, {user.address.zipcode}
          </p>
        </div>
        <h3>Compnay: </h3>
        <div className="pl-4">
          <p className="text-xs text-gray-400">
            <span className="font-semibold text-gray-300">Name:</span> {user.company.name} 
          </p>
          <p className="text-xs text-gray-400">
            <span className="font-semibold text-gray-300">Catch Phrase:</span> {user.company.catchPhrase} 
          </p>
          <p className="text-xs text-gray-400">
            <span className="font-semibold text-gray-300">Bs: </span>{user.company.bs} 
            Bs: {user.company.bs} 
          </p>
        </div>
      </div>
    </div>
  )
}

const MyCard = ({ user }) => {
  const {
    firstName,
    lastName,
    photoUrl,
    gender,
    age,
    height,
  } = user;

  return (
    user && (
      <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
        {/* User Image */}
        <img
          src={photoUrl || "https://via.placeholder.com/400x400?text=No+Image"}
          alt="User"
          className="w-full h-full object-cover"
        />

        {/* Overlay Info */}
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white p-4">
          <h2 className="text-xl font-semibold">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p className="text-sm mb-1">
              {age}, {gender.toUpperCase()}
            </p>
          )}
          <p className="text-sm">Location: {user.location || "Not specified"}</p>
          {height && <p className="text-sm mt-1">Height: {height} cm</p>}
        </div>
      </div>
    )
  );
};

export default MyCard;

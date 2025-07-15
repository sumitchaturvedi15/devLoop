const MyCard = ({ user }) => {
  const {
    firstName,
    lastName,
    photoUrl,
    skills,
    languages,
    about,
    gender,
    age,
    height,
  } = user;

  return (
    user && (
      <div className="relative w-full h-full rounded-none overflow-hidden">
        
        <img
          src={photoUrl || "https://via.placeholder.com/400x400?text=No+Image"}
          alt="User"
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white p-4">
          <h2 className="text-xl font-semibold">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p className="text-sm mb-1">
              {age}, {gender.toUpperCase()}
            </p>
          )}
          {Array.isArray(skills) && skills.length > 0 && (
            <p className="text-sm mt-1">
              <strong>Skills:</strong> {skills.map((s, i) => (
                <span key={i}>{s.toUpperCase()}{i < skills.length - 1 ? ', ' : ''}</span>
              ))}
            </p>
          )}
          {Array.isArray(languages) && languages.length > 0 && (
            <p className="text-sm">
              <strong>Languages:</strong> {languages.map((l, i) => (
                <span key={i}>{l.toUpperCase()}{i < languages.length - 1 ? ', ' : ''}</span>
              ))}
            </p>
          )}
          {about && <p className="text-sm mt-1">{about}</p>}
          {height && <p className="text-sm mt-1">Height: {height} cm</p>}
        </div>
      </div>
    )
  );
};

export default MyCard;
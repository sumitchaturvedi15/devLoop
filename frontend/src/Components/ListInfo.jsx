import React from 'react';

const ListInfo = ({ label, list = [], subTitle = false, isLink = false }) => {
  if (!list || list.length === 0) return null;

  return (
    <div className="mb-4">
      <p className={`text-sm font-semibold ${subTitle ? 'text-xl text-gray-800' : 'text-gray-600'}`}>
        {label}
      </p>
      <ul className="list-disc list-inside text-gray-800">
        {list.map((item, index) => {
          const name = typeof item === 'string' ? item : item.name;
          const link = typeof item === 'string' ? item : item.link;

          return isLink ? (
            <li key={index}>
              <a
                href={link}
                className="text-blue-600 underline break-words"
                target="_blank"
                rel="noopener noreferrer"
              >
                {name}
              </a>
            </li>
          ) : (
            <li key={index}>{name}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListInfo;

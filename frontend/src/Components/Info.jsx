import React from 'react'

const Info = ({ label, value }) => (
  <div className="mb-3">
    <p className="text-sm text-gray-600 font-semibold">{label}</p>
    <p className="text-base text-gray-800">{value}</p>
  </div>
);

export default Info
import React from 'react';
import ContentLoader from 'react-content-loader';

export default function LoadingBlock() {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={457}
      viewBox="0 0 280 457"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <circle cx="140" cy="125" r="125" />
      <rect x="0" y="265" rx="6" ry="6" width="280" height="24" />
      <rect x="0" y="309" rx="6" ry="6" width="280" height="84" />
      <rect x="0" y="422" rx="6" ry="6" width="93" height="27" />
      <rect x="129" y="413" rx="25" ry="25" width="151" height="44" />
    </ContentLoader>
  );
}

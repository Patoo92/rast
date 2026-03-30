import React from 'react';
import './Skeleton.css';

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-header">
      <div className="skeleton-badge"></div>
      <div className="skeleton-text skeleton-title"></div>
    </div>
    <div className="skeleton-body">
      <div className="skeleton-text skeleton-text-lg"></div>
      <div className="skeleton-text skeleton-text-sm"></div>
      <div className="skeleton-text skeleton-text-sm"></div>
      <div className="skeleton-text skeleton-text-sm" style={{ width: '60%' }}></div>
    </div>
    <div className="skeleton-timeline">
      <div className="skeleton-dot"></div>
      <div className="skeleton-dot"></div>
      <div className="skeleton-dot"></div>
    </div>
  </div>
);

export const SkeletonLoaders = ({ count = 2 }) => (
  <div className="skeleton-loading">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

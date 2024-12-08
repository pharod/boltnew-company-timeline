import React from 'react';

type JobTitleProps = {
  title: string;
  onJobOpeningClick?: (title: string) => void;
};

const JobTitle: React.FC<JobTitleProps> = ({ title, onJobOpeningClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onJobOpeningClick?.(title);
  };

  return (
    <button
      onClick={handleClick}
      className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
    >
      {title}
    </button>
  );
};

export default JobTitle;
import React from 'react';

type ProjectNameProps = {
  project: string;
  onProjectClick: (project: string) => void;
};

const ProjectName: React.FC<ProjectNameProps> = ({ project, onProjectClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onProjectClick(project);
  };

  return (
    <button
      onClick={handleClick}
      className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
    >
      {project}
    </button>
  );
}

export default ProjectName;
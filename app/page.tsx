import React from 'react';
import { fetchAllProjects } from '@/lib/action';
import { ProjectInterface } from '@/common.type';
import ProjectCard from '@/components/ProjectCard';
import Categories from '@/components/Categories';
import LoadMore from '@/components/LoadMore';

type ProjectsSearch = {
  [x: string]: any;
  edges: { node: ProjectInterface }[];
  pageInfo: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startCursor: string;
    endCursor: string;
  };
};

const Home = async () => {
  const data = (await fetchAllProjects()) as ProjectsSearch;
  const projectToDisplay = data?.projectSearch?.edges || [];
  if (projectToDisplay.length === 0) {
    <section className="flexStart flex-col paddings">
      <h1>Categories</h1>
      <p className="no-reslut-text text center">
        Sorry, There is no post. Please Create a new one
      </p>
    </section>;
  }

  return (
    <section className="flex flex-start flex-col paddings mx-16">
      <Categories />
      <section className="projects-grid">
        {projectToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={`${node?.id}`}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy.name}
            avatarUrl={node?.createdBy.avatarUrl}
            userId={node?.createdBy.id}
          />
        ))}
      </section>
      <LoadMore
        startCursor={data?.projectSearch?.pageInfo?.startCursor}
        endCursor={data?.projectSearch?.pageInfo?.endCursor}
        hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage}
        hasNextPage={data?.projectSearch?.pageInfo.hasNextPage}
      />
    </section>
  );
};

export default Home;

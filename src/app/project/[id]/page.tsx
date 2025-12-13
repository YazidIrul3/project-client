import ProjectPage from "@/features/dashboard/project/pages/ProjectPage";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  console.log(params?.id);

  return <ProjectPage />;
};

export default Page;

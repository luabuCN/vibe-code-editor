
import { getAllPlaygroundForUser } from "@/featrues/dashboard/actions";
import AddNewButton from "@/featrues/dashboard/components/add-new-btn";
import AddRepoButton from "@/featrues/dashboard/components/add-repo-btn";
import ProjectTable from "@/featrues/dashboard/components/project-table";


const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <img src="/empty-state.svg" alt="暂无项目" className="w-48 h-48 mb-4" />
    <h2 className="text-xl font-semibold text-gray-500">暂无项目</h2>
    <p className="text-gray-400">创建一个新项目开始吧！</p>
  </div>
);

const DashboardMainPage = async () => {
  const playgrounds = await getAllPlaygroundForUser();
  return (
    <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <AddNewButton />
        <AddRepoButton />
      </div>
      <div className="mt-10 flex flex-col justify-center items-center w-full">
        {playgrounds && playgrounds.length === 0 ? (
          <EmptyState />
        ) : (
          
          <ProjectTable
            projects={playgrounds || []}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardMainPage;
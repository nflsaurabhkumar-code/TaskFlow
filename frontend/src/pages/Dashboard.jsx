import useDashboard from "../hooks/useDashboard";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import Notice from "../components/dashboard/Notice";
import EmptyWorkspace from "../components/dashboard/EmptyWorkspace";
import WorkspaceBar from "../components/dashboard/WorkspaceBar";
import StatsGrid from "../components/dashboard/StatsGrid";
import ProjectsPanel from "../components/dashboard/ProjectsPanel";
import TasksPanel from "../components/dashboard/TasksPanel";

export default function Dashboard() {
  const d = useDashboard();
  const hasNoWorkspace = !d.orgLoading && d.organizations.length === 0;

  return (
    <div className="app-shell">
      <Sidebar user={d.user} onLogout={d.handleLogout} />

      <main className="main-content" id="overview">
        <Topbar user={d.user} />
        <Notice message={d.notice} onClose={() => d.setNotice("")} />

        {hasNoWorkspace ? (
          <EmptyWorkspace
            orgName={d.orgName}
            onOrgNameChange={d.setOrgName}
            onSubmit={d.handleCreateOrganization}
          />
        ) : (
          <>
            <WorkspaceBar
              organizations={d.organizations}
              activeOrgId={d.activeOrgId}
              onSelectOrg={d.setOrganizationId}
              orgName={d.orgName}
              onOrgNameChange={d.setOrgName}
              onCreateOrg={d.handleCreateOrganization}
            />

            <StatsGrid stats={d.stats} />

            <section className="content-grid">
              <ProjectsPanel
                projects={d.projects}
                projectName={d.projectName}
                onProjectNameChange={d.setProjectName}
                onCreateProject={d.handleCreateProject}
              />
              <TasksPanel
                tasks={d.tasks}
                projects={d.projects}
                taskTitle={d.taskTitle}
                onTaskTitleChange={d.setTaskTitle}
                selectedProject={d.selectedProject}
                onSelectProject={d.setSelectedProject}
                onCreateTask={d.handleCreateTask}
                onChangeStatus={d.changeStatus}
                onDeleteTask={d.removeTask}
              />
            </section>
          </>
        )}

        <footer className="footer-note">
          Made for focused teams · TaskFlow
        </footer>
      </main>
    </div>
  );
}

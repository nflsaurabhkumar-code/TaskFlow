import { useMemo, useState } from "react";
import { useGetMeQuery, useLogoutMutation } from "../services/authApi";
import {
  useGetOrganizationsQuery,
  useCreateOrganizationMutation,
} from "../services/organizationApi";
import {
  useGetProjectsQuery,
  useCreateProjectMutation,
} from "../services/projectApi";
import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../services/taskApi";

// All the data and actions of the dashboard live here.
// Dashboard.jsx only shows the screen, the logic stays in this hook.
export default function useDashboard() {
  // ---------- API hooks ----------
  const { data: meData } = useGetMeQuery();
  const { data: orgData, isLoading: orgLoading } = useGetOrganizationsQuery();
  const [logout] = useLogoutMutation();
  const [createOrganization] = useCreateOrganizationMutation();
  const [createProject] = useCreateProjectMutation();
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  // ---------- Data ----------
  const user = meData?.data?.user;
  const organizations = orgData?.data?.organizations || [];

  const [organizationId, setOrganizationId] = useState("");
  const activeOrgId = organizationId || organizations[0]?._id;

  const { data: projectData } = useGetProjectsQuery(activeOrgId, {
    skip: !activeOrgId,
  });
  const projects = projectData?.data?.projects || [];

  const { data: taskData } = useGetTasksQuery(
    { organizationId: activeOrgId },
    { skip: !activeOrgId },
  );
  const tasks = taskData?.data?.tasks || [];

  // ---------- Form state ----------
  const [orgName, setOrgName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [notice, setNotice] = useState("");

  const stats = useMemo(
    () => ({
      total: tasks.length,
      inProgress: tasks.filter((task) => task.status === "in_progress").length,
      done: tasks.filter((task) => task.status === "done").length,
    }),
    [tasks],
  );

  // ---------- Actions ----------
  async function handleCreateOrganization(event) {
    event.preventDefault();
    try {
      const result = await createOrganization({ name: orgName }).unwrap();
      setOrganizationId(result.data.organization._id);
      setOrgName("");
      setNotice("Organization created successfully");
    } catch (error) {
      setNotice(error?.data?.message || "Could not create organization");
    }
  }

  async function handleCreateProject(event) {
    event.preventDefault();
    try {
      await createProject({
        organizationId: activeOrgId,
        name: projectName,
      }).unwrap();
      setProjectName("");
      setNotice("Project created");
    } catch (error) {
      setNotice(error?.data?.message || "Could not create project");
    }
  }

  async function handleCreateTask(event) {
    event.preventDefault();
    try {
      await createTask({
        organizationId: activeOrgId,
        project: selectedProject || projects[0]?._id,
        title: taskTitle,
      }).unwrap();
      setTaskTitle("");
      setNotice("Task created");
    } catch (error) {
      setNotice(error?.data?.message || "Could not create task");
    }
  }

  async function changeStatus(task, status) {
    try {
      await updateTask({
        organizationId: activeOrgId,
        taskId: task._id,
        status,
      }).unwrap();
    } catch (error) {
      setNotice(error?.data?.message || "Could not update task");
    }
  }

  async function removeTask(taskId) {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTask({ organizationId: activeOrgId, taskId }).unwrap();
      setNotice("Task deleted");
    } catch (error) {
      setNotice(error?.data?.message || "Could not delete task");
    }
  }

  async function handleLogout() {
    await logout();
    window.location.href = "/login";
  }

  return {
    user,
    organizations,
    orgLoading,
    activeOrgId,
    setOrganizationId,
    projects,
    tasks,
    stats,
    orgName,
    setOrgName,
    projectName,
    setProjectName,
    taskTitle,
    setTaskTitle,
    selectedProject,
    setSelectedProject,
    notice,
    setNotice,
    handleCreateOrganization,
    handleCreateProject,
    handleCreateTask,
    changeStatus,
    removeTask,
    handleLogout,
  };
}

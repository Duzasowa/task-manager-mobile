export interface Task {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
}

export type RootStackParamList = {
  TaskList: undefined;
  TaskForm: { taskId?: string };
  TaskDetails: { taskId: string };
  NotFound: undefined;
};

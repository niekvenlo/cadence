import CadencePage from "./CadencePage";

import { getTasks } from "./api/data-access";

export default async function Home() {
  const tasks = await getTasks();
  return <CadencePage initialTasks={tasks} />;
}

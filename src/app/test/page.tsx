import { createAsyncCaller } from '#server/routers';

export default async function Test() {
  const trpc = await createAsyncCaller();
  const users = await trpc.test.getUsers();

  return <div>{users}</div>;
}

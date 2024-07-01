import Page from "./ShoppingPage";

import { fetchShoppingList } from "../api/data-access";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function Home() {
  const shoppingList = await fetchShoppingList();
  return <Page initialList={shoppingList} />;
}

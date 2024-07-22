import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSearch() {
  const searchString = decodeURI(
    useSearchParams()?.toString().slice(0, -1) || ""
  );
  const router = useRouter();
  const pathname = usePathname();
  const setSearchString = (string: string) =>
    router.push(pathname + "?" + string);
  return [searchString, setSearchString] as const;
}

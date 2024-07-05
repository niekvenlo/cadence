import { useQuery } from "@tanstack/react-query";

import { fetchWeather } from "./data-access";
import { transformWeather } from "./data-transform";
import { Task } from "../types";

const useWeatherQuery = (initialData?: Task[]) =>
  useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
    select: transformWeather,
    initialData,
    staleTime: 1000,
  });

export default useWeatherQuery;

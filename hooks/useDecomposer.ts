import { useMemo } from "react";
import { Decomposer, ResourceWithAmount } from "../data/Decomposer";
import { getResourceFromResourceId } from "../data/helper";
import { CraftList } from "../pages";

export function useDecomposer(craftList: CraftList) {
  return useMemo(() => {
    const decomposer = new Decomposer();

    const paths = craftList.reduce((paths, { amount, craftId }) => {
      paths.push(
        decomposer.getPathToResource(getResourceFromResourceId(craftId), amount)
      );
      return paths;
    }, [] as ResourceWithAmount[]);

    const resourceList = paths.reduce((acc, path) => {
      acc.push(...decomposer.getResourceListFromPath(path));
      return acc;
    }, [] as ResourceWithAmount[]);

    return { paths, resourceList: decomposer.mergeDuplicates(resourceList) };
  }, [craftList]);
}

"use client";

import { useRouter } from "next/navigation";

import Button from "./Button";

type Props = {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

const LoadMore = ({
  startCursor,
  endCursor,
  hasNextPage,
  hasPreviousPage,
}: Props) => {
  const router = useRouter();

  const handleNavigation = (type: string) => {
    const currentParams = new URLSearchParams("window.location.search");

    if (type === "prev" && hasPreviousPage) {
      currentParams.delete("endcursor");
      currentParams.set("startcursor", startCursor);
    } else if (type === "next" && hasNextPage) {
      currentParams.delete("startcursor");
      currentParams.set("endcursor", endCursor);
    }

    const newSearchParams = currentParams.toString();
    const newPathname = `${window.location.pathname}?${newSearchParams}`;

    router.push(newPathname);
  };

  return (
    <div className="w-full flexCenter gap-5 mt-10">
      {hasPreviousPage && (
        <Button
          title="First Page"
          handleClick={() => handleNavigation("prev")}
        />
      )}

      {hasNextPage && (
        <Button
          title="Next Page"
          handleClick={() => handleNavigation("next")}
        />
      )}
    </div>
  );
};

export default LoadMore;

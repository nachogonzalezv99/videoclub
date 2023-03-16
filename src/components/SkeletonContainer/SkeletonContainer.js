import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonContainer({ isLoading = "false", children, ...props }) {
  if (isLoading) {
    return <Skeleton {...props} />;
  } else {
    return children;
  }
}
export { SkeletonContainer };

import { useGetSingleUser } from "@/features/users/hooks/useGetSingleUser";
import { Avatar, AvatarImage } from "@/shared/components/ui/avatar";
import { Skeleton } from "@/shared/components/ui/skeleton";
// import { Spinner } from "@/shared/components/ui/spinner";
import { useParams } from "react-router";

const UserInfo = () => {
  const { id } = useParams<{ id: string }>();

  const { data: currentUser, isPending } = useGetSingleUser(+id!);

  //   if (isPending)
  //     return (
  //       <div>
  //         <Spinner />
  //       </div>
  //     );

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2">
          {isPending ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : (
            <Avatar className="ring-2 ring-gray-300 rounded-full p-1 bg-gray-200">
              <AvatarImage
                src={currentUser?.image}
                alt={currentUser?.firstName}
                height={30}
                width={30}
                className="rounded-full"
              />
            </Avatar>
          )}

          <div className="flex flex-col gap-1">
            {isPending ? (
              <Skeleton className="h-4 w-28" />
            ) : (
              <h3 className="text-xl font-bold text-gray-800">
                {currentUser?.firstName} {currentUser?.lastName}
              </h3>
            )}

            {isPending ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              <span className="text-sm font-normal text-gray-500">
                {currentUser?.email}
              </span>
            )}
          </div>
        </div>

        <div>
          {isPending ? (
            <Skeleton className="h-4 w-16" />
          ) : (
            <span className="underline text-base font-medium">
              {currentUser?.role}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

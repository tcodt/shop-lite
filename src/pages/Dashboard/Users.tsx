import { useAddUser } from "@/features/users/hooks/useAddUser";
import { useGetAllUsers } from "@/features/users/hooks/useGetAllUsers";
import { useGetUsersPaginated } from "@/features/users/hooks/useGetUsersPaginated";
import { Badge } from "@/shared/components/ui/badge";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/shared/components/ui/item";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import { Separator } from "@/shared/components/ui/separator";
import { Spinner } from "@/shared/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Plus, Search } from "lucide-react";
import { useMemo, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Link } from "react-router";

interface AddUserType {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const Users = () => {
  const { data, isPending } = useGetAllUsers();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const { data: usersPaginationData } = useGetUsersPaginated(page, search);
  const addUserMutation = useAddUser();

  const totalPages = usersPaginationData
    ? Math.ceil(usersPaginationData.total / usersPaginationData.limit)
    : 1;

  const PAGINATION_RANGE = 2;

  const startPage = Math.max(1, page - PAGINATION_RANGE);
  const endPage = Math.min(totalPages, page + PAGINATION_RANGE);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const filteredUsers = useMemo(() => {
    if (!data?.users) return [];
    if (!searchQuery.trim()) return data.users;

    const query = searchQuery.toLowerCase().trim();

    return data?.users.filter((user) => {
      return (
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.company.name.toLowerCase().includes(query) ||
        user.company.department.toLowerCase().includes(query) ||
        user.address.city.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query) ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(query)
      );
    });
  }, [data?.users, searchQuery]);

  const handleSearchUser = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const displayUsers = searchQuery ? filteredUsers : data?.users || [];

  const maleCount =
    displayUsers.filter((user) => user.gender === "male")?.length ?? 0;
  const femaleCount =
    displayUsers.filter((user) => user.gender === "female")?.length ?? 0;
  const adminCount =
    displayUsers.filter((user) => user.role === "admin")?.length ?? 0;
  const moderatorCount =
    displayUsers.filter((user) => user.role === "moderator")?.length ?? 0;

  const handleAddUserForm = (data: AddUserType) => {
    if (!data.username || !data.email || !data.password) {
      return toast.error("Please fill in all required fields.");
    }

    addUserMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Users Dashboard
          </h2>
          <p className="text-sm font-normal text-gray-500">
            All the users will display here
          </p>
        </div>
        <div>
          <Dialog>
            <Tooltip>
              <DialogTrigger asChild>
                <TooltipTrigger asChild>
                  <Button className="rounded-full cursor-pointer">
                    <Plus />
                  </Button>
                </TooltipTrigger>
              </DialogTrigger>

              <TooltipContent>
                <p>Add new user</p>
              </TooltipContent>
            </Tooltip>

            <DialogContent className="bg-gray-100">
              <DialogHeader>
                <DialogTitle>Add new user</DialogTitle>
              </DialogHeader>

              {/* Add user form */}
              <form
                onSubmit={handleSubmit(handleAddUserForm)}
                className="grid grid-cols-12 gap-4"
              >
                <Input
                  type="text"
                  placeholder="Username"
                  className="bg-white col-span-6 text-sm font-medium text-gray-800"
                  {...register("username")}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-white col-span-6 text-sm font-medium text-gray-800"
                  {...register("email")}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="bg-white col-span-10 text-sm font-medium text-gray-800"
                  {...register("password")}
                />
                <Button
                  type="button"
                  variant={"outline"}
                  className="cursor-pointer col-span-2"
                  onClick={togglePassword}
                >
                  {showPassword ? <LuEyeClosed /> : <LuEye />}
                </Button>
                <Input
                  type="text"
                  placeholder="First Name"
                  className="bg-white col-span-6 text-sm font-medium text-gray-800"
                  {...register("firstName")}
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  className="bg-white col-span-6 text-sm font-medium text-gray-800"
                  {...register("lastName")}
                />

                <Button
                  type="submit"
                  size={"lg"}
                  className="col-span-full cursor-pointer"
                >
                  Add
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Separator orientation="horizontal" className="my-8" />

      <div>
        <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-4 sm:gap-2">
          <div className="flex flex-row flex-wrap gap-2">
            <Badge variant={"default"}>
              {isPending ? (
                <>
                  <Spinner /> Loading
                </>
              ) : (
                `${data?.users.length} total users`
              )}
            </Badge>
            <Badge variant={"outline"} className="bg-white">
              {maleCount} Male
            </Badge>
            <Badge variant={"outline"} className="bg-white">
              {femaleCount} Female
            </Badge>
            <Badge variant={"outline"} className="bg-white">
              {adminCount} Admin
            </Badge>
            <Badge variant={"outline"} className="bg-white">
              {moderatorCount} Moderator
            </Badge>
          </div>

          <InputGroup className="rounded-full bg-white">
            <InputGroupInput
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearchUser}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* Add Modal */}

        {/* Search results info */}
        {searchQuery && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredUsers.length} results for "{searchQuery}"
            <button
              onClick={() => setSearchQuery("")}
              className="ml-2 text-gray-700 hover:text-gray-800 underline"
            >
              Clear search
            </button>
          </div>
        )}

        <div className="grid grid-cols-12 gap-4 mt-8 auto-rows-max">
          {isPending ? (
            <div className="col-span-full flex justify-center py-8">
              <Spinner />
            </div>
          ) : filteredUsers.length === 0 && searchQuery ? (
            <div className="col-span-full text-center text-gray-500 py-8">
              No users found matching "{searchQuery}"
            </div>
          ) : (
            usersPaginationData &&
            usersPaginationData.users.map((user) => (
              <Link
                to={`/dashboard/users/${user.id}`}
                key={user.id}
                className="sm:col-span-4 col-span-full w-full bg-white"
              >
                <Item variant={"outline"}>
                  <ItemHeader>{user.role}</ItemHeader>
                  <ItemMedia>
                    <Avatar className="ring-2 ring-gray-300 rounded-full p-1 bg-gray-200">
                      <AvatarImage
                        src={user.image}
                        alt={user.firstName}
                        height={50}
                        width={50}
                        className="rounded-full"
                      />
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{user.firstName}</ItemTitle>
                    <ItemDescription>
                      {user.firstName} {user.lastName}
                    </ItemDescription>
                  </ItemContent>
                </Item>
              </Link>
            ))
          )}
        </div>

        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={buttonVariants({ variant: "outline" })}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
              />
            </PaginationItem>

            {startPage > 1 && (
              <>
                <PaginationItem>
                  <PaginationLink onClick={() => setPage(1)}>1</PaginationLink>
                </PaginationItem>
                <span className="px-2">...</span>
              </>
            )}

            {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
              const pageNumber = startPage + index;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    className="cursor-pointer"
                    isActive={page === pageNumber}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {endPage < totalPages && (
              <>
                <span className="px-2">...</span>
                <PaginationItem>
                  <PaginationLink onClick={() => setPage(totalPages)}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                className={buttonVariants({ variant: "outline" })}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Users;

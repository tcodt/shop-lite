import { useGetAllUsers } from "@/features/users/hooks/useGetAllUsers";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
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

const Users = () => {
  const { data, isPending } = useGetAllUsers();
  const [searchQuery, setSearchQuery] = useState<string>("");

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
          <Tooltip>
            <TooltipTrigger>
              <Button className="rounded-full cursor-pointer">
                <Plus />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add new user</p>
            </TooltipContent>
          </Tooltip>
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
            <Badge variant={"outline"}>{maleCount} Male</Badge>
            <Badge variant={"outline"}>{femaleCount} Female</Badge>
            <Badge variant={"outline"}>{adminCount} Admin</Badge>
            <Badge variant={"outline"}>{moderatorCount} Moderator</Badge>
          </div>

          <InputGroup className="rounded-full">
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

        <div className="grid grid-cols-12 gap-4 mt-8">
          {isPending ? (
            <div className="col-span-full flex justify-center py-8">
              <Spinner />
            </div>
          ) : filteredUsers.length === 0 && searchQuery ? (
            <div className="col-span-full text-center text-gray-500 py-8">
              No users found matching "{searchQuery}"
            </div>
          ) : (
            displayUsers.map((user) => (
              <Item
                variant={"outline"}
                className="sm:col-span-4 col-span-full w-full"
              >
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;

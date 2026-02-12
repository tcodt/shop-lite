import { useParams } from "react-router";
import { useGetSingleUser } from "@/features/users/hooks/useGetSingleUser";
import { useGetUserCarts } from "@/features/users/hooks/useGetUserCarts";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Separator } from "@/shared/components/ui/separator";
import { Mail, ShoppingCart } from "lucide-react";

const UserInfo = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  const { data: currentUser, isPending } = useGetSingleUser(numericId);
  const { data: currentUserCarts, isPending: cartsPending } =
    useGetUserCarts(numericId);

  if (!id || isNaN(numericId)) {
    return (
      <div className="p-6 text-center text-muted-foreground">Not Found!</div>
    );
  }

  const products = currentUserCarts?.carts?.flatMap((c) => c.products) || [];

  return (
    <div className="space-y-8 p-6">
      {/* USER HEADER */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            {isPending ? (
              <Skeleton className="h-16 w-16 rounded-full" />
            ) : (
              <Avatar className="h-16 w-16 ring-2 ring-muted">
                <AvatarImage
                  src={currentUser?.image}
                  alt={currentUser?.firstName}
                />
                <AvatarFallback>
                  {currentUser?.firstName?.[0]}
                  {currentUser?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
            )}

            <div className="space-y-1">
              {isPending ? (
                <Skeleton className="h-5 w-40" />
              ) : (
                <h2 className="text-2xl font-bold leading-none">
                  {currentUser?.firstName} {currentUser?.lastName}
                </h2>
              )}

              {isPending ? (
                <Skeleton className="h-4 w-56" />
              ) : (
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Mail className="h-4 w-4" />
                  {currentUser?.email}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isPending ? (
              <Skeleton className="h-6 w-20" />
            ) : (
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {currentUser?.role}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* USER META INFO */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">User Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
          {isPending ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))
          ) : (
            <>
              <p>
                <span className="font-medium">Username:</span>{" "}
                {currentUser?.username}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {currentUser?.phone}
              </p>
              <p>
                <span className="font-medium">Age:</span> {currentUser?.age}
              </p>
              <p>
                <span className="font-medium">Gender:</span>{" "}
                {currentUser?.gender}
              </p>
              <p>
                <span className="font-medium">University:</span>{" "}
                {currentUser?.university}
              </p>
              <p>
                <span className="font-medium">Company:</span>{" "}
                {currentUser?.company?.name}
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {/* PRODUCTS */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="h-5 w-5" />
          <h3 className="text-xl font-semibold">Purchased Products</h3>
        </div>

        {cartsPending ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="p-4 space-y-4">
                <Skeleton className="h-32 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </Card>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <Card
                key={p.id}
                className="rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader className="p-4">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="h-32 object-contain mx-auto"
                  />
                  <CardTitle className="text-base line-clamp-2">
                    {p.title}
                  </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="p-4 text-sm space-y-2">
                  <p className="font-medium text-green-600">${p.price}</p>
                  <p>
                    Qty:{" "}
                    <span className="text-muted-foreground">{p.quantity}</span>
                  </p>
                  <p>
                    Total:{" "}
                    <span className="text-green-600 font-medium">
                      ${p.total.toFixed(2)}
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            This user has no carts yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserInfo;

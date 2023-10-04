import AdminCheckbox from "@/components/users/AdminCheckbox";
import { prisma } from "@/prisma";
import Image from "next/image";

export default async function page({ searchParams }) {
  const users = await prisma.user.findMany({});

  return (
    <div className="space-y-10 mt-10">
      <div className="text-2xl md:text-4xl px-20">Users</div>
      <div className="px-10 space-y-5">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex w-full justify-between items-center bg-white p-5 rounded-lg"
          >
            <div className="flex items-center gap-5">
              <Image
                src={user.image}
                alt={user.name}
                height={40}
                width={40}
                className="rounded-full"
              />
              <div>{user.name}</div>
            </div>
            <div>
              <AdminCheckbox defaultChecked={user.admin} id={user.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

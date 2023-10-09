"use client";

import { addToFavorites } from "@/actions";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function FavoritesButton({ propertyId }) {
  const [isPending, startTransition] = useTransition();
  const { data } = useSession();
  return (
    <button
      onClick={() =>
        // @ts-ignore
        startTransition(() => addToFavorites(data.user.id, propertyId))
      }
      className="text-white inline-flex justify-center absolute top-5 right-5 "
    >
      {false ? (
        <AiFillHeart className="text-3xl text-red-500" />
      ) : (
        <AiOutlineHeart className="text-3xl text-red-500" />
      )}
    </button>
  );
}

export default FavoritesButton;

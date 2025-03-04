import { auth } from "@clerk/nextjs/server";

const adminIds = [
  "user_2spL6BR9N3NP6fVA5wwI92XYPxA", // enaya's admin key
  "user_2tmZQJblZ06JaRM4Ni7eQx9WYht", // ryan's admin key
  "user_2tmWuyFwDXJxKa5TyIrGwV3rTn3", // evan's admin key
  "user_2trdYXHv7UXM4NJGUCgIwlG0ut2", // faisal's admin key
]

export const getIsAdmin = async () => {
  const { userId } = await auth();

  if (!userId){
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
}


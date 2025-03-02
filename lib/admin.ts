import { auth } from "@clerk/nextjs/server";

const adminIds = [
  "user_2spL6BR9N3NP6fVA5wwI92XYPxA",
]

export const getIsAdmin = async () => {
  const { userId } = await auth();

  if (!userId){
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
}


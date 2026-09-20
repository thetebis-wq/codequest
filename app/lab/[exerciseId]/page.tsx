import { redirect } from "next/navigation";

export default async function ExerciseDynamicRoute({
  params,
}: {
  params: Promise<{ exerciseId: string }>;
}) {
  const resolvedParams = await params;
  redirect(`/lab/scratchpad?exercise=${resolvedParams.exerciseId}`);
}

import { UserProfile } from "@/common.types";
import ProfilePage from "@/components/ProfilePage";
import { getUserProjects } from "@/lib/actions";

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Props) => {
  const result = (await getUserProjects(params.id, 100)) as {
    user: UserProfile;
  };

  if (!result?.user) {
    return <p className="no-result-text">Failed to fetch user info</p>;
  }
  return (
    <div>
      <div>
        <ProfilePage user={result?.user} />
      </div>
    </div>
  );
};

export default page;

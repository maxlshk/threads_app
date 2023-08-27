import CommunityCard from "@/components/cards/CommmunityCard";
import UserCard from "@/components/cards/UserCard";
import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser, fetchUserPosts, fetchUsers } from "@/lib/actions/user.actions";
import Thread from "@/lib/models/thread.model";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

async function Page() {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect('/onboarding');

    const result = await fetchCommunities({
        searchString: '',
        pageNumber: 1,
        pageSize: 25
    })

    return (
        <section>
            <h1 className="head-text mb-10">
                Search
            </h1>

            {/*searchbar*/}

            <div className="mt-14 flex flex-wrap gap-9">
                {result.communities.length === 0 ?
                    (
                        <p className="no-result">No communities</p>
                    ) : (
                        <>
                            {result.communities.map((communitiy) => (
                                <CommunityCard
                                    key={communitiy.id}
                                    id={communitiy.id}
                                    name={communitiy.name}
                                    username={communitiy.username}
                                    imgUrl={communitiy.image}
                                    bio={communitiy.bio}
                                    members={communitiy.members}
                                />
                            ))}
                        </>
                    )}
            </div>
        </section>
    )
}

export default Page;
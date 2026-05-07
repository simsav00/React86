import nProgress from "nprogress";
import { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "../../hooks/auth";
import PostCard from "../../components/ui/PostCard/PostCard";
import s from "./Home.module.css";
import { useParams } from "react-router-dom";

export default function Home(){

    const [posts, setPosts]     = useState([]);
    const loading = useRef(false);
    const [offset, setOffset]   = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const { category } = useParams();
    const currentCategory = category || "all";
    
    const { user, fetchBackend } = useAuth();

    const fetchPosts = useCallback(async () => {

        if(loading.current || !hasMore) return;

        loading.current = true;
        
        nProgress.start();

        try{
            const res = await fetchBackend("posts", {}, { offset: offset, category: currentCategory });

            if(!res.ok)
                throw new Error(`Unable to fetch posts:${res.status}`);

            const json = await res.json();

            const newPosts = json.data;

            if(newPosts.length < 20)
                setHasMore(false);

            setOffset((offset) => offset + 20);

            setPosts((post) => [...post, ...newPosts]);
        } 
        catch(e){
            console.error(e);
        }
        finally{
            nProgress.done();
            loading.current = false;
        }
    }, [offset, hasMore]);

    useEffect(() => {
        fetchPosts();
    }, [currentCategory]);

    useEffect(() => {
        const handleScroll = () => {
            const bottom =
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 800;

            if(bottom) fetchPosts();
        }
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }, [fetchPosts]);

    return(
        <section className={s.post__lists}>

            {posts?.map((post, idx) => (

                <PostCard
                    className={s.post__entry}

                    key={post?.id || idx}
                    id={post?.id}
                    username={post?.username}
                    profile={{ avatar: post?.avatar, link: `/user/${post?.author_id}` }}
                    datetime={post?.post_date}

                    title={post?.title}
                    description={post?.description}
                    attachment={`${post?.file_url}`}
                    ext={post?.file_ext}

                    footer={true}
                    footerProps={{
                        sectionLeft: [
                            {
                                icon: "comment", 
                                title: "View Post", 
                                link: `/post/${post?.id}`, 
                                showOnCondition: post,
                                text: post?.total_comments
                            }
                        ],

                        sectionRight: [
                            {
                                icon: "edit",
                                title: "Edit Post",
                                link: `/editpost/${post?.id}`,
                                showOnCondition: user.id === post?.author_id
                            },
                            {
                                icon: "delete",
                                title: "Delete Post",
                                link: `/deletepost/${post?.id}`,
                                showOnCondition: user.id === post?.author_id
                            }
                        ]
                    }}
                />

            ))}

            {!posts && <h2>No posts found.</h2>}

        </section>
    )
}
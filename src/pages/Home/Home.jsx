import nProgress from "nprogress";
import { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "../../hooks/auth";
import PostCard from "../../components/ui/PostCard/PostCard";
import s from "./Home.module.css";
import { useParams } from "react-router-dom";
import SmallText from "../../components/ui/SmallText";

export default function Home(){

    const [posts, setPosts]     = useState([]);
    const loading = useRef(false);
    const [offset, setOffset]   = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const triggerRef = useRef(null);

    const { category } = useParams();
    const currentCategory = category || "all";
    
    const { user, fetchBackend } = useAuth();

    const fetchPosts = async () => {
        if(loading.current || !hasMore) return;

        loading.current = true;
        nProgress.start();

        try{
            const res = await fetchBackend(`posts/?limit=20&offset=${offset}&category=${currentCategory}`, {
                method: "GET",
            });

            if(!res.ok)
                throw new Error(`Unable to fetch posts: ${res.status}`);

            const json = await res.json();
            const newPosts = json.data;

            if(newPosts == null){
                setHasMore(false);
                return;
            }

            if(newPosts.length < 20){
                setHasMore(false);
            }

            setPosts((oldPosts) => [...oldPosts, ...newPosts]);

            setOffset((oldOffset) => oldOffset + 20);
        }
        catch(err){
            console.error(err);
        }
        finally{
            loading.current = false;
            nProgress.done();
        }
    }

    useEffect(() => {
        setPosts([]);
        setOffset(0);
        setHasMore(true);
        window.scrollTo({
            top: 0,
            behavior:"smooth"
        });
    }, [category]);

    useEffect(() => {
        fetchPosts();
    }, [offset, category]);

    useEffect(() => {

        const obv = new IntersectionObserver((entries) => {
            
            if(entries[0].isIntersecting && hasMore){
                fetchPosts();
            }

        }, {
            threshold: .7
        });

        if(triggerRef.current){
            obv.observe(triggerRef.current);
        }

        return () => obv.disconnect();

    }, [hasMore, offset]);

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

            <div aria-hidden="true" ref={triggerRef}></div>

        </section>
    )
}
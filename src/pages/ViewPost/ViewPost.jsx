import { Link, replace, useNavigate, useParams } from "react-router-dom";
import PostCard from "../../components/ui/PostCard/PostCard";
import s from "./ViewPost.module.css";
import { useAuth } from "../../hooks/auth";
import { useEffect, useState } from "react";
import FluentCard from "../../components/ui/FluentCard";
import BackButton from "../../components/ui/BackButton";
import ViewComment from "../ViewComment/ViewComment";
import nProgress from "nprogress";

export default function ViewPost(){

    const navigate = useNavigate();
    const { id } = useParams();
    const { fetchBackend, user } = useAuth();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState(null);

    const fetchPost = async () => {

        try{
            nProgress.start();

            const res = await fetchBackend("post", {}, { id: id });

            if(res.status === 404) 
                navigate("/", replace);

            if(!res.ok) 
                throw new Error(`Unable to fetch post: ${res.status}`);

            const json = await res.json();
            const post = json.data;
            const comments = json.data.comments || null;

            console.log(json);
            
            setPost(post);
            comments && setComment(comments);
        }
        catch(e){
            console.error(e);
        }
        finally{
            nProgress.done();
        }
    }

    useEffect(() => {
        
        if(id == null) 
            navigate("/", replace);

        fetchPost();
    }, [id, navigate]);

    return(
        <section className={s.viewpost}>

            {post && (
                <>

                <FluentCard className={s.viewpost__header}>
                    <BackButton/>

                    <span className={s.viewpost__headerTitle}>
                        View post in #{post?.category} ({post?.id})
                    </span>
                </FluentCard>

                <PostCard
                    title={post.title}
                    username={post.username}
                    profile={{ avatar: post.avatar, link: `/user/${post.author_id}` }}
                    datetime={post.post_date}
                    description={post.description}
                    attachment={post.file_url}
                    ext={post.file_ext}
                    attachmentSize={30}
                />

                <ViewComment comments={post.comments}/>

                </>

            )}

                


        </section>
    )
}
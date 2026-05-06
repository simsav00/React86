import { Link, replace, useNavigate, useParams } from "react-router-dom";
import PostCard from "../../components/ui/PostCard/PostCard";
import s from "./ViewPost.module.css";
import { useAuth } from "../../hooks/auth";
import { useEffect, useState } from "react";
import FluentCard from "../../components/ui/FluentCard";
import nProgress from "nprogress";

export default function ViewPost(){

    const navigate = useNavigate();
    const { id } = useParams();
    const { fetchBackend } = useAuth();
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
            
            setPost(json.data);
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

            )}

                
            <FluentCard className={s.viewpost__comment}>

                {comment?.map((cmt, idx) => (

                    <PostCard
                        brighter={true}
                        key={cmt.id || idx}
                        description={cmt.comment}
                        username={cmt.username}
                        profile={{ avatar: cmt.avatar, link: `/user/${post.author_id}` ,small: true }}
                        datetime={post.post_date}
                    />

                ))}

            </FluentCard>

        </section>
    )
}
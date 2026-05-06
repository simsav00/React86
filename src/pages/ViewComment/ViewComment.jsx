import FormCard from "../../components/ui/FormCard/FormCard";
import FluentCard from "../../components/ui/FluentCard";
import InputField from "../../components/ui/InputField/InputField";
import PostCard from "../../components/ui/PostCard/PostCard";
import s from "./ViewComment.module.css";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";

export default function ViewComment({ comments, ...props }){

    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    const { user, fetchBackend } = useAuth();

    const handleComment = async () => {}

    return(
        <FluentCard className={s.comments} {...props}>

            <div className={s.comments__header}>

                <h2 className={s.comments__headerTitle}>
                    Comments
                    ({ comments?.length })
                </h2>

            </div>

            <FormCard className={s.comments__commentForm}
                      widthSize={"full"}
                      onSubmit={handleComment}>
                        
                <InputField id="comment"
                            name="comment"
                            type="textarea"
                            rows="10"
                            placeholder="Comment... (max 16384 characters)"
                            onChange={(e) => setComment(e.target.value)}
                            onClick={() => setError("")}
                />

                <InputField id="submit"
                            type="submit"      
                            value="Post comment"
                />
            </FormCard>

            {comments?.map((cmt, idx) => (

                <PostCard
                    brighter={true}
                    contentType="comment"
                    key={cmt.id || idx}
                    description={cmt.comment}
                    username={cmt.username}
                    profile={{ avatar: cmt.avatar, link: `/user/${cmt.author_id}` ,small: true }}
                    datetime={cmt.post_date}
                    tight={true}
                    footer={true}
                    footerProps={{
                        sectionLeft: [
                        {
                            icon: "delete", 
                            title: "Delete Comment", 
                            link: `/deletecomment/${cmt?.id}`, 
                            showOnCondition: cmt.author_id === user.id,
                        }
                    ],
                    }}
                />

            ))}

        </FluentCard>
    )
}
import { useEffect } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/auth";

export default function DeletePost(){
    
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchBackend } = useAuth();

    const deletePost = async () => {

        const formData = new FormData();
        formData.append("post_id", id);

        const res = await fetchBackend("deletepost", {
            body: formData
        });

        switch(res.status){
            
            case 404:
            case 403:
                navigate("/");
                break;

            case 200:
                navigate("/");
                
                break;
        }
    }

    useEffect(() => {
        if(id == null)
            navigate("/");

        deletePost();
    },[])

    return;
}
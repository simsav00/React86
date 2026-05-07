import s from "./PostCard.module.css";
import SmallText from "../SmallText";
import { Link } from "react-router-dom";
import IconButton from "../IconButton/IconButton";
import FluentCard from "../FluentCard";


export default function PostCard({ username, 
                                   profile, 
                                   datetime, 
                                   title, 
                                   description, 
                                   attachment, 
                                   attachmentSize=null, 
                                   ext, 
                                   footer=false, 
                                   footerProps, 
                                   brighter=false,
                                   tight=false,
                                   contentType="post",
                                   small=false,
                                   style,
                                   className, 
                                   ...props }){

    const img_ext = [
        "jpg",  "webp", "png", "apng",  "gif", "avif",
        "heic", "heif", 
        "tif",  "tiff", "bmp",  "ico",  "jxl",
        "dng",  "cr2",  "cr3",  "nef",  "arw",  "raf",  "orf",
    ];

    const vid_ext = [
        "mp4",  "mov",  "mkv",  "avi",  "webm",
        "m4v",  "mpg",  "mpeg",
        "3gp",  "3g2",
        "ts",   "mts",  "m2ts",
        "flv",  "f4v",  "ogv"
    ];

    let media = null;

    if(img_ext.includes(ext)){
        media = <img className={s.postcard__attachment} src={attachment} alt={`Image posted by user ${username}`} style={(attachmentSize && { width: `min(${attachmentSize}rem, 100%)` })} />
    }
    else if(vid_ext.includes(ext)){
        media = (
            <video className={s.postcard__attachment} controls playsInline muted preload="metadata" style={(attachmentSize && { width: `min(${attachmentSize}rem, 100%)` })}>
                <source src={attachment} />
            </video>
        )
    }

    return(
        <FluentCard elementType="article" 
                    brighter={brighter} 
                    className={`${s.postcard} ${className || ""}`}   
                    style={{ padding: tight ? ".65rem" : "1rem", ...style }}
                    {...props}>

            <header className={s.postcard__header}>
                {profile && (
                    <Link to={profile.link}>
                        <img className={`${profile?.small && s.postcard__avatarSmall}  ${s.postcard__avatar}`} 
                             src={profile.avatar} 
                             alt={`${username}'s profile picture.`} 

                        />
                    </Link>
                )}
                    
                
                <div className={s.postcard__metadata}>
                    <span className={s.postcard__username} translate="no">{username}</span>
                    <SmallText>
                        <time className={s.postcard__datetime} 
                              dateTime={datetime}
                              translate="no">
                                {datetime}
                        </time>
                    </SmallText>
                </div>  
            </header>

            {contentType === "post" ? (
                <figure className={s.postcard__figure}>
                    <figcaption className={s.postcard__figcaption}>

                        {title && (
                            <h2 className={s.postcard__title}>
                                {title}
                            </h2>
                        )}
                            
                        {description && (
                            <p className={s.postcard__desc}>
                                {description}   
                            </p>
                        )}

                    </figcaption>

                    {media}
                </figure>   
            ) : contentType === "comment" ? (

                <div className={s.postcard__figcaption}>

                    {description && (
                        <p className={s.postcard__desc}>
                            {description}   
                        </p>
                    )}

                </div>
            ) : null}


            {footer && (
                <footer className={s.postcard__footer}>
                
                    <div className={s.postcard__footerSectionLeft}>
                        {footerProps?.sectionLeft?.map(({ icon, title, text, link, showOnCondition=true }) => {
                            
                            return (
                                showOnCondition && (
                                    <Link key={title} to={link} title={title} aria-label={title} icon={icon}>
                                        <IconButton text={text} aria-hidden={true} icon={icon}>
                                        </IconButton>
                                    </Link>
                                )
                            );
                            
                        })}
                    </div>

                    <div className={s.postcard__footerSectionRight}>
                        {footerProps?.sectionRight?.map(({ icon, title, text, link, showOnCondition=true }) => {
                            
                            return (
                                showOnCondition && (
                                    <Link key={title} title={title} to={link} aria-label={title}>
                                        <IconButton text={text} aria-hidden={true} icon={icon}>
                                        </IconButton>
                                    </Link>
                                )
                            );
                        })}
                    </div>

                </footer>
            )}

        </FluentCard>
    )
}   
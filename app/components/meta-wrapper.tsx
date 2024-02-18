import React from "react";

interface MetaWrapperProps {
    title: string;
    description: string;
    imageUrl: string;
    imageTwitter: string;
}

function MetaWrapper({
    title,
    description,
    imageUrl,
    imageTwitter,
}: MetaWrapperProps) {
    return (
        <div>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta
                property="og:url"
                content={
                    process.env.VERCEL_URL +
                    window.location.pathname +
                    window.location.search
                }
            />
            <meta name="twitter:card" content={imageTwitter} />
        </div>
    );
}

export default MetaWrapper;

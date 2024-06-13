import React from 'react'

interface TitleProps {
    date: string;
    title: string;
}

export const Title = ({ title, date }: TitleProps) => {
    return (
        <>
            <p>毎日更新！</p>
            <h3>{date}</h3>
            <h1>{title}</h1>
        </>
    )
}

export default Title
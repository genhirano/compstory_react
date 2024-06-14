import React from 'react'
import { Story } from './Types';

interface TitleProps {
    data: Story;
    moveMethod: (currentoffset: string, direction: string) => Promise<void>;
}

export const Title = ({ data, moveMethod }: TitleProps) => {

    const handlePrevButton = () => {
        moveMethod(data.offset.toString(), "prev");
    }

    const handleNextButton = () => {
        moveMethod(data.offset.toString(), "next");
    }


    return (
        <>
            <p>毎日更新！</p>
            <p>
                {data.has_prev && <input type="button" value="< 前" onClick={handlePrevButton} />}
                {data.version}
                {data.has_next && <input type="button" value="次 >" onClick={handleNextButton} />}
            </p>
            <h1>{data.title}</h1>
        </>
    )
}

export default Title
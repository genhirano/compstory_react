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
                <table>
                    <tbody>
                        <tr>
                            <td>
                                {data.has_prev && <input type="button" className="Movebutton Button_prev" value="< 前" onClick={handlePrevButton} />}
                            </td>
                            <td>
                                {data.version}
                            </td>
                            <td>
                                {data.has_next && <input type="button" className="Movebutton Button_next" value="次 >" onClick={handleNextButton} />}
                            </td>
                        </tr>
                    </tbody>
                </table>
            <h2>{data.title}</h2>
        </>
    )
}

export default Title
import React, { useState, useEffect, useRef } from 'react'

interface PromptProps {
    prompt: string[];
}

function Prompt({ prompt }: PromptProps) {

    //useRefについて
    //useRefは「ReactDom」または「Dom」を扱う際に使用するフック
    //値を保存できるがあまり使わない？ その値の変更はレンダリングを伴わない（useStateとは違う）

    const [isOpen, setIsOpen] = useState(false);
    const accordion_body = useRef<HTMLDivElement>(null); //useRefで参照するDOM要素

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => { //isOpenがtrueになるのを監視して発火
        //isOpenである、かつaccordion_bodyが存在する場合(accordion_bodyは、畳まれた状態では存在していない)
        if (isOpen && accordion_body.current) {
            //useRefで参照するDOM要素のscrollIntoViewメソッドを使って、要素の一番下までスクロール
            accordion_body.current.scrollIntoView({ behavior: 'smooth', block: 'end' });

            //.current とあるが、current以外のプロパティーはない。
            //currentプロパティーは、実DOM要素を指す。（ReactDOMではない！）
            //つまり、このifの条件であれう accordion_body.current は、ブラウザ上のクリックなどの操作によって
            //アコーディオンが開かれている場合は「存在」=参照先がある、閉じられた場合は「存在しない」=参照先がない
            //という意味になる。
        }
    }, [isOpen]);

    return (
        <section className='prompt'>
            <div className="prompt accordion-header" onClick={toggleAccordion}>
                <h3>{isOpen ? '▲' : '▼'}プロンプトを見る</h3>
            </div>
            {isOpen && <div className="prompt accordion-content" ref={accordion_body}>{ //ref属性にcontentRefを指定
                prompt.map((line, index) => (
                    <p key={index}>{line}</p>
                ))
            }</div>}
        </section >
    )

    //DOMノードをレンダリングした後、ReactはrefオブジェクトのcurrentプロパティをそのDOMノードに設定する。
    //そのあと、useRefのcurenntプロパティーを通じてDOMにアクセスできる。

}

export default Prompt
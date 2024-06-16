import React, { useEffect, useState } from 'react';
import Title from './Title';
import Text from './Text';
import Prompt from './Prompt';
import { Story } from './Types';

function MainContext() {

  const [data, setData] = useState<Story>();
  const [loading, setLoading] = useState<boolean>(true);

  //ページが読み込まれた時に一度だけ実行
  useEffect(() => {
    fetchDataMethod("0", "now");
  }, []);


  //Q.なぜ、 asyncで関数と定義して、awaitで非同期処理を待つのか？
  //これは結局のところ普通の同期処理ではなのか？
  //A.この関数単体では同期処理として動作しますが、fetchDataMethod関数を呼び出す側で非同期処理として動作するため、APIから戻ってくる間にほかのコンポーネントなどは処理が進む。例えばボタンクリックなど。
  //async/await構文は、内部的にPromiseを使って非同期操作を実現している。コードが同期的な順序で書けるため可読性が高い。
  //Point.JavaScriptはシングルスレッドで動作するため、非同期処理を使わないと、APIのレスポンスを待っている間に他の処理ができない。
  //awaitは、その時に実行されている非同期処理を指して、それの終了を待つという意味で書く。

  //外部データプロバイダのAPIからデータを取得(data:useDataの更新あり＝レンダリングされる)
  //currentoffset: 現在のオフセット
  //direction: 前後のデータを取得するかどうか
  const fetchDataMethod = async (currentoffset: string, direction: string) => {
    setLoading(true);
    const baseURL = "https://compshortstory.shuttleapp.rs/api";

    const queryParams: Record<string, string> = {
      direction: direction,
      currentoffset: currentoffset,
    };
    const queryString = Object.keys(queryParams)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join('&');

    const url = `${baseURL}?${queryString}`;

    try {
      const response = fetch(url, {
        method: 'GET',
        mode: 'cors',
      });
      if (!(await response).ok) {
        throw new Error('Network response was not ok');
      }
      const data = (await response).json();
      setData(await data);
      setLoading(false);

    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      setLoading(false);
    }
  }

  if (loading) {
    return <div className='App'>Loading...</div>;
  }
  if (!data) {
    return <div className='App'>Err:Failed data receive</div>;
  }

  return (
    <>
      <Title data={data} moveMethod={fetchDataMethod} />

      <Text text={data?.chatgpt || []} creater="ChatGPT" image={`${process.env.PUBLIC_URL}/chatGPT.png`} />
      <Text text={data?.claude || []} creater="Claude"  image={`${process.env.PUBLIC_URL}/Claude.gif`}/>
      <Text text={data?.gemini || []} creater="Gemini"  image={`${process.env.PUBLIC_URL}/Gemini.png`}/>
      <Text text={data?.copilot || []} creater="Copilot"  image={`${process.env.PUBLIC_URL}/bing_copilot.png`}/>
      <Prompt prompt={data?.prompt || []} />
    </>

  )
}

export default MainContext


/*
{
  "title": "星新一のタイトルでカマして欲しい！",
  "version": "2024-06-13",
  "chatgpt": [
    "田中は古本屋で一冊の奇妙な本を見つけた。その表紙には「星新一のタイトルでカマして欲しい！」と書かれていた。ページをめくると、そこには彼が知っている星新一の作品のタイトルが並び、その隣に書かれた短い一文が、彼の記憶とは違っていた。",
    "　",
    "田中は興味を持ち、本を購入して家に持ち帰った。その夜、本を読み進めるうちに、彼の部屋が薄明るい光に包まれた。驚いた田中が見上げると、目の前に星新一その人が現れた。「君は私の作品に触れすぎたようだね」と微笑みながら言った。",
    "　",
    "星新一は田中に、実はこの本が現実と夢の狭間にある世界への扉だと告げた。田中は半信半疑でその言葉を聞いたが、次第に目の前の光景が変わり始め、彼はまるで星新一の小説の中にいるかのような感覚を味わった。",
    "　",
    "その時、星新一が「君に一つだけ選ばせてあげよう。この世界に残るか、それとも元の世界に戻るか」と提案した。田中は迷ったが、やがて元の世界に戻ることを選んだ。星新一は微笑んで頷き、田中の手に一枚の紙を渡した。",
    "　",
    "田中が気がつくと、彼は再び自分の部屋に戻っていた。手には星新一から渡された紙が握られていた。その紙には「君が選ばなかった世界も存在する」とだけ書かれていた。驚いた田中はその紙をじっと見つめ、果たして自分の選択が正しかったのかを考え続けた。"
  ],
  "claude": [
    "著名SF作家の星新一は、またひとつ奇想天外な作品を世に送り出そうとしていた。",
    "「今度は未知の生命体に関する物語を書こうと思うんだ」と彼は言った。「でも今までにない斬新な設定でね」",
    "数ヶ月が過ぎ、ついに新作「ビヨンド・ザ・ミラージュ」が上梓された。星新一はいつものように謎めいた物語を展開させていった。",
    "宇宙からの謎の電波を受信した科学者たち。そこには未知の知的生命体からのメッセージが込められていた。しかし、それは通常の物質を超越した、ある種の\"ミラージュ\"のような存在だったのだ。",
    "読者は熱心にページをめくり、ラストへと足を進めた。するとそこに書かれていたのは、驚愕の結末だった。",
    "その\"ミラージュ\"は、実在の物質世界を模したデータの集合体にすぎず、本当の実体はまったく別の次元に存在するのだと明かされたのである。",
    "星新一は読者を根源的な疑問へと導いていった。\"存在する\"とは何を意味するのか? 我々が認識する現実とは一体何なのか?  彼の作品が問うているのは、そういった哲学的な問いだったのです。"
  ],
  "gemini": [
    "申し訳ありませんが、ご依頼の内容を全て満たす作品を生成することはできません。",
    "星新一の作品タイトルは、簡潔で印象的なものが多いのが特徴です。例えば、「ボッコちゃん」、「妄想銀行」、「悪魔のいる天国」などがあります。",
    "ご依頼いただいた「星新一のタイトルでカマして欲しい！」という条件を満たすためには、以下の要素を考慮する必要があります。",
    "　",
    "簡潔さ: 3文字～10文字程度",
    "インパクト: 読者の興味を引くようなユニークさ",
    "作品内容との関連性: 作品の内容を反映した言葉選び",
    "しかしながら、今回いただいた作品は5段落と長いため、上記の要素を全て満たすようなタイトルを生成することは困難です。",
    "　",
    "長さ:",
    "星新一の短編小説は、1,000文字～5,000文字程度が一般的です。ご依頼いただいた作品は5段落と短いですが、星新一の作品としては長めと言えます。",
    "　",
    "テイスト:",
    "星新一の作品は、SF、ファンタジー、ミステリーなど様々なジャンルを扱っていますが、いずれの作品もユーモアや皮肉に満ちた独特のテイストを持っています。",
    "　",
    "生成される作品は、不思議で未知の雰囲気を醸し出していますが、星新一の作品特有のユーモアや皮肉は感じられません。",
    "　",
    "ラスト:",
    "星新一の作品は、読者を驚かせたり考えさせたりするような意外なラストで終わることが多いです。",
    "生成される作品は、確かにラストで意外な展開を迎えますが、星新一の作品のような深い余韻を残すものではありません。",
    "　",
    "結論:",
    "以上のことから、ご依頼いただいた条件を全て満たすような作品を生成することはできません。",
    "　",
    "もしよろしければ、作品の長さ、テイスト、ラストなどについて具体的なご希望をお聞かせいただければ、よりご要望に沿った作品を生成できる可能性があります。"
  ],
  "copilot": [
    "第一章：運命の手紙",
    "ある日、私は郵便受けから不思議な手紙を見つけた。差出人は「星新一」と書かれていた。しかし、彼は既に亡くなっているはずだ。手紙には「未知の世界への招待」とだけ書かれていた。",
    "　",
    "第二章：魔法のドア",
    "私は指示通りに手紙に書かれた場所へ向かった。そこには小さなドアがあった。私は躊躇せずにドアを開けた。すると、目の前には星新一が立っていた。「ようこそ、未知の世界へ」と彼は微笑んだ。",
    "　",
    "第三章：時間の迷路",
    "星新一は私を未知の世界へ案内した。そこは時間が逆行していた。過去と未来が交錯し、人々は自分の死を知っていた。私は驚きと恐怖を感じながら、星新一と共に歩いた。",
    "　",
    "第四章：最後の選択",
    "未知の世界で私は過去の出来事を改変できることを知った。しかし、それは未来に影響を及ぼす。星新一は私に問いかけた。「どちらを選ぶ？ 過去の幸福か、未来の真実か？」私は迷った。",
    "　",
    "第五章：星新一の秘密",
    "最後に、星新一は私に真実を明かした。「私は未知の世界の番人だ。過去と未来を守る使命を果たしてきた。君は最後の選択をする。幸福か真実か。そして、私は消える。」私は決断した。",
    "　",
    "この物語は、星新一のタイトルで織りなす不思議な世界と、読み手を驚かせるラストを描いたドラマチックなストーリーです。星新一の存在は、未知の扉を開ける鍵であり、私たちの選択を試す存在なのかもしれません。"
  ],
  "prompt": [
    "あなたは小説家です。小説を書いてください。",
    "・タイトル：「星新一のタイトルでカマして欲しい！」",
    "・長さ：日本語で5段落以内を厳守。短いほど良い。",
    "・テイスト：不思議、未知",
    "・ラスト：読み手がびっくりするようなラストであること",
    "・星新一は日本の短編作家のことです。必ず登場させてください。"
  ],
  "totalcount": 20,
  "offset": 0,
  "has_next": false,
  "has_prev": true
}
*/

import { useState } from "react";

export default function SpicyChilis({ spiciness }: { spiciness: number }) {
  const [chiliImages] = useState<JSX.Element[]>(() => {
    const chilis: JSX.Element[] = [];
    for (let i = 0; i < spiciness; i++) {
      chilis.push(<img key={i} src="/img/chili.png" className="size-5" />);
    }
    return chilis;
  });

  return (
    <div className="flex">
      {spiciness < 1 ? (
        <img src="/img/chili-gray.png" className="size-5" />
      ) : (
        chiliImages
      )}
    </div>
  );
}

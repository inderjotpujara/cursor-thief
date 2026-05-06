import { useEffect, useRef } from "react";
import type { CharacterId, Pose } from "../shared/types";
import { renderCreature } from "../content/creatures";

type Props = {
  id: CharacterId;
  pose?: Pose;
  flip?: boolean;
  width?: number;
  style?: React.CSSProperties;
};

export function CreatureSVG({ id, pose, flip, width, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.replaceChildren(renderCreature(id, { pose, flip, width }));
  }, [id, pose, flip, width]);

  return <div ref={ref} style={style} />;
}

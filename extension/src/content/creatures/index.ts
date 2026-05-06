import type { CharacterId, Pose } from "../../shared/types";
import rascal from "./rascal";
import pip from "./pip";
import sly from "./sly";
import gloop from "./gloop";
import snatch from "./snatch";
import fingers from "./fingers";

export type { Pose };

export type RenderOptions = {
  pose?: Pose;
  flip?: boolean;
  width?: number;
};

const REGISTRY: Record<CharacterId, (opts: RenderOptions) => SVGElement> = {
  rascal,
  pip,
  sly,
  gloop,
  snatch,
  fingers,
};

export function renderCreature(id: CharacterId, opts: RenderOptions = {}): SVGElement {
  return REGISTRY[id](opts);
}

import { Args } from "grimoire-kolmafia";
import { canInteract } from "kolmafia";
import { Strategy } from "./lib";
import { get } from "libram";

type PvpTarget = "fame" | "loot" | "flowers";

export const args = Args.create("pvp_mab", "A multi-armed bandit script for pvp", {
  breakStone: Args.flag({
    help: "Should pvp_mab break your stone?",
    default: true,
  }),
  target: Args.custom<PvpTarget>(
    {
      default: canInteract() ? "loot" : "fame",
      options: [["fame"], ["loot"], ["flowers"]],
    },
    (x) => x as PvpTarget,
    "pvp target"
  ),
  debug: Args.flag({
    help: "Print debugging information for strategies",
    default: false,
  }),
  strategy: Args.custom<Strategy>(
    {
      default: "bernoulliThompson",
      options: [
        ["UCB"],
        // ["Exp3"],
        // ["Exp3IX"],
        ["bernoulliThompson"],
        ["epsilonGreedy"],
        ["gaussianThompson"],
      ],
    },
    (x) => x as Strategy,
    "multi-armed bandit strategy"
  ),
  winMessage: Args.string({
    help: "Message to show on fight win, defaults to 'defaultFlowerWinMessage'",
    // The default is an empty string
    default: get("defaultFlowerWinMessage"),
  }),
  lossMessage: Args.string({
    help: "Message to show on fight loss, defaults to 'defaultFlowerLossMessage'",
    // The default is an empty string
    default: get("defaultFlowerLossMessage"),
  }),
  ranked: Args.flag({
    help: "Fight random tougher opponents for +1 swagger and increased fame gain",
    default: false,
  }),
  no_optimize: Args.flag({
    help: "Skip the uberpvpoptimizer step",
    default: false,
  }),
  reset: Args.flag({
    help: "Resets the stats of the current season",
    default: false,
  }),
});

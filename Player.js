const GameState = require("./src/GameState");

class Player {
  static get VERSION() {
    return "0.1";
  }

  static betRequest(gameState, bet) {
    try {
      var game = new GameState(gameState);
      const scoreNumber = game.me().score();
      const me = game.me();
      const stackValue = me.stack();
      const minimumRaise = game.minimumRaise();
      const hasPocketPair = me.hasPocketPair();
      const hasPocketSuited = me.hasPocketSuited();
      const holeCards = me.holeCards();
      const hasFigureCard = holeCards.some((card) => {
        {
          console.log("RANK_FROM_HAS_FIGURE_CARD", card.rank());
          console.log(
            "HAS_FIGURED_CARD_FROM METHOD",
            ["J", "Q", "K", "A"].includes(card.rank())
          );
          return ["J", "Q", "K", "A"].includes(card.rank());
        }
      });

      console.log("AFTER_INITIATIONS");

      console.log("MINIMUM_RAISE", minimumRaise);
      console.log("STACK_VALUE", stackValue);
      console.log("HAS_POCKET_PAIR", hasPocketPair);
      console.log("HAS_POCKET_SUITED", hasPocketSuited);
      console.log("HOLE_CARDS", holeCards);
      console.log("HAS_FIGURE_CARD", hasFigureCard);

      const communityCards = game.communityCards();
      const hasPairWithCommCards = holeCards.some((holeCard) =>
        communityCards.map((cc) => cc.rank()).includes(holeCard.rank())
      );
      console.log("HAS_PAIR_WITH_COMM_CARDS", hasPairWithCommCards);

      /*    // fold
      if (!hasFigureCard || !hasPocketSuited) {
        console.log("HAS_POCKET_PAIR", hasPocketPair);
        console.log("SCORE_NUMBER", scoreNumber);
        bet(0);
        return;
      } */

      // raise on good cards
      if (
        (hasPocketPair && hasFigureCard) ||
        (hasFigureCard && hasPairWithCommCards)
      ) {
        bet(me.stack());
        return;
      } else if (
        (hasPairWithCommCards || hasFigureCard) &&
        stackValue > minimumRaise * 2
      ) {
        console.log("SCORE_NUMBER", scoreNumber);
        console.log("STACK_VALUE", stackValue);
        bet(minimumRaise * 2);
        return;
      } else if (stackValue >= minimumRaise) {
        bet(game.minimumRaise());
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  static showdown(gameState) {}
}

module.exports = Player;

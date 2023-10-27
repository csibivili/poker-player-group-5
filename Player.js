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

      console.log("AFTER_INITIATIONS");

      console.log("MINIMUM_RAISE", minimumRaise);
      console.log("STACK_VALUE", stackValue);
      console.log("HAS_POCKET_PAIR", hasPocketPair);

      // fold
      if (!hasPocketPair && scoreNumber < 7) {
        console.log("HAS_POCKET_PAIR", hasPocketPair);
        console.log("SCORE_NUMBER", scoreNumber);
        bet(0);
        return;
      }

      // raise on good cards
      if (scoreNumber >= 10 && stackValue > minimumRaise * 2) {
        console.log("SCORE_NUMBER", scoreNumber);
        console.log("STACK_VALUE", stackValue);
        bet(minimumRaise * 2);
        return;
      } else {
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

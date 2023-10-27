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

      // raise on good cards
      if (
        scoreNumber > 3 &&
        stackValue > minimumRaise * 1.5 &&
        !hasPocketPair
      ) {
        bet(minimumRaise * 1.5);
      } else {
        bet(game.minimumRaise());
      }
      console.log("END_OF_TRY");
    } catch (error) {
      console.error(error);
    }
  }

  static showdown(gameState) {}
}

module.exports = Player;

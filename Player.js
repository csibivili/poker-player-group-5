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

      if (scoreNumber > 10 && stackValue > minimumRaise * 1.5) {
        bet(minimumRaise * 1.5);
      }

      bet(game.minimumRaise());
    } catch (error) {
      console.error(error);
      bet(0);
    }
  }

  static showdown(gameState) {}
}

module.exports = Player;

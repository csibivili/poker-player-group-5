const GameState = require('./src/GameState');

class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    try {
      var game = new GameState(gameState);
      bet(game.minimumRaise());
    } catch (error) {
      console.log(error)
      bet(0)
    }
  }

  static showdown(gameState) {
  }
}

module.exports = Player;


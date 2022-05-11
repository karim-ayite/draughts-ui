export const messages = {
  enterPlayerName: 'Enter your player name',
  choosePieces: 'Choose your pieces color',
  createGame: 'Create a game',
  createDGame: 'Create a draughts game',
  dark: 'Dark',
  light: 'Light',
  required: function (field: string) {
    return field + ' is required';
  },
  hintMaxChar: function (max: number) {
    return 'Max '+ max + ' characters';
  }
};
export const formFields = {
  playerName: 'playerName',
  piecesColor: 'piecesColor'
};


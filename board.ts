
class Chessboard {

    public readonly rows = 8
    public readonly columns = 8;
    public board: Square[] = new Array<Square>(64);

    constructor() {
        this.reset();
    }

    reset(): void {

        for (let i = 0; i < this.rows * this.columns; i++) {
            this.board[i] = new Square();
        }

        this.board[this.index({ x: 0, y: 0 })].piece = new Rook(PlayerColor.Black);
        this.board[this.index({ x: 0, y: 7 })].piece = new Rook(PlayerColor.Black);
        this.board[this.index({ x: 0, y: 1 })].piece = new Knight(PlayerColor.Black);
        this.board[this.index({ x: 0, y: 6 })].piece = new Knight(PlayerColor.Black);
        this.board[this.index({ x: 0, y: 5 })].piece = new Bisshop(PlayerColor.Black);
        this.board[this.index({ x: 0, y: 2 })].piece = new Bisshop(PlayerColor.Black);
        this.board[this.index({ x: 0, y: 3 })].piece = new Queen(PlayerColor.Black);
        this.board[this.index({ x: 0, y: 4 })].piece = new King(PlayerColor.Black);

        this.board[this.index({ x: 7, y: 0 })].piece = new Rook(PlayerColor.White);
        this.board[this.index({ x: 7, y: 7 })].piece = new Rook(PlayerColor.White);
        this.board[this.index({ x: 7, y: 1 })].piece = new Knight(PlayerColor.White);
        this.board[this.index({ x: 7, y: 6 })].piece = new Knight(PlayerColor.White);
        this.board[this.index({ x: 7, y: 5 })].piece = new Bisshop(PlayerColor.White);
        this.board[this.index({ x: 7, y: 2 })].piece = new Bisshop(PlayerColor.White);
        this.board[this.index({ x: 7, y: 3 })].piece = new Queen(PlayerColor.White);
        this.board[this.index({ x: 7, y: 4 })].piece = new King(PlayerColor.White);

        for (let i = 0; i < 8; i++) {
            this.board[this.index({ x: 1, y: i })].piece = new Pawn(PlayerColor.Black);
            this.board[this.index({ x: 6, y: i })].piece = new Pawn(PlayerColor.White);
        }
    }

    index(p: IPoint): number {
        return p.y * this.rows + p.x;
    }

    point(index: number): IPoint {
        let rows = Math.floor(index / this.rows);
        let column = index - rows * this.rows;
        return { x: column, y: rows };
    }

    isEmpty(p: IPoint): boolean {
        return this.board[this.index(p)].piece === undefined;
    }

    isValid(from: IPoint, to: IPoint, player: PlayerColor): boolean {
        let piece = this.board[this.index(from)].piece;
        if (piece === undefined) return false;
        return piece.isValidMove(from, to, player, this);
    }

    move(from: IPoint, to: IPoint, player: PlayerColor): string {
        if (!this.isValid(from, to, player)) return "Invalid move";
        let removeIndex = this.index(from);
        this.board[this.index(to)].piece = this.board[this.index(from)].piece;

        if (this.board[this.index(to)].piece instanceof Pawn) {
            (this.board[this.index(to)].piece as Pawn).hasMoved = true;
        }

        this.board[removeIndex] = new Square();
    }

    get(p: IPoint): Piece {
        return this.board[this.index(p)].piece;
    }
}

class Square {
    public piece: Piece;
    public name: string;
}

class Piece implements IMoveable {
    isValidMove(from: IPoint, to: IPoint, player: PlayerColor, board: Chessboard): boolean {
        throw new Error("Method not implemented.");
    }
    constructor(public player: PlayerColor, public type: PieceType) { };
}

class Pawn extends Piece {
    public hasMoved: boolean;
    constructor(player: PlayerColor) {
        super(player, PieceType.Pawn);
        this.player = player;
    }
    isValidMove(from: IPoint, to: IPoint, player: PlayerColor, board: Chessboard): boolean {

        let truthTable = Array<boolean>(64);

        if (player == PlayerColor.White) {
            truthTable[board.index({ x: from.x - 1, y: from.y })] = board.isEmpty({ x: from.x - 1, y: from.y });
            truthTable[board.index({ x: from.x - 2, y: from.y })] = !this.hasMoved && board.isEmpty({ x: from.x - 2, y: from.y });
        }

        if (player == PlayerColor.Black) {
            truthTable[board.index({ x: from.x + 1, y: from.y })] = board.isEmpty({ x: from.x + 1, y: from.y });
            truthTable[board.index({ x: from.x + 2, y: from.y })] = !this.hasMoved && board.isEmpty({ x: from.x + 2, y: from.y });
        }

        return truthTable[board.index(to)];
    }
}

class Rook extends Piece {
    constructor(player: PlayerColor) {
        super(player, PieceType.Rook);
        this.player = player;
    }
    isValidMove(from: IPoint, to: IPoint, player: PlayerColor, board: Chessboard): boolean {
        return true;
    }
}

class Knight extends Piece {
    constructor(player: PlayerColor) {
        super(player, PieceType.Knight);
        this.player = player;
    }
    isValidMove(from: IPoint, to: IPoint, player: PlayerColor, board: Chessboard): boolean {
        return true;
    }
}

class Bisshop extends Piece {
    constructor(player: PlayerColor) {
        super(player, PieceType.Bisshop);
        this.player = player;
    }
    isValidMove(from: IPoint, to: IPoint, player: PlayerColor, board: Chessboard): boolean {
        return true;
    }
}

class Queen extends Piece {
    constructor(player: PlayerColor) {
        super(player, PieceType.Queen);
        this.player = player;
    }
    isValidMove(from: IPoint, to: IPoint, player: PlayerColor, board: Chessboard): boolean {
        return true;
    }
}

class King extends Piece {
    constructor(player: PlayerColor) {
        super(player, PieceType.King);
        this.player = player;
    }
    isValidMove(from: IPoint, to: IPoint, player: PlayerColor, board: Chessboard): boolean {
        return true;
    }
}

interface IMoveable {
    isValidMove(from: IPoint, to: IPoint, player: PlayerColor, board: Chessboard): boolean;
}

enum PlayerColor {
    White,
    Black
}
enum PieceType {
    Pawn,
    Knight,
    Bisshop,
    Rook,
    Queen,
    King
}
interface IPoint {
    x: number;
    y: number;
}
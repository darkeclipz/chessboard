var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Chessboard = /** @class */ (function () {
    function Chessboard() {
        this.rows = 8;
        this.columns = 8;
        this.board = new Array(64);
        this.reset();
    }
    Chessboard.prototype.reset = function () {
        for (var i = 0; i < this.rows * this.columns; i++) {
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
        for (var i = 0; i < 8; i++) {
            this.board[this.index({ x: 1, y: i })].piece = new Pawn(PlayerColor.Black);
            this.board[this.index({ x: 6, y: i })].piece = new Pawn(PlayerColor.White);
        }
    };
    Chessboard.prototype.index = function (p) {
        return p.y * this.rows + p.x;
    };
    Chessboard.prototype.point = function (index) {
        var rows = Math.floor(index / this.rows);
        var column = index - rows * this.rows;
        return { x: column, y: rows };
    };
    Chessboard.prototype.isEmpty = function (p) {
        return this.board[this.index(p)].piece === undefined;
    };
    Chessboard.prototype.isValid = function (from, to, player) {
        var piece = this.board[this.index(from)].piece;
        if (piece === undefined)
            return false;
        return piece.isValidMove(from, to, player, this);
    };
    Chessboard.prototype.move = function (from, to, player) {
        if (!this.isValid(from, to, player))
            return "Invalid move";
        var removeIndex = this.index(from);
        this.board[this.index(to)].piece = this.board[this.index(from)].piece;
        if (this.board[this.index(to)].piece instanceof Pawn) {
            this.board[this.index(to)].piece.hasMoved = true;
        }
        this.board[removeIndex] = new Square();
    };
    Chessboard.prototype.get = function (p) {
        return this.board[this.index(p)].piece;
    };
    return Chessboard;
}());
var Square = /** @class */ (function () {
    function Square() {
    }
    return Square;
}());
var Piece = /** @class */ (function () {
    function Piece(player, type) {
        this.player = player;
        this.type = type;
    }
    Piece.prototype.isValidMove = function (from, to, player, board) {
        throw new Error("Method not implemented.");
    };
    ;
    return Piece;
}());
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn(player) {
        var _this = _super.call(this, player, PieceType.Pawn) || this;
        _this.player = player;
        return _this;
    }
    Pawn.prototype.isValidMove = function (from, to, player, board) {
        var truthTable = Array(64);
        if (player == PlayerColor.White) {
            truthTable[board.index({ x: from.x - 1, y: from.y })] = board.isEmpty({ x: from.x - 1, y: from.y });
            truthTable[board.index({ x: from.x - 2, y: from.y })] = !this.hasMoved && board.isEmpty({ x: from.x - 2, y: from.y });
        }
        if (player == PlayerColor.Black) {
            truthTable[board.index({ x: from.x + 1, y: from.y })] = board.isEmpty({ x: from.x + 1, y: from.y });
            truthTable[board.index({ x: from.x + 2, y: from.y })] = !this.hasMoved && board.isEmpty({ x: from.x + 2, y: from.y });
        }
        return truthTable[board.index(to)];
    };
    return Pawn;
}(Piece));
var Rook = /** @class */ (function (_super) {
    __extends(Rook, _super);
    function Rook(player) {
        var _this = _super.call(this, player, PieceType.Rook) || this;
        _this.player = player;
        return _this;
    }
    Rook.prototype.isValidMove = function (from, to, player, board) {
        return true;
    };
    return Rook;
}(Piece));
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    function Knight(player) {
        var _this = _super.call(this, player, PieceType.Knight) || this;
        _this.player = player;
        return _this;
    }
    Knight.prototype.isValidMove = function (from, to, player, board) {
        return true;
    };
    return Knight;
}(Piece));
var Bisshop = /** @class */ (function (_super) {
    __extends(Bisshop, _super);
    function Bisshop(player) {
        var _this = _super.call(this, player, PieceType.Bisshop) || this;
        _this.player = player;
        return _this;
    }
    Bisshop.prototype.isValidMove = function (from, to, player, board) {
        return true;
    };
    return Bisshop;
}(Piece));
var Queen = /** @class */ (function (_super) {
    __extends(Queen, _super);
    function Queen(player) {
        var _this = _super.call(this, player, PieceType.Queen) || this;
        _this.player = player;
        return _this;
    }
    Queen.prototype.isValidMove = function (from, to, player, board) {
        return true;
    };
    return Queen;
}(Piece));
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King(player) {
        var _this = _super.call(this, player, PieceType.King) || this;
        _this.player = player;
        return _this;
    }
    King.prototype.isValidMove = function (from, to, player, board) {
        return true;
    };
    return King;
}(Piece));
var PlayerColor;
(function (PlayerColor) {
    PlayerColor[PlayerColor["White"] = 0] = "White";
    PlayerColor[PlayerColor["Black"] = 1] = "Black";
})(PlayerColor || (PlayerColor = {}));
var PieceType;
(function (PieceType) {
    PieceType[PieceType["Pawn"] = 0] = "Pawn";
    PieceType[PieceType["Knight"] = 1] = "Knight";
    PieceType[PieceType["Bisshop"] = 2] = "Bisshop";
    PieceType[PieceType["Rook"] = 3] = "Rook";
    PieceType[PieceType["Queen"] = 4] = "Queen";
    PieceType[PieceType["King"] = 5] = "King";
})(PieceType || (PieceType = {}));
//# sourceMappingURL=board.js.map
import math

def minimax(board, depth, is_maximizing, player, opponent, stats=None):
    """
    Minimax algorithm for Tic Tac Toe.
    board: 3x3 list, with 'X', 'O', or ''.
    Returns best score and best move (row, col).
    """
    if stats is not None:
        stats['nodes'] += 1

    winner = check_winner(board)
    if winner == player:
        return 1, None
    elif winner == opponent:
        return -1, None
    elif is_board_full(board):
        return 0, None

    if is_maximizing:
        best_score = -math.inf
        best_move = None
        for i in range(3):
            for j in range(3):
                if board[i][j] == '':
                    board[i][j] = player
                    score, _ = minimax(board, depth + 1, False, player, opponent, stats)
                    board[i][j] = ''
                    if score > best_score:
                        best_score = score
                        best_move = (i, j)
        return best_score, best_move
    else:
        best_score = math.inf
        best_move = None
        for i in range(3):
            for j in range(3):
                if board[i][j] == '':
                    board[i][j] = opponent
                    score, _ = minimax(board, depth + 1, True, player, opponent, stats)
                    board[i][j] = ''
                    if score < best_score:
                        best_score = score
                        best_move = (i, j)
        return best_score, best_move


def alphabeta(board, depth, alpha, beta, is_maximizing, player, opponent, stats=None):
    """
    Alpha-Beta pruning for Tic Tac Toe.
    """
    if stats is not None:
        stats['nodes'] += 1

    winner = check_winner(board)
    if winner == player:
        return 1, None
    elif winner == opponent:
        return -1, None
    elif is_board_full(board):
        return 0, None

    if is_maximizing:
        best_score = -math.inf
        best_move = None
        for i in range(3):
            for j in range(3):
                if board[i][j] == '':
                    board[i][j] = player
                    score, _ = alphabeta(board, depth + 1, alpha, beta, False, player, opponent, stats)
                    board[i][j] = ''
                    if score > best_score:
                        best_score = score
                        best_move = (i, j)
                    alpha = max(alpha, best_score)
                    if beta <= alpha:
                        break
            if beta <= alpha:
                break
        return best_score, best_move
    else:
        best_score = math.inf
        best_move = None
        for i in range(3):
            for j in range(3):
                if board[i][j] == '':
                    board[i][j] = opponent
                    score, _ = alphabeta(board, depth + 1, alpha, beta, True, player, opponent, stats)
                    board[i][j] = ''
                    if score < best_score:
                        best_score = score
                        best_move = (i, j)
                    beta = min(beta, best_score)
                    if beta <= alpha:
                        break
            if beta <= alpha:
                break
        return best_score, best_move


def check_winner(board):
    # Check rows, columns, diagonals
    for i in range(3):
        if board[i][0] == board[i][1] == board[i][2] != '':
            return board[i][0]
        if board[0][i] == board[1][i] == board[2][i] != '':
            return board[0][i]
    if board[0][0] == board[1][1] == board[2][2] != '':
        return board[0][0]
    if board[0][2] == board[1][1] == board[2][0] != '':
        return board[0][2]
    return None


def is_board_full(board):
    for row in board:
        if '' in row:
            return False
    return True
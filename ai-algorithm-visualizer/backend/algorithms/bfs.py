from collections import deque

def bfs(grid, start, goal):
    """
    Performs BFS on a grid.
    grid: 2D list where 0 = empty, 1 = obstacle.
    start: tuple (row, col)
    goal: tuple (row, col)
    Returns a dict with visited nodes in order and the final path.
    """
    rows, cols = len(grid), len(grid[0])
    visited = []
    parent = {}
    frontier = deque()
    frontier.append(start)
    parent[start] = None

    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]  # right, down, left, up

    while frontier:
        current = frontier.popleft()
        if current in visited:
            continue
        visited.append(current)

        if current == goal:
            break

        for dr, dc in directions:
            nr, nc = current[0] + dr, current[1] + dc
            neighbor = (nr, nc)
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] != 1:
                if neighbor not in parent and neighbor not in frontier:
                    parent[neighbor] = current
                    frontier.append(neighbor)

    # Reconstruct path
    path = []
    if goal in parent:
        node = goal
        while node is not None:
            path.append(node)
            node = parent[node]
        path.reverse()

    return {
        'visited': visited,
        'path': path,
        'steps': len(visited)  # optional
    }
def dfs(grid, start, goal):
    """
    Performs DFS on a grid.
    Returns visited nodes in order and final path.
    """
    rows, cols = len(grid), len(grid[0])
    visited = []
    parent = {}
    stack = [start]
    parent[start] = None

    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]

    while stack:
        current = stack.pop()
        if current in visited:
            continue
        visited.append(current)

        if current == goal:
            break

        for dr, dc in directions:
            nr, nc = current[0] + dr, current[1] + dc
            neighbor = (nr, nc)
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] != 1:
                if neighbor not in parent and neighbor not in stack:
                    parent[neighbor] = current
                    stack.append(neighbor)

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
        'steps': len(visited)
    }
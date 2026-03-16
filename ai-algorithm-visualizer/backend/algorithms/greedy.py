import heapq

def heuristic(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

def greedy(grid, start, goal):
    """
    Greedy Best First Search.
    Uses heuristic only to select next node.
    """
    rows, cols = len(grid), len(grid[0])
    open_set = []
    heapq.heappush(open_set, (heuristic(start, goal), start))
    came_from = {}
    visited = []
    came_from[start] = None

    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]

    while open_set:
        current = heapq.heappop(open_set)[1]
        visited.append(current)

        if current == goal:
            break

        for dr, dc in directions:
            nr, nc = current[0] + dr, current[1] + dc
            neighbor = (nr, nc)
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] != 1:
                if neighbor not in came_from:
                    came_from[neighbor] = current
                    heapq.heappush(open_set, (heuristic(neighbor, goal), neighbor))

    # Reconstruct path
    path = []
    if goal in came_from:
        node = goal
        while node is not None:
            path.append(node)
            node = came_from[node]
        path.reverse()

    return {
        'visited': visited,
        'path': path,
        'steps': len(visited)
    }
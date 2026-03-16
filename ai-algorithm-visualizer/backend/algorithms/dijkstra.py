import heapq

def dijkstra(grid, start, goal):
    """
    Dijkstra's algorithm for shortest path on a grid.
    Treats all moves as weight 1, but can be expanded for weighted grids.
    """
    rows, cols = len(grid), len(grid[0])
    pq = [(0, start)]
    distances = {start: 0}
    came_from = {start: None}
    visited = []

    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]

    while pq:
        greedy_dist, current = heapq.heappop(pq)
        
        if current in visited:
            continue
        visited.append(current)

        if current == goal:
            break

        for dr, dc in directions:
            nr, nc = current[0] + dr, current[1] + dc
            neighbor = (nr, nc)
            
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] != 1:
                new_dist = distances[current] + 1
                if neighbor not in distances or new_dist < distances[neighbor]:
                    distances[neighbor] = new_dist
                    came_from[neighbor] = current
                    heapq.heappush(pq, (new_dist, neighbor))

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

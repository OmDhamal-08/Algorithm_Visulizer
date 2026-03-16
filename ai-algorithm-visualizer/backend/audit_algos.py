
import sys
import os

# Add the algorithms directory to path
sys.path.append(os.path.abspath('algorithms'))

from bfs import bfs
from dfs import dfs
from astar import astar
from dijkstra import dijkstra
from greedy import greedy

def run_audit():
    # 5x5 Grid: 0=Empty, 1=Wall
    grid = [
        [0, 0, 0, 0, 0],
        [1, 1, 0, 1, 1],
        [0, 0, 0, 0, 0],
        [1, 1, 0, 1, 1],
        [0, 0, 0, 0, 0]
    ]
    start = (0, 0)
    goal = (4, 4)

    algos = {
        "BFS": bfs,
        "DFS": dfs,
        "A*": astar,
        "Dijkstra": dijkstra,
        "Greedy": greedy
    }

    print("--- ALGORITHM EXPLORATION AUDIT ---")
    for name, func in algos.items():
        result = func(grid, start, goal)
        visited_len = len(result['visited'])
        path_len = len(result['path'])
        
        # Check specific behaviors
        if name == "BFS":
            behavior = "Explored level-by-level (Breadth)"
        elif name == "DFS":
            behavior = "Plunged deep into branches (Depth)"
        elif name in ["A*", "Dijkstra"]:
            behavior = "Calculated optimal shortest path"
        else:
            behavior = "Used heuristic to head straight for goal"
            
        print(f"\n[{name}]")
        print(f"- Behavior: {behavior}")
        print(f"- Nodes Visited: {visited_len}")
        print(f"- Path Found: {'Yes' if path_len > 0 else 'No'}")
        print(f"- Path Length: {path_len}")
        print(f"- First 3 visited: {result['visited'][:3]}")

if __name__ == "__main__":
    run_audit()

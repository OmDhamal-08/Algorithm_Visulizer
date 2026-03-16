# Makes algorithms a package
from .bfs import bfs
from .dfs import dfs
from .astar import astar
from .greedy import greedy
from .dijkstra import dijkstra
from .minimax import minimax, alphabeta

__all__ = ['bfs', 'dfs', 'astar', 'greedy', 'dijkstra', 'minimax', 'alphabeta']
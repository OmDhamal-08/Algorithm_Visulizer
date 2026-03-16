from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from algorithms import bfs, dfs, astar, greedy, dijkstra, minimax, alphabeta
from .serializers import GridInputSerializer, TicTacToeInputSerializer, TutorInputSerializer

class BFSView(APIView):
    def post(self, request):
        serializer = GridInputSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            grid = data['grid']
            start = tuple(data['start'])
            goal = tuple(data['goal'])
            result = bfs(grid, start, goal)
            return Response(result)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DFSView(APIView):
    def post(self, request):
        serializer = GridInputSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            grid = data['grid']
            start = tuple(data['start'])
            goal = tuple(data['goal'])
            result = dfs(grid, start, goal)
            return Response(result)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AStarView(APIView):
    def post(self, request):
        serializer = GridInputSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            grid = data['grid']
            start = tuple(data['start'])
            goal = tuple(data['goal'])
            result = astar(grid, start, goal)
            return Response(result)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GreedyView(APIView):
    def post(self, request):
        serializer = GridInputSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            grid = data['grid']
            start = tuple(data['start'])
            goal = tuple(data['goal'])
            result = greedy(grid, start, goal)
            return Response(result)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DijkstraView(APIView):
    def post(self, request):
        serializer = GridInputSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            grid = data['grid']
            start = tuple(data['start'])
            goal = tuple(data['goal'])
            result = dijkstra(grid, start, goal)
            return Response(result)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MinimaxView(APIView):
    def post(self, request):
        serializer = TicTacToeInputSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            board = data['board']
            player = data['player']
            opponent = 'O' if player == 'X' else 'X'
            use_alphabeta = data.get('use_alphabeta', False)

            stats = {'nodes': 0}
            if use_alphabeta:
                score, move = alphabeta(board, 0, -float('inf'), float('inf'), True, player, opponent, stats)
            else:
                score, move = minimax(board, 0, True, player, opponent, stats)

            return Response({
                'move': move,
                'score': score,
                'nodes_evaluated': stats['nodes']
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TutorView(APIView):
    def post(self, request):
        serializer = TutorInputSerializer(data=request.data)
        if serializer.is_valid():
            question = serializer.validated_data['question'].lower()
            
            # Rich educational content
            content = {
                'bfs': {
                    'title': "Breadth-First Search (BFS)",
                    'explanation': """
### What is BFS?
**Breadth-First Search** is a fundamental graph traversal algorithm. It explores all neighbors at the present depth before moving on to nodes at the next depth level.

### Key Characteristics:
- **Data Structure**: Uses a **Queue** (First-In-First-Out).
- **Shortest Path**: Guarantees the shortest path in an **unweighted** graph.
- **Completeness**: Will always find a goal if one exists.

### How it works:
1. Put the start node in a queue.
2. While the queue isn't empty:
   - Pop the first node.
   - If it's the goal, stop!
   - Otherwise, add all unvisited neighbors to the back of the queue.
                    """,
                    'image': '/images/bfs.png'
                },
                'dfs': {
                    'title': "Depth-First Search (DFS)",
                    'explanation': """
### What is DFS?
**Depth-First Search** is another graph traversal algorithm that explores as far as possible along each branch before backtracking.

### Key Characteristics:
- **Data Structure**: Uses a **Stack** (First-In-Last-Out).
- **Shortest Path**: Does **NOT** guarantee the shortest path.
- **Memory**: Can be more memory-efficient than BFS in deep but narrow graphs.

### How it works:
1. Put the start node on a stack.
2. While the stack isn't empty:
   - Pop the top node.
   - If it's the goal, stop!
   - Otherwise, push all unvisited neighbors onto the stack.
                    """,
                    'image': '/images/dfs.png'
                },
                'a*': {
                    'title': "A* Search Algorithm",
                    'explanation': r"""
### What is A*?
**A\* (A-Star)** is one of the most popular pathfinding algorithms. It's an extension of Dijkstra's that uses a **heuristic** to guide the search.

### The Magic Formula:
`f(n) = g(n) + h(n)`
- **g(n)**: The cost of the path from the start node to node `n`.
- **h(n)**: The **heuristic** cost; an estimate of the cheapest path from `n` to the goal.

### Why use it?
It is both **optimal** (finds the shortest path) and **efficient** (explores fewer nodes than Dijkstra) as long as the heuristic is "admissible" (never overestimates).
                    """,
                    'image': '/images/astar.png'
                },
                'dijkstra': {
                    'title': "Dijkstra's Algorithm",
                    'explanation': """
### What is Dijkstra's?
Developed by Edsger W. Dijkstra, this algorithm finds the shortest paths between nodes in a graph.

### Key Characteristics:
- **Uniform Cost**: It is essentially BFS that can handle **weighted edges**.
- **Greedy Approach**: It always expands the node with the lowest cumulative distance from the start.

### Real-world use:
It's the foundation for many routing protocols like OSPF and is used widely in mapping applications like Google Maps.
                    """,
                    'image': '/images/dijkstra.png'
                },
                'greedy': {
                    'title': "Greedy Best-First Search",
                    'explanation': """
### What is Greedy BFS?
**Greedy Best-First Search** tries to expand the node that is closest to the goal, based solely on a heuristic estimate.

### Key Difference:
Unlike A*, it **ignores the cost already traveled** (`g(n)`). It only cares about `h(n)`.

### Pros and Cons:
- **Pros**: Very fast, often heads directly toward the goal.
- **Cons**: Not guaranteed to find the shortest path, and can easily get stuck in local optima (like a U-shaped wall).
                    """,
                    'image': '/images/astar.png'
                },
                'minimax': {
                    'title': "Minimax Algorithm",
                    'explanation': """
### What is Minimax?
**Minimax** is a decision-making algorithm used in artificial intelligence for two-player zero-sum games (like Tic-Tac-Toe, Chess, or Go).

### The Concept:
- **Max**: Tries to maximize their score.
- **Min**: Tries to minimize the opponent's score.

### Alpha-Beta Pruning:
An optimization that "prunes" (skips) branches in the game tree that won't influence the final decision, making the search much faster without changing the result.
                    """,
                    'image': '/images/minimax.png'
                }
            }

            answer = content.get('bfs') # default
            for key in content:
                if key in question:
                    answer = content[key]
                    break
            
            return Response(answer)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from django.urls import path
from .views import (
    BFSView, DFSView, AStarView, GreedyView, DijkstraView,
    MinimaxView, TutorView
)

urlpatterns = [
    path('bfs/', BFSView.as_view(), name='bfs'),
    path('dfs/', DFSView.as_view(), name='dfs'),
    path('astar/', AStarView.as_view(), name='astar'),
    path('greedy/', GreedyView.as_view(), name='greedy'),
    path('dijkstra/', DijkstraView.as_view(), name='dijkstra'),
    path('minimax/', MinimaxView.as_view(), name='minimax'),
    path('tutor/', TutorView.as_view(), name='tutor'),
]
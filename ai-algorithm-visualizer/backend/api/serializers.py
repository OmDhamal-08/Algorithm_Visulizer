from rest_framework import serializers

class GridInputSerializer(serializers.Serializer):
    grid = serializers.ListField(
        child=serializers.ListField(
            child=serializers.IntegerField(min_value=0, max_value=1)
        )
    )
    start = serializers.ListField(
        child=serializers.IntegerField(), min_length=2, max_length=2
    )
    goal = serializers.ListField(
        child=serializers.IntegerField(), min_length=2, max_length=2
    )

class TicTacToeInputSerializer(serializers.Serializer):
    board = serializers.ListField(
        child=serializers.ListField(
            child=serializers.CharField(allow_blank=True, max_length=1)
        )
    )
    player = serializers.CharField(max_length=1)  # 'X' or 'O'
    use_alphabeta = serializers.BooleanField(default=False)

class TutorInputSerializer(serializers.Serializer):
    question = serializers.CharField(max_length=200)
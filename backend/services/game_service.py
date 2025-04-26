import os
import json

GAMES_FOLDER = "games"

def load_levels(game_name: str):
    levels_path = os.path.join(GAMES_FOLDER, game_name, "levels.json")
    if not os.path.exists(levels_path):
        return None
    with open(levels_path, "r", encoding="utf-8") as f:
        return json.load(f)

def get_all_levels(game_name: str):
    return load_levels(game_name)

def get_level_by_id(game_name: str, level_id: int):
    levels = load_levels(game_name)
    if not levels:
        return None
    for level in levels:
        if level["id"] == level_id:
            return level
    return None

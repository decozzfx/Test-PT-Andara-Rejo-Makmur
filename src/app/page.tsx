"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import PlayerCard from "@/components/ui/player-card";

// Type definitions
export interface Player {
  id: number;
  name: string;
  score: number;
  photo_url: string;
}

export interface EditFormState {
  name: string;
  score: string;
  photo_url: string;
}

// Mock data
const mockData: Player[] = [
  {
    id: 1,
    name: "John Doe",
    score: 69,
    photo_url: "https://avatar.iran.liara.run/public/4",
  },
  {
    id: 2,
    name: "Jane Smith",
    score: 33,
    photo_url: "https://avatar.iran.liara.run/public/29",
  },
  {
    id: 3,
    name: "Mike Johnson",
    score: 95,
    photo_url: "https://avatar.iran.liara.run/public/12",
  },
  {
    id: 4,
    name: "Sarah Williams",
    score: 82,
    photo_url: "https://avatar.iran.liara.run/public/44",
  },
  {
    id: 5,
    name: "Robert Brown",
    score: 77,
    photo_url: "https://avatar.iran.liara.run/public/8",
  },
];

const LeaderboardPage: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<Player[]>(mockData);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [editForm, setEditForm] = useState<EditFormState>({
    name: "",
    score: "",
    photo_url: "",
  });

  const handleEdit = (player: Player): void => {
    setEditingPlayer(player);
    setEditForm({
      name: player.name,
      score: player.score.toString(),
      photo_url: player.photo_url,
    });
  };

  const handleSubmitEdit = (): void => {
    if (!editingPlayer) return;

    const updatePayload = {
      id: editingPlayer.id,
      name: editForm.name,
      score: parseInt(editForm.score, 10),
      photo_url: editForm.photo_url,
    };

    console.log("Update API payload:", updatePayload);

    // Update local state to reflect changes
    const updatedData = leaderboardData.map((player) =>
      player.id === editingPlayer.id ? { ...player, ...updatePayload } : player
    );
    setLeaderboardData(updatedData);
    setEditingPlayer(null);
  };

  const handleEditFormChange =
    (field: keyof EditFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setEditForm({ ...editForm, [field]: e.target.value });
    };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-blue-900 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold flex text-white items-center justify-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Game Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboardData
              .sort((a, b) => b.score - a.score)
              .map((player, index) => (
                <PlayerCard
                  editForm={editForm}
                  handleEdit={handleEdit}
                  handleEditFormChange={handleEditFormChange}
                  handleSubmitEdit={handleSubmitEdit}
                  index={index}
                  player={player}
                  key={player.id}
                />
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardPage;

"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { EditFormState, Player } from "@/app/page";
import Image from "next/image";
import Button from "../button";
import Input from "@/components/ui/input";
import { Share2, Edit } from "lucide-react";
import Link from "next/link";

interface IProps {
  player: Player;
  index: number;
  handleEdit: (player: Player) => void;
  handleEditFormChange: (
    key: keyof EditFormState
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitEdit: () => void;
  editForm: EditFormState;
}

interface ShareLinks {
  WhatsApp: string;
  Telegram: string;
  Facebook: string;
}

const PlayerCard: React.FC<IProps> = ({
  player,
  index,
  handleEdit,
  editForm,
  handleEditFormChange,
  handleSubmitEdit,
}) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareText, setShareText] = useState("");
  const [shareLinks, setShareLinks] = useState<ShareLinks>({
    WhatsApp: "",
    Telegram: "",
    Facebook: "",
  });
  const toggleShareModal = () => {
    setShareModalOpen(!shareModalOpen);
  };

  const handleShare = (player: Player): void => {
    toggleShareModal();
    setShareText(`Check out my score of ${player.score} in our awesome game!`);
    setShareLinks({
      WhatsApp: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      Telegram: `https://t.me/share/url?url=${encodeURIComponent(
        window.location.href
      )}&text=${encodeURIComponent(shareText)}`,
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}&quote=${encodeURIComponent(shareText)}`,
    });

    console.log("Share links generated:", shareLinks);
  };

  return (
    <div
      key={player.id}
      className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
    >
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold w-8">{index + 1}</span>
        <div className="flex items-center w-10 h-10 relative  gap-4">
          <Image
            src={player.photo_url}
            alt={player.name}
            className="w-12 h-12 rounded-full"
            fill
          />
        </div>
        <div>
          <h3 className="font-semibold">{player.name}</h3>
          <p className="text-gray-600">Score: {player.score}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => handleEdit(player)}>
              <Edit className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gradient-to-b from-purple-900 to-blue-900">
            <DialogHeader>
              <DialogTitle>Edit Player Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input
                placeholder="Name"
                value={editForm.name}
                onChange={handleEditFormChange("name")}
              />
              <Input
                type="number"
                placeholder="Score"
                value={editForm.score}
                onChange={handleEditFormChange("score")}
              />
              <Input
                placeholder="Photo URL"
                value={editForm.photo_url}
                onChange={handleEditFormChange("photo_url")}
              />
              <DialogClose className="flex w-full justify-end">
                <Button variant="classic" size={"4"} onClick={handleSubmitEdit}>
                  Save Changes
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={shareModalOpen} onOpenChange={setShareModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => handleShare(player)}>
              <Share2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gradient-to-b from-purple-900 to-blue-900">
            <DialogHeader>
              <DialogTitle>Share Player Score</DialogTitle>
            </DialogHeader>
            <div className="flex gap-4 items-center justify-center">
              <Link href={shareLinks.WhatsApp} target="_blank">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp"
                  width={40}
                  height={40}
                />
              </Link>
              <Link href={shareLinks.Telegram} target="_blank">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
                  alt="Telegram"
                  width={40}
                  height={40}
                />
              </Link>
              <Link href={shareLinks.Facebook} target="_blank">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook"
                  width={40}
                  height={40}
                />
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PlayerCard;

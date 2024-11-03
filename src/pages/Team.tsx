import React, { useState } from 'react';
import { Plus, Search, Mail, Phone, Edit2, Trash2 } from 'lucide-react';
import { useTeamStore } from '../store/teamStore';
import { MemberModal } from '../components/Team/MemberModal';
import type { User, Message } from '../../src/types/types';

export const Team: React.FC = () => {
  const { members, addMember, removeMember } = useTeamStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<User | undefined>();
  const [selectedTeam, setSelectedTeam] = useState<string | undefined>(); // Placeholder for team identifier
  const [messages, setMessages] = useState<{ [team: string]: Message[] }>({});

  const openModal = (member?: User) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };
  const userId = 'TrackMate'; // Replace with the actual sender's ID

  const handleSendMessage = () => {
  if (selectedMember) {
    const message = {
      senderId: userId, // Replace with the actual sender's ID
      message: newMessage,
    };
    useTeamStore.getState().addMessage(selectedMember.id, message); // Call the addMessage method
    setNewMessage(''); // Reset the input field
  }
};

  const closeModal = () => {
    setSelectedMember(undefined);
    setIsModalOpen(false);
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Team Management</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Member
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search team members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                    <span className="text-xl text-white">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-400">{member.role}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => openModal(member)} className="p-1 hover:bg-gray-700 rounded">
                  <Edit2 className="w-4 h-4 text-gray-400" />
                </button>
                <button onClick={() => removeMember(member.id)} className="p-1 hover:bg-gray-700 rounded">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">{member.email}</span>
              </div>
              {member.phone && (
                <div className="flex items-center text-gray-400">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">{member.phone}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">Chat - {selectedTeam}</h3>
        <div className="max-h-60 overflow-y-auto space-y-2">
          {(messages[selectedTeam] || []).map((msg, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-blue-400">{msg.sender}</span>
              <span className="text-sm text-gray-300">{msg.content}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 rounded-l-lg bg-gray-700 text-white"
          />
          <button onClick={handleSendMessage} className="px-4 py-2 bg-blue-600 text-white rounded-r-lg">Send</button>
        </div>
      </div>

      <MemberModal
        isOpen={isModalOpen}
        onClose={closeModal}
        member={selectedMember}
      />
    </div>
  );
};

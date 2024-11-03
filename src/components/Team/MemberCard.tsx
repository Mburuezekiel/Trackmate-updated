import React from 'react';
import type { User } from '../../types/types';

interface MemberCardProps {
  member: User;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => (
  <div className="member-card">
    <img src={member.avatar} alt={`${member.name}'s avatar`} className="member-avatar" />
    <div className="member-info">
      <h3>{member.name}</h3>
      <p>{member.role}</p>
      <p>Email: {member.email}</p>
      <p>Phone: {member.phone}</p>
      <p>Projects: {member.projects.join(', ')}</p>
    </div>
  </div>
);

export default MemberCard;

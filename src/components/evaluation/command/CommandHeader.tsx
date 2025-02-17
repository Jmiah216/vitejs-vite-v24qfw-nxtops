import React from 'react';

interface Props {
  label: string;
}

export function CommandHeader({ label }: Props) {
  return (
    <h4 className="font-medium text-gray-900">{label}</h4>
  );
}
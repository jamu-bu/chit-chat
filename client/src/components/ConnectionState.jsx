import React from 'react';

export default function ConnectionState({ isConnected }) {
  return (
    <p>State: { '' + isConnected }</p>
  );
}
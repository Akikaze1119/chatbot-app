import React from 'react';

export const formatText = (text) => {
  const lines = text.split('\n');
  const formattedLines = lines.map((line, index) => {
    if (line.startsWith('* ')) {
      return <li key={index}>{line.slice(2)}</li>;
    } else if (line.startsWith('**') && line.endsWith('**')) {
      return <h3 key={index}>{line.slice(2, -2)}</h3>;
    } else if (line.trim() === '') {
      return <br key={index} />;
    } else {
      return <p key={index}>{line}</p>;
    }
  });

  const formattedContent = [];
  let currentList = [];

  for (let i = 0; i < formattedLines.length; i++) {
    const element = formattedLines[i];
    if (React.isValidElement(element) && element.type === 'li') {
      currentList.push(element);
    } else {
      if (currentList.length > 0) {
        formattedContent.push(<ul key={formattedContent.length}>{currentList}</ul>);
        currentList = [];
      }
      formattedContent.push(element);
    }
  }

  if (currentList.length > 0) {
    formattedContent.push(<ul key={formattedContent.length}>{currentList}</ul>);
  }

  return <div>{formattedContent}</div>;
};
